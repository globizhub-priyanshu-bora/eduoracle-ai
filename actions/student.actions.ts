"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ------------------------------------------------------------------
// 1. UPDATE STUDENT STATE (GPS & Digital Twin Slider)
// ------------------------------------------------------------------
export async function updateStudentStateAction(data: {
  currentStudyHours?: number;
  completedGpsTasks?: string[];
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const updateData: any = {};
    if (data.currentStudyHours !== undefined) updateData.currentStudyHours = data.currentStudyHours;
    if (data.completedGpsTasks !== undefined) updateData.completedGpsTasks = data.completedGpsTasks;

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: user.studentProfile.id },
      data: updateData,
    });

    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Action Error - Update State:", error);
    return { success: false, error: "Failed to update state" };
  }
}

// ------------------------------------------------------------------
// 2. GET STUDENT STATE (Loads GPS & Twin Data on refresh)
// ------------------------------------------------------------------
export async function getStudentStateAction() {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    // Auto-create demo student if DB is empty
    if (!user || !user.studentProfile) {
      user = await prisma.user.create({
        data: {
          name: "Kabilon (Demo Student)",
          role: "STUDENT",
          studentProfile: { create: { targetExam: "ISRO Scientist 'SC'" } },
        },
        include: { studentProfile: true },
      });
    }

    return { 
      success: true, 
      data: {
        completedGpsTasks: user.studentProfile!.completedGpsTasks || [],
        currentStudyHours: user.studentProfile!.currentStudyHours || 3
      } 
    };
  } catch (error) {
    console.error("Action Error - Get Student State:", error);
    return { success: false, error: "Failed to fetch student state" };
  }
}

// ------------------------------------------------------------------
// 3. SYNC EXTERNAL EXAM
// ------------------------------------------------------------------
export async function syncExamAction(formData: {
  title: string;
  type: string;
  date: string;
  context: string;
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const newExam = await prisma.exam.create({
      data: {
        studentProfileId: user.studentProfile.id,
        title: formData.title,
        type: formData.type,
        date: formData.date ? new Date(formData.date) : null,
        aiRecommendation: "Analyzing syllabus parameters...",
        targetGoal: "Pending AI Calibration",
        syllabusTags: [formData.context], 
      },
    });

    revalidatePath("/student/exams");
    return { success: true, exam: newExam };
  } catch (error) {
    console.error("Action Error - Sync Exam:", error);
    return { success: false, error: "Failed to sync exam" };
  }
}

// ------------------------------------------------------------------
// 4. GET ALL SYNCED EXAMS
// ------------------------------------------------------------------
export async function getStudentExamsAction() {
  try {
    const user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const exams = await prisma.exam.findMany({
      where: { studentProfileId: user.studentProfile.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: exams };
  } catch (error) {
    console.error("Action Error - Get Exams:", error);
    return { success: false, error: "Failed to load exams" };
  }
}

// ------------------------------------------------------------------
// 5. GET CAREER TRAJECTORY DATA
// ------------------------------------------------------------------
export async function getCareerTrajectoryAction() {
  try {
    const user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "Profile not found" };

    const profile = user.studentProfile;
    const insights = (profile.latestAIInsights as any) || {};
    
    return {
      success: true,
      data: {
        primaryGoal: {
          title: profile.targetExam,
          alignmentScore: profile.latestHealthScore || 0,
          trajectory: insights.trajectory || "Stable",
          lockedSkills: insights.lockedSkills || ["Operating Systems"], 
          pendingSkills: insights.pendingSkills || ["Paging & Segmentation"], 
        },
        alternativeEngines: insights.alternativeEngines || [],
      },
    };
  } catch (error) {
    console.error("Action Error - Get Career:", error);
    return { success: false, error: "Failed to load trajectory" };
  }
}

// ------------------------------------------------------------------
// 6. SIMULATE NEW CAREER TRAJECTORY
// ------------------------------------------------------------------
export async function simulateCareerTrajectoryAction(formData: {
  targetRole: string;
  targetIndustry: string;
  timeframe: string;
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const profile = user.studentProfile;
    const currentInsights = (profile.latestAIInsights as any) || {};
    const existingAlternatives = currentInsights.alternativeEngines || [];

    const simulatedNewEngine = {
      title: formData.targetRole,
      alignmentScore: Math.floor(Math.random() * (85 - 60 + 1) + 60), 
      industry: formData.targetIndustry,
      gap: `Requires deeper focus on ${formData.targetIndustry} standards. Timeframe: ${formData.timeframe}.`,
    };

    const updatedAlternatives = [simulatedNewEngine, ...existingAlternatives].slice(0, 4);
    const updatedInsights = { ...currentInsights, alternativeEngines: updatedAlternatives };

    await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        targetRole: formData.targetRole,
        targetIndustry: formData.targetIndustry,
        latestAIInsights: updatedInsights,
      },
    });

    revalidatePath("/student/career-goals");
    return { success: true, message: "Trajectory simulation complete" };
  } catch (error) {
    console.error("Action Error - Simulate Career:", error);
    return { success: false, error: "Simulation failed" };
  }
}

// ------------------------------------------------------------------
// 7. REAL AI VISION TUTOR ANALYSIS (With API Key Rotation)
// ------------------------------------------------------------------
export async function analyzeVisionQueryAction(base64Image: string, mimeType: string) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const apiKeys = [
      process.env.GEMINI_API_KEY1,
      process.env.GEMINI_API_KEY2,
      process.env.GEMINI_API_KEY3
    ].filter(Boolean) as string[];

    if (apiKeys.length === 0) {
      return { success: false, error: "No Gemini API keys configured." };
    }

    const base64Data = base64Image.split(',')[1];
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    };

    const prompt = `You are an expert AI tutor. Analyze the image provided, which contains a math, physics, or computer science problem. 
    Solve it and provide a structured response in exactly this JSON format. Do not use markdown blocks, just return raw JSON:
    {
      "identifiedTopic": "Brief name of the topic (e.g., 'Newtonian Mechanics: Inclined Planes')",
      "steps": [
        { "title": "Step 1: Identify Given Variables", "explanation": "..." },
        { "title": "Step 2: Apply the Formula", "explanation": "..." },
        { "title": "Step 3: Calculate Final Result", "explanation": "..." }
      ],
      "nextStep": "A brief 1-sentence recommendation on what to study next to master this."
    }`;

    let responseText = "";
    let isSuccess = false;

    for (let i = 0; i < apiKeys.length; i++) {
      try {
        console.log(`Attempting Gemini API Call with Key ${i + 1}...`);
        const genAI = new GoogleGenerativeAI(apiKeys[i]);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
        
        const result = await model.generateContent([prompt, imagePart]);
        responseText = result.response.text();
        
        isSuccess = true;
        break;
      } catch (keyError: any) {
        console.warn(`Key ${i + 1} failed. Reason: ${keyError.message}`);
        if (i === apiKeys.length - 1) {
          throw new Error("All provided Gemini API keys have exhausted their limits or failed.");
        }
      }
    }

    if (!isSuccess) {
       throw new Error("Failed to generate content after checking all keys.");
    }
    
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiSolution = JSON.parse(cleanJson);

    await prisma.visionQuery.create({
      data: {
        studentProfileId: user.studentProfile.id,
        imageUrl: "uploaded_via_base64", 
        identifiedTopic: aiSolution.identifiedTopic,
        solution: aiSolution,
      },
    });

    return { success: true, data: aiSolution };
  } catch (error) {
    console.error("Action Error - Vision Query:", error);
    return { success: false, error: "Failed to analyze image. All API keys might be exhausted." };
  }
}

// ------------------------------------------------------------------
// 8. CGPA PREDICTION ENGINE
// ------------------------------------------------------------------
export async function calculateCGPAPredictionAction(formData: {
  pastCGPA: number;
  internal: number;
  attendance: number;
  studyHours: number;
  assignments: number;
}) {
  try {
    let studyScore = (formData.studyHours / 6) * 100;
    if (studyScore > 100) studyScore = 100;

    const predictionScore = 
      (formData.pastCGPA * 10 * 0.40) +  
      (formData.internal * 0.30) +       
      (formData.attendance * 0.10) +     
      (studyScore * 0.15) +              
      (formData.assignments * 0.05);     

    const predictedCGPA = Number((predictionScore / 10).toFixed(2));
    const percentage = Number(predictionScore.toFixed(2));

    return { 
      success: true, 
      data: { percentage, cgpa: predictedCGPA } 
    };
  } catch (error) {
    console.error("Action Error - Predict CGPA:", error);
    return { success: false, error: "Failed to calculate prediction" };
  }
}

// ==================================================================
// 🛡️ ADVANCED DNA FAILSAFE BANK (50+ Categorized & Interactive)
// ==================================================================

const DNA_QUESTION_BANK = [
  // --- 🧠 CONCEPT UNDERSTANDING ---
  { category: "Concept Understanding", type: "standard", question: "Which scheduling algorithm is most susceptible to the 'convoy effect'?", options: ["FCFS", "Round Robin", "SJF", "Multilevel Queue"], correctAnswerIndex: 0, explanation: "FCFS suffers from the convoy effect. Your analytical traits indicate you should watch out for edge cases like this." },
  { category: "Concept Understanding", type: "standard", question: "In a relational DB, which normal form eliminates transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswerIndex: 2, explanation: "3NF is achieved when a table is in 2NF and has no transitive dependencies." },
  { category: "Concept Understanding", type: "standard", question: "Which OSI layer routes packets across multiple networks?", options: ["Data Link", "Network", "Transport", "Session"], correctAnswerIndex: 1, explanation: "The Network layer handles logical addressing (IP) and routing." },
  { category: "Concept Understanding", type: "standard", question: "In OOP, what defines 'Polymorphism'?", options: ["Hiding internal state", "Inheriting multiple classes", "Objects taking many forms", "Binding data"], correctAnswerIndex: 2, explanation: "Polymorphism allows methods to do different things based on the object it acts upon." },
  { category: "Concept Understanding", type: "standard", question: "What is the primary purpose of a TLB?", options: ["Store files", "Cache page table entries", "CPU scheduling", "Network routing"], correctAnswerIndex: 1, explanation: "A TLB caches recent virtual-to-physical address translations to speed up memory access." },
  { category: "Concept Understanding", type: "standard", question: "What does the CAP theorem state a distributed system cannot simultaneously provide?", options: ["Consistency, Availability, Partition tolerance", "Concurrency, API, Performance", "Cache, Auth, Paging", "Compute, Allocation, Power"], correctAnswerIndex: 0, explanation: "CAP theorem states you can only guarantee two out of the three simultaneously." },
  { category: "Concept Understanding", type: "standard", question: "In OS, what is the difference between a Process and a Thread?", options: ["Threads share memory, Processes do not", "Processes share memory, Threads do not", "They are identical", "Threads run on GPU"], correctAnswerIndex: 0, explanation: "Threads within the same process share the same memory space and resources." },
  { category: "Concept Understanding", type: "standard", question: "What is the main advantage of REST over SOAP?", options: ["Strict schema", "XML only", "Stateless and uses standard HTTP methods", "Built-in security"], correctAnswerIndex: 2, explanation: "REST is lightweight, stateless, and utilizes standard HTTP methods like GET, POST, PUT, DELETE." },

  // --- ⚙️ PROBLEM SOLVING ---
  { category: "Problem Solving", type: "standard", question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correctAnswerIndex: 2, explanation: "O(n^2) occurs when the pivot chosen is consistently the greatest or smallest element." },
  { category: "Problem Solving", type: "standard", question: "If a hash table has a load factor of 0.75, what does this imply?", options: ["75% of slots are empty", "The table is 75% full", "Collisions occur 75% of the time", "Search takes O(0.75) time"], correctAnswerIndex: 1, explanation: "Load factor = (number of elements) / (total table size)." },
  { category: "Problem Solving", type: "standard", question: "You have a rotated sorted array. Which algorithm finds an element in O(log n)?", options: ["Linear Search", "Modified Binary Search", "DFS", "Selection Sort"], correctAnswerIndex: 1, explanation: "A modified binary search checks which half of the array is properly sorted before branching." },
  { category: "Problem Solving", type: "standard", question: "How many IP addresses are available in a /24 IPv4 subnet?", options: ["256", "254", "128", "512"], correctAnswerIndex: 1, explanation: "A /24 has 8 host bits (2^8 = 256). Minus 2 for network and broadcast addresses leaves 254." },
  { category: "Problem Solving", type: "standard", question: "Amdahl's Law: Program is 40% sequential. Max speedup with infinite cores?", options: ["2.5x", "4x", "10x", "Infinite"], correctAnswerIndex: 0, explanation: "Maximum speedup = 1 / (1 - P). Here P is 0.6 (parallelizable). Max speedup = 1 / 0.4 = 2.5x." },
  { category: "Problem Solving", type: "standard", question: "What algorithm finds the shortest path in a weighted graph without negative cycles?", options: ["Bellman-Ford", "Kruskal", "Dijkstra's", "Prim's"], correctAnswerIndex: 2, explanation: "Dijkstra's algorithm is optimal for finding the shortest path in graphs with non-negative weights." },
  { category: "Problem Solving", type: "standard", question: "What is the result of 5 ^ 3 (Bitwise XOR) in binary?", options: ["110 (6)", "101 (5)", "011 (3)", "111 (7)"], correctAnswerIndex: 0, explanation: "5 is 101, 3 is 011. XORing them bit by bit gives 110, which is 6 in decimal." },
  { category: "Problem Solving", type: "standard", question: "To solve the 0/1 Knapsack problem optimally, you should use:", options: ["Greedy approach", "Dynamic Programming", "Divide and Conquer", "Backtracking"], correctAnswerIndex: 1, explanation: "Dynamic Programming guarantees the optimal solution by breaking the knapsack problem into overlapping subproblems." },

  // --- 🧩 ANALYTICAL ABILITY ---
  { category: "Analytical Ability", type: "standard", question: "If A implies B, and B implies C, which of the following is necessarily true?", options: ["C implies A", "Not C implies Not A", "Not A implies Not C", "B implies A"], correctAnswerIndex: 1, explanation: "This is the contrapositive logic rule. If A -> C, then ~C -> ~A." },
  { category: "Analytical Ability", type: "standard", question: "Analyze this logic gate output: XOR gate with inputs A=1, B=1.", options: ["0", "1", "High Impedance", "Undefined"], correctAnswerIndex: 0, explanation: "XOR outputs 1 only when inputs are DIFFERENT. Since both are 1, output is 0." },
  { category: "Analytical Ability", type: "standard", question: "In a binary tree, if the number of leaf nodes is L, what is the number of nodes with 2 children?", options: ["L + 1", "L - 1", "2L", "L / 2"], correctAnswerIndex: 1, explanation: "In any binary tree, nodes with 2 children exactly equal (Leaf Nodes - 1)." },
  { category: "Analytical Ability", type: "standard", question: "Which concurrency problem occurs when a thread is perpetually denied resources?", options: ["Deadlock", "Race Condition", "Starvation", "Mutual Exclusion"], correctAnswerIndex: 2, explanation: "Starvation happens when a thread is ready to run but never gets CPU time due to other threads." },
  { category: "Analytical Ability", type: "standard", question: "In Boolean algebra, A + (A * B) simplifies to:", options: ["B", "A", "A + B", "1"], correctAnswerIndex: 1, explanation: "This is the Absorption Law. A OR (A AND B) simply results in A." },
  { category: "Analytical Ability", type: "standard", question: "If 5 machines take 5 minutes to make 5 widgets, how long do 100 machines take to make 100 widgets?", options: ["100 mins", "50 mins", "5 mins", "1 min"], correctAnswerIndex: 2, explanation: "Each machine takes 5 minutes to make 1 widget. Thus, 100 machines working parallel take 5 minutes." },
  { category: "Analytical Ability", type: "standard", question: "How many edges does a complete graph with N vertices have?", options: ["N-1", "N(N-1)/2", "N^2", "N!"], correctAnswerIndex: 1, explanation: "Every vertex connects to every other vertex exactly once, formulated as N choose 2." },
  { category: "Analytical Ability", type: "standard", question: "A deterministic finite automaton (DFA) cannot recognize:", options: ["Regular languages", "Context-free languages", "Finite strings", "Binary numbers"], correctAnswerIndex: 1, explanation: "DFAs lack memory (like a stack), so they cannot recognize context-free languages like matching parentheses." },

  // --- 👁️ MEMORY RETENTION (Includes Interactive Timed Questions) ---
  { category: "Memory Retention", type: "timed_visual", question: "MEMORIZE THIS SEQUENCE:\n🔴 🔵 🟢 🟡", options: ["Red, Green, Blue, Yellow", "Red, Blue, Green, Yellow", "Blue, Red, Green, Yellow", "Red, Blue, Yellow, Green"], correctAnswerIndex: 1, explanation: "Visual-spatial memory is critical for tracing multi-layered architecture diagrams." },
  { category: "Memory Retention", type: "timed_visual", question: "MEMORIZE THIS HEX CODE:\n0x1A4F", options: ["0x1A4E", "0x1B4F", "0x1A4F", "0x1A5F"], correctAnswerIndex: 2, explanation: "Working memory allows you to hold memory addresses in your head while debugging." },
  { category: "Memory Retention", type: "timed_visual", question: "MEMORIZE THIS BINARY:\n1011 0100", options: ["1010 0100", "1011 0100", "1011 0010", "1101 0100"], correctAnswerIndex: 1, explanation: "Short-term binary recall is a powerful trait for low-level system programmers." },
  { category: "Memory Retention", type: "timed_visual", question: "MEMORIZE THIS IP:\n192.168.1.254", options: ["192.168.0.254", "192.168.1.245", "192.168.1.254", "192.168.1.255"], correctAnswerIndex: 2, explanation: "Network engineers rely heavily on immediate subnet recall." },
  { category: "Memory Retention", type: "standard", question: "What is the default port number for HTTPS?", options: ["80", "22", "443", "21"], correctAnswerIndex: 2, explanation: "Basic protocol memory retention. HTTP is 80, HTTPS is 443." },
  { category: "Memory Retention", type: "standard", question: "How many bits are in an IPv6 address?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correctAnswerIndex: 2, explanation: "IPv4 is 32 bits, IPv6 is 128 bits. Pure numerical recall." },
  { category: "Memory Retention", type: "standard", question: "What is the HTTP status code for 'Not Found'?", options: ["200", "301", "403", "404"], correctAnswerIndex: 3, explanation: "404 is the universal standard for a missing resource." },
  { category: "Memory Retention", type: "standard", question: "Which signal does the 'kill -9' command send in Linux?", options: ["SIGTERM", "SIGINT", "SIGKILL", "SIGSTOP"], correctAnswerIndex: 2, explanation: "SIGKILL (9) forces an immediate termination of a process." },
];

const generateDynamicFailsafeQuiz = (topic: string) => {
  if (topic !== "Full Profile") {
    // Return 5 random questions exclusively from the chosen category
    const filtered = DNA_QUESTION_BANK.filter(q => q.category === topic).sort(() => Math.random() - 0.5);
    return filtered.slice(0, 5);
  }

  // Otherwise, return 1 from each + 1 random
  const getRandomFromCategory = (cat: string) => {
    const filtered = DNA_QUESTION_BANK.filter(q => q.category === cat);
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const q1 = getRandomFromCategory("Concept Understanding");
  const q2 = getRandomFromCategory("Problem Solving");
  const q3 = getRandomFromCategory("Analytical Ability");
  const q4 = getRandomFromCategory("Memory Retention");
  
  const remaining = DNA_QUESTION_BANK.filter(q => ![q1.question, q2.question, q3.question, q4.question].includes(q.question));
  const q5 = remaining[Math.floor(Math.random() * remaining.length)];

  return [q1, q2, q3, q4, q5].sort(() => Math.random() - 0.5); 
};

const generateFallbackAnalysis = (score: number, total: number, breakdown: any, topic: string) => {
  const calcTrait = (cat: string) => {
    if (!breakdown[cat] || breakdown[cat].total === 0) return 2; 
    const ratio = breakdown[cat].correct / breakdown[cat].total;
    if (ratio === 1) return 4; // Ultra
    if (ratio >= 0.5) return 3; // High
    if (ratio > 0) return 2; // Moderate
    return 1; // Low
  };

  const traits = {
    concept: calcTrait("Concept Understanding"),
    problemSolving: calcTrait("Problem Solving"),
    analytical: calcTrait("Analytical Ability"),
    memory: calcTrait("Memory Retention")
  };

  const percentage = (score / total) * 100;
  let textData = {};

  if (topic !== "Full Profile") {
    // Specific Topic Analysis
    if (percentage >= 80) textData = { overallDNA: `${topic} Master`, focusMore: `Expand your ${topic} into edge-cases.`, focusLess: `Reviewing basics of ${topic}.`, actionPlan: `You have perfectly mastered ${topic}. Shift your focus to other weaker subjects.` };
    else if (percentage >= 50) textData = { overallDNA: `Developing ${topic}`, focusMore: `Core applications of ${topic}.`, focusLess: `Skipping directly to advanced problems.`, actionPlan: `You have decent ${topic} skills. Review the autopsy report below to fill in your gaps.` };
    else textData = { overallDNA: `${topic} Beginner`, focusMore: `Foundational theories of ${topic}.`, focusLess: `Complex algorithmic puzzles.`, actionPlan: `Your ${topic} requires immediate attention. Restart from chapter 1 and focus on basic principles.` };
  } else {
    // Full Profile Analysis
    if (percentage >= 80) textData = { overallDNA: "Strategic Architect", focusMore: "Advanced system design.", focusLess: "Rote memorization.", actionPlan: "Your core concepts are rock solid. Shift your focus to high-level design under time constraints." };
    else if (percentage >= 50) textData = { overallDNA: "Adaptive Learner", focusMore: "Connecting theory to practice.", focusLess: "Passive reading.", actionPlan: "You have a good foundation, but there are gaps. Do timed mock tests." };
    else textData = { overallDNA: "Foundational Builder", focusMore: "Core fundamentals.", focusLess: "Advanced mocks.", actionPlan: "Spend the next 2 weeks purely solidifying your basic concepts." };
  }

  return { ...textData, traits };
};

// ------------------------------------------------------------------
// 9. LEARNING DNA: GENERATE DIAGNOSTIC QUIZ
// ------------------------------------------------------------------
export async function generateDNAQuizAction(topic: string) {
  try {
    const apiKeys = [process.env.GEMINI_API_KEY1, process.env.GEMINI_API_KEY2, process.env.GEMINI_API_KEY3].filter(Boolean) as string[];
    let finalData = null;

    if (apiKeys.length > 0) {
      const prompt = topic === "Full Profile" 
        ? `Generate a 5-question baseline Computer Science diagnostic quiz. It MUST contain exactly 1 question for each category: "Concept Understanding", "Problem Solving", "Analytical Ability", and "Memory Retention" plus 1 random. Make the "Memory Retention" question a short visual sequence to memorize and set its "type" to "timed_visual". Set the rest to "standard". Return ONLY a JSON array: [{ "category": "...", "type": "...", "question": "...", "options": ["A","B","C","D"], "correctAnswerIndex": 0, "explanation": "..." }]`
        : `Generate a 5-question Computer Science diagnostic quiz strictly focused on the category: "${topic}". Target ISRO/GATE difficulty. ${topic === "Memory Retention" ? 'Make at least one question a visual sequence to memorize with type "timed_visual".' : 'Set all types to "standard".'} Return ONLY a JSON array: [{ "category": "${topic}", "type": "...", "question": "...", "options": ["A","B","C","D"], "correctAnswerIndex": 0, "explanation": "..." }]`;

      for (let i = 0; i < apiKeys.length; i++) {
        try {
          const genAI = new GoogleGenerativeAI(apiKeys[i]);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { temperature: 0.5 } });
          const aiResponse = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4500))
          ]) as any;

          finalData = JSON.parse(aiResponse.response.text().replace(/```json/gi, '').replace(/```/g, '').trim());
          break; 
        } catch (err) {}
      }
    }

    if (!finalData || !Array.isArray(finalData)) {
      finalData = generateDynamicFailsafeQuiz(topic);
    }

    return { success: true, data: finalData };
  } catch (error) {
    return { success: true, data: generateDynamicFailsafeQuiz(topic) }; 
  }
}

// ------------------------------------------------------------------
// 10. LEARNING DNA: ANALYZE RESULTS
// ------------------------------------------------------------------
export async function analyzeDNAResultsAction(breakdown: any, score: number, total: number, topic: string) {
  try {
    const apiKeys = [process.env.GEMINI_API_KEY1, process.env.GEMINI_API_KEY2, process.env.GEMINI_API_KEY3].filter(Boolean) as string[];
    let finalData = null;

    if (apiKeys.length > 0) {
      const prompt = `A student scored ${score}/${total} on a CS diagnostic test focusing on: ${topic}. 
      Here is their category breakdown: ${JSON.stringify(breakdown)}. 
      Calculate their cognitive DNA traits on a scale of 1 (Low) to 4 (Ultra) for each category. (If a category has 0 questions, give it a 2).
      Return ONLY a raw JSON object: 
      { 
        "traits": { "concept": 1-4, "problemSolving": 1-4, "memory": 1-4, "analytical": 1-4 },
        "overallDNA": "Cool Archetype Name", 
        "focusMore": "1 short sentence", 
        "focusLess": "1 short sentence", 
        "actionPlan": "3 sentences of what to do next to optimize studying." 
      }`;
      
      for (let i = 0; i < apiKeys.length; i++) {
        try {
          const genAI = new GoogleGenerativeAI(apiKeys[i]);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { temperature: 0.3 } });
          const aiResponse = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4000))
          ]) as any;

          finalData = JSON.parse(aiResponse.response.text().replace(/```json/gi, '').replace(/```/g, '').trim());
          break; 
        } catch (err) {}
      }
    }

    if (!finalData || !finalData.traits) {
        finalData = generateFallbackAnalysis(score, total, breakdown, topic);
    }
    
    return { success: true, data: finalData };
  } catch (error) {
    return { success: true, data: generateFallbackAnalysis(score, total, breakdown, topic) }; 
  }
}