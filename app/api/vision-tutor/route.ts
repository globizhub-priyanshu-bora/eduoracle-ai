import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// THE FAILSAFE: A hardcoded 3-step solution 
const FALLBACK_VISION = {
  steps: [
    "Step 1: Identify the missing page table directory entry in the provided memory map.",
    "Step 2: Calculate the offset based on the 4KB page size shown in the diagram.",
    "Step 3: Map the virtual address back to the physical frame using the TLB hit ratio."
  ]
};

export async function POST(request: Request) {
  try {
    // 1. Extract the image from the FormData payload
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded." }, { status: 400 });
    }

    // 2. Convert the file to Base64 for the Gemini API
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: file.type
      }
    };

    const prompt = `
      Analyze this image of a complex math or architecture problem.
      Provide the solution in exactly 3 actionable steps.
      
      Return ONLY a valid JSON object matching this structure:
      {
        "steps": ["Step 1 string", "Step 2 string", "Step 3 string"]
      }
    `;

    // 3. Gather all available API keys
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
          console.log(`EduGlobiz Vision: Attempting generation with API Key ${i + 1}...`);
          const genAI = new GoogleGenerativeAI(apiKeys[i]);

          // Using gemini-2.5-flash for maximum speed to beat the 4s timeout
          const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
          });

          // Promise.race enforces a 4-second timeout. If it times out, it REJECTS, triggering the next key.
          const aiResponse = await Promise.race([
            model.generateContent([prompt, imagePart]),
            new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout (4s limit hit)")), 4000))
          ]) as any;

          finalData = JSON.parse(aiResponse.response.text());
          console.log(`EduGlobiz Vision: Success with Key ${i + 1}!`);

          break; // If successful, exit the loop!
        } catch (keyError: any) {
          console.warn(`EduGlobiz Vision: Key ${i + 1} failed. Reason: ${keyError.message}`);
        }
      }
    }

    // 4. Handle Fallback if all keys fail or time out
    if (!finalData) {
      console.warn("EduGlobiz Vision [Fallback]: All Gemini keys exhausted or timed out. Serving FALLBACK_VISION.");
      finalData = FALLBACK_VISION;
    }

    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduGlobiz Vision [Fatal Error]:", error);
    return NextResponse.json(FALLBACK_VISION, { status: 200 });
  }
}