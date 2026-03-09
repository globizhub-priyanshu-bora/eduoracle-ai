import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// THE FAILSAFE: 10 demo students highlighting the "Silent Strugglers" 
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
    const prompt = `
      You are EduOracle. Generate a cohort analysis for 10 demo students studying for the ISRO Scientist 'SC' (Computer Science) exam.
      Identify at least 4 "Silent Strugglers" (students with passing grades today who are predicted to fail by finals).
      
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
        console.warn("EduOracle: Radar timeout hit. Serving fallback.");
        resolve(FALLBACK_RADAR);
      }, 4000); 
    });

    const finalData = await Promise.race([geminiPromise, timeoutPromise]);
    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduOracle Radar Error:", error);
    return NextResponse.json(FALLBACK_RADAR, { status: 200 });
  }
}