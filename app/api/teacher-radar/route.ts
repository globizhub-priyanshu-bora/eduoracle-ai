// app/api/teacher-radar/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Assuming Monowar set up the Prisma singleton here based on the architecture doc
import prisma from '@/lib/db/prisma'; 

const FALLBACK_RADAR = {
  students: [
    { id: "S01", name: "Rahul D.", currentScore: 88, predictedScore: 42, isSilentStruggler: true, riskFactor: "Virtual Memory Paging" },
    { id: "S02", name: "Priya S.", currentScore: 92, predictedScore: 90, isSilentStruggler: false, riskFactor: "None" },
    { id: "S03", name: "Amit K.", currentScore: 75, predictedScore: 35, isSilentStruggler: true, riskFactor: "OS Kernel Space" },
    { id: "S04", name: "Sneha M.", currentScore: 85, predictedScore: 82, isSilentStruggler: false, riskFactor: "None" },
    { id: "S05", name: "Vikram R.", currentScore: 60, predictedScore: 55, isSilentStruggler: false, riskFactor: "Concurrency" },
    { id: "S06", name: "Neha J.", currentScore: 91, predictedScore: 48, isSilentStruggler: true, riskFactor: "Deadlock Avoidance" },
    { id: "S07", name: "Rohan B.", currentScore: 78, predictedScore: 76, isSilentStruggler: false, riskFactor: "None" },
    { id: "S08", name: "Anjali T.", currentScore: 89, predictedScore: 88, isSilentStruggler: false, riskFactor: "None" },
    { id: "S09", name: "Karan V.", currentScore: 82, predictedScore: 40, isSilentStruggler: true, riskFactor: "Multithreading" },
    { id: "S10", name: "Pooja N.", currentScore: 95, predictedScore: 94, isSilentStruggler: false, riskFactor: "None" }
  ]
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET() {
  try {
    // 1. THE DB CACHE CHECK (Zero-Auth approach for the MVP Demo)
    // We grab the first ClassRoster we find. 
    const existingRoster = await prisma.classRoster.findFirst();

    // If the DB has the AI data cached, return it instantly. No Gemini call needed.
    if (existingRoster && existingRoster.atRiskStudents) {
      console.log("EduOracle: Serving cached Radar data from Neon DB.");
      return NextResponse.json(existingRoster.atRiskStudents, { status: 200 });
    }

    // 2. GENERATE NEW DATA IF DB IS EMPTY
    console.log("EduOracle: No cache found. Generating fresh AI data...");
    const prompt = `
      You are EduOracle. Generate a cohort analysis for 10 demo students studying for the ISRO Scientist 'SC' (Computer Science) exam.
      Identify exactly 3 "Silent Strugglers" (students with passing grades today who are predicted to fail by finals).
      
      Return ONLY a valid JSON object matching this structure:
      {
        "students": [
          { "id": string, "name": string, "currentScore": number, "predictedScore": number, "isSilentStruggler": boolean, "riskFactor": string }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      generationConfig: { responseMimeType: "application/json" } 
    });

    const geminiPromise = model.generateContent(prompt).then(res => JSON.parse(res.response.text()));

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn("EduOracle: Gemini API timeout hit. Serving fallback.");
        resolve(FALLBACK_RADAR);
      }, 4000); 
    });

    const finalData = await Promise.race([geminiPromise, timeoutPromise]);

    // 3. SAVE THE NEW DATA TO THE DATABASE
    if (existingRoster) {
      // Update existing roster with the new JSON blob
      await prisma.classRoster.update({
        where: { id: existingRoster.id },
        data: { atRiskStudents: finalData }
      });
    } else {
      // Demo failsafe: If the DB is completely empty, create the relational chain
      // so the demo doesn't crash on the next page reload.
      await prisma.user.create({
        data: {
          name: "Demo Educator",
          role: "TEACHER",
          teacherProfile: {
            create: {
              schoolName: "Girijananda Chowdhury University",
              classes: {
                create: {
                  className: "CS-401 Advanced Operating Systems",
                  studentCount: 10,
                  atRiskStudents: finalData
                }
              }
            }
          }
        }
      });
    }

    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduOracle Radar Error:", error);
    return NextResponse.json(FALLBACK_RADAR, { status: 200 });
  }
}