import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma'; // Assumes Monowar exported the PrismaClient here

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// THE NEW FAILSAFE: Fetching dynamically from Neon DB via Prisma
async function getDatabaseFallback() {
  try {
    // 1. Fetch all ISRO questions from the Neon Database
    const dbQuestions = await prisma.battleQuestion.findMany();

    // 2. If the DB is empty (e.g., Monowar hasn't seeded it yet), fallback to hardcoded
    if (!dbQuestions || dbQuestions.length === 0) {
      console.warn("Neon DB is empty. Using hardcoded emergency fallback.");
      return getEmergencyHardcodedFallback();
    }

    // 3. Shuffle the database results
    const shuffled = [...dbQuestions].sort(() => 0.5 - Math.random());
    
    // 4. Slice exactly 5 questions
    const selected = shuffled.slice(0, 5);

    // 5. Map the DB rows to perfectly match the frontend's expected JSON structure
    const formattedQuestions = selected.map(q => ({
      id: q.id, // Keeping as string is fine, or parse to int if strict typing requires
      question: q.questionText, 
      options: q.options, // Already an array of strings in Prisma!
      correctAnswer: q.correctAnswerIndex 
    }));

    return { questions: formattedQuestions };

  } catch (error) {
    console.error("Database Fallback Error:", error);
    return getEmergencyHardcodedFallback();
  }
}

// The absolute ultimate failsafe if both AI and DB fail
function getEmergencyHardcodedFallback() {
  return {
    questions: [
      { id: "e1", question: "In Virtual Memory management, what causes a Page Fault?", options: ["When the TLB is full.", "When a referenced page is not in main memory.", "When a process accesses mapped physical memory.", "CPU cache miss."], correctAnswer: 1 },
      { id: "e2", question: "Which OS scheduling algorithm is most susceptible to the 'Convoy Effect'?", options: ["Round Robin (RR)", "Shortest Job First (SJF)", "First-Come, First-Served (FCFS)", "Multilevel Queue"], correctAnswer: 2 },
      { id: "e3", question: "What is the primary purpose of a Translation Lookaside Buffer (TLB)?", options: ["Cache virtual-to-physical address translations.", "Store frequently used CPU instructions.", "Manage disk I/O requests.", "Prevent multithreaded deadlock."], correctAnswer: 0 },
      { id: "e4", question: "Which data structure is most suitable for implementing a priority queue?", options: ["Linked List", "Binary Search Tree", "Heap", "Hash Table"], correctAnswer: 2 },
      { id: "e5", question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correctAnswer: 2 }
    ]
  };
}

export async function GET() {
  try {
    const prompt = `
      You are EduOracle. Generate exactly 5 highly rigorous, random multiple-choice questions 
      for the ISRO Scientist 'SC' (Computer Science) exam syllabus. 
      Vary topics randomly between Operating Systems, Virtual Memory, Data Structures, Databases, Computer Architecture, and Algorithms.
      Do not repeat previous questions.
      
      Return ONLY a valid JSON object matching this exact structure:
      {
        "questions": [
          {
            "id": number,
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": number (0-3 representing the index of the correct option)
          }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.9, 
      } 
    });

    // Promise 1: The Gemini AI Generation
    const geminiPromise = model.generateContent(prompt).then(res => JSON.parse(res.response.text()));

    // Promise 2: The 4-Second DB Failsafe
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(async () => {
        console.warn("EduOracle: Gemini AI timeout hit. Querying Neon DB for fallback questions...");
        const dbData = await getDatabaseFallback();
        resolve(dbData);
      }, 4000); 
    });

    const finalData = await Promise.race([geminiPromise, timeoutPromise]);
    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduOracle Battle Engine Error:", error);
    const dbData = await getDatabaseFallback();
    return NextResponse.json(dbData, { status: 200 });
  }
}