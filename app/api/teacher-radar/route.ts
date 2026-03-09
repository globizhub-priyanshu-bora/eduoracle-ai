import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/db/prisma";

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

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function GET() {
  try {
    // 1. THE DB CACHE CHECK
    let existingRoster = null;
    
    if (!process.env.DATABASE_URL) {
      console.warn("EduOracle [DB]: No DATABASE_URL found. Skipping DB cache check.");
    } else {
      try {
        existingRoster = await prisma.classRoster.findFirst();
        if (existingRoster && existingRoster.atRiskStudents) {
          console.log("EduOracle [DB]: Serving cached Radar data from Neon DB.");
          return NextResponse.json(existingRoster.atRiskStudents, { status: 200 });
        }
      } catch (dbReadError) {
        console.warn("EduOracle [DB]: Cache Read Failed. Ignoring and proceeding to AI.", dbReadError.message);
      }
    }

    // 2. THE API KEY VALIDATION
    if (!apiKey || apiKey.includes("YourActualGeminiKeyHere") || apiKey.length < 20) {
      console.warn("EduOracle [AI]: Invalid or Missing Gemini API Key. Serving hardcoded fallback data.");
      return NextResponse.json(FALLBACK_RADAR, { status: 200 });
    }

    // 3. GENERATE NEW DATA
    console.log("EduOracle [AI]: No cache found. Generating fresh AI data...");
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
      generationConfig: { responseMimeType: "application/json" },
    });

    // We catch the Google 400 Error internally so it resolves to the fallback smoothly
    const geminiPromise = model
      .generateContent(prompt)
      .then((res) => JSON.parse(res.response.text()))
      .catch((err) => {
        console.error("EduOracle [AI]: Google API Rejected Request:", err.message);
        return FALLBACK_RADAR; 
      });

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn("EduOracle [AI]: Gemini API timeout hit. Serving fallback.");
        resolve(FALLBACK_RADAR);
      }, 4000);
    });

    const finalData = await Promise.race([geminiPromise, timeoutPromise]);

    // 4. SAFE DB WRITE 
    if (process.env.DATABASE_URL && finalData !== FALLBACK_RADAR) {
      try {
        if (existingRoster) {
          await prisma.classRoster.update({
            where: { id: existingRoster.id },
            data: { atRiskStudents: finalData as any }, 
          });
        } else {
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
      } catch (dbWriteError) {
        console.warn("EduOracle [DB]: Could not save AI data to DB, but returning it to UI anyway.", dbWriteError.message);
      }
    }

    return NextResponse.json(finalData, { status: 200 });
  } catch (error) {
    console.error("EduOracle [Fatal]: Unexpected Radar Error:", error);
    return NextResponse.json(FALLBACK_RADAR, { status: 200 });
  }
}