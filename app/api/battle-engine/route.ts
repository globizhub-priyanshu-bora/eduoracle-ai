import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fallbackQuestions } from '@/lib/fallbacks/fallback-questions';

export async function GET(req: Request) {
  try {
    // 1. Grab the requested domain from the URL
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain") || "current-affairs";

    // Safely type cast the domain to match our fallback object keys
    const safeDomain = (Object.keys(fallbackQuestions).includes(domain) ? domain : "current-affairs") as keyof typeof fallbackQuestions;

    // 2. Gather all available keys
    const apiKeys = [
      process.env.GEMINI_API_KEY1,
      process.env.GEMINI_API_KEY2,
      process.env.GEMINI_API_KEY3
    ].filter(Boolean) as string[];

    let aiGeneratedQuestions = null;

    // 3. Try Gemini AI with Rotation Strategy
    if (apiKeys.length > 0) {
      const prompt = `Generate exactly 5 highly rigorous, multiple-choice questions for the domain of ${domain.toUpperCase().replace('-', ' ')}. 
      Target difficulty: ISRO Scientist 'SC' level examination.
      Format the response STRICTLY as a JSON array of objects with the exact keys:
      [{ "id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0 }]
      Do not use markdown formatting like \`\`\`json. Return only the raw JSON.`;

      // Loop through keys until one succeeds
      for (let i = 0; i < apiKeys.length; i++) {
        try {
          console.log(`[Battle Engine] Attempting generation with API Key ${i + 1}...`);
          const genAI = new GoogleGenerativeAI(apiKeys[i]);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

          // Promise.race enforces a 4-second timeout
          const aiResponse = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout")), 4000))
          ]) as any;

          let jsonString = aiResponse.response.text().trim();
          jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();

          aiGeneratedQuestions = JSON.parse(jsonString);
          
          // If successful, break out of the loop immediately!
          console.log(`[Battle Engine] Success with Key ${i + 1}!`);
          break; 
        } catch (aiError: any) {
          console.warn(`[Battle Engine] Key ${i + 1} failed or timed out. Reason: ${aiError.message}`);
          // If this was the last key, it will naturally exit the loop and fallback
        }
      }
    }

    // 4. Return AI Questions if successful
    if (aiGeneratedQuestions && Array.isArray(aiGeneratedQuestions) && aiGeneratedQuestions.length > 0) {
      return NextResponse.json({ questions: aiGeneratedQuestions });
    }

    // 5. Secure Fallback Mechanism (If no API keys, all keys failed, or all timed out)
    console.warn(`[Battle Engine] All Gemini attempts failed. Switching to secure fallbacks for ${domain}.`);
    const shuffledFallbacks = [...fallbackQuestions[safeDomain]].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledFallbacks.slice(0, 5); // Fixed: slice(0, 5) to match the 5 questions requirement

    return NextResponse.json({ questions: selectedQuestions });

  } catch (error) {
    console.error("Critical Error in Battle Engine:", error);
    return NextResponse.json(
      { error: "Failed to generate battle scenarios." },
      { status: 500 } // Changed to 500 for standard Internal Server Error
    );
  }
}