import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
    { id: "S10", name: "Pooja N.", currentScore: 95, predictedScore: 94, isSilentStruggler: false, riskFactor: "None" },
  ],
};

export async function GET() {
  try {
    // 1. THE DB CACHE CHECK
    let existingRoster = null;
    try {
      existingRoster = await prisma.classRoster.findFirst();

      if (existingRoster && existingRoster.atRiskStudents) {
        console.log("EduGlobiz: Serving cached Radar data from Neon DB.");
        return NextResponse.json(existingRoster.atRiskStudents, { status: 200 });
      }
    } catch (dbCacheErr) {
      console.warn("EduGlobiz [DB Warning]: Could not read cache, proceeding to AI generation.");
    }

    // 2. GENERATE NEW DATA (With API Key Rotation)
    console.log("EduGlobiz: Generating fresh AI data...");
    const prompt = `
      You are EduGlobiz. Generate a cohort analysis for 10 demo students studying for the ISRO Scientist 'SC' (Computer Science) exam.
      Identify exactly 3 "Silent Strugglers" (students with passing grades today who are predicted to fail by finals).
      
      Return ONLY a valid JSON object matching this structure:
      {
        "students": [
          { "id": string, "name": string, "currentScore": number, "predictedScore": number, "isSilentStruggler": boolean, "riskFactor": string }
        ]
      }
    `;

    // Group all available keys
    const apiKeys = [
      process.env.GEMINI_API_KEY1,
      process.env.GEMINI_API_KEY2,
      process.env.GEMINI_API_KEY3
    ].filter(Boolean) as string[];

    let finalData = null;

    if (apiKeys.length > 0) {
      // 🚀 THE ROTATION ENGINE 🚀
      for (let i = 0; i < apiKeys.length; i++) {
        try {
          console.log(`EduGlobiz: Attempting AI generation with Key ${i + 1}...`);
          const genAI = new GoogleGenerativeAI(apiKeys[i]);
          
          const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
          });

          // Promise.race enforces a 4-second timeout. If it times out, it REJECTS, triggering the next key.
          const aiResponse = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout (4s limit hit)")), 4000))
          ]) as any;

          finalData = JSON.parse(aiResponse.response.text());
          console.log(`EduGlobiz: Success with Key ${i + 1}!`);
          
          break; // If successful, exit the loop!
        } catch (keyError: any) {
          console.warn(`EduGlobiz: Key ${i + 1} failed. Reason: ${keyError.message}`);
        }
      }
    }

    // If ALL keys failed (or timed out), or no keys were configured, apply the fallback
    if (!finalData) {
      console.warn("EduGlobiz [Fallback]: All Gemini keys exhausted or timed out. Serving FALLBACK_RADAR.");
      finalData = FALLBACK_RADAR;
    }

    // 3. SAFE DB WRITE 
    // Only attempt to save if we have a valid DB URL and the data isn't the fallback
    if (process.env.DATABASE_URL && finalData !== FALLBACK_RADAR) {
      try {
        if (existingRoster) {
          await prisma.classRoster.update({
            where: { id: existingRoster.id },
            data: { atRiskStudents: finalData as any },
          });
        } else {
          // Demo failsafe: Create the relational chain for the next reload
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
                      atRiskStudents: finalData as any,
                    },
                  },
                },
              },
            },
          });
        }
      } catch (dbWriteError: any) {
        console.warn("EduGlobiz [DB]: Could not save AI data to DB, but returning it to UI anyway.", dbWriteError.message);
      }
    }

    // 4. RETURN FINAL DATA TO THE FRONTEND
    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduGlobiz [Fatal]: Unexpected Radar Error:", error);
    return NextResponse.json(FALLBACK_RADAR, { status: 200 });
  }
}