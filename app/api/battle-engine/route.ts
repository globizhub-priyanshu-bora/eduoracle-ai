import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fallbackQuestions } from '@/lib/fallbacks/fallback-questions';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(req: Request) {
  try {
    // 1. Grab the requested domain from the URL
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain") || "current-affairs";

    // Safely type cast the domain to match our fallback object keys
    const safeDomain = (Object.keys(fallbackQuestions).includes(domain) ? domain : "current-affairs") as keyof typeof fallbackQuestions;

    // 2. Try Gemini AI First
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Dynamic Prompt based on domain
        const prompt = `Generate exactly 5 highly rigorous, multiple-choice questions for the domain of ${domain.toUpperCase().replace('-', ' ')}. 
        Target difficulty: ISRO Scientist 'SC' level examination.
        Format the response STRICTLY as a JSON array of objects with the exact keys:
        [{ "id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0 (index of correct option 0-3) }]
        Do not use markdown formatting like \`\`\`json. Return only the raw JSON.`;

        // We use a Promise.race to enforce a 4-second timeout. If Gemini is slow, we use fallbacks!
        const aiResponse = await Promise.race([
          model.generateContent(prompt),
          new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout")), 4000))
        ]) as any;

        let jsonString = aiResponse.response.text().trim();
        jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();

        const questions = JSON.parse(jsonString);
        return NextResponse.json({ questions });

      } catch (aiError) {
        console.warn(`[EduGlobiz] Gemini failed or timed out for ${domain}. Switching to secure fallbacks.`);
      }
    }

    // 3. Fallback Mechanism (If no API key or Gemini timed out)
    // We shuffle the 10 fallback questions and pick exactly 5
    const shuffledFallbacks = [...fallbackQuestions[safeDomain]].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledFallbacks.slice(0, 10);

    return NextResponse.json({ questions: selectedQuestions });

  } catch (error) {
    console.error("Critical Error in Battle Engine:", error);
    return NextResponse.json(
      { error: "Failed to generate battle scenarios." },
      { status: 100 }
    );
  }
}