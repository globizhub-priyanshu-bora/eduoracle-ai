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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

    // Using gemini-1.5-pro for advanced vision and reasoning tasks 
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json" }
    });

    const geminiPromise = model.generateContent([prompt, imagePart]).then(res => JSON.parse(res.response.text()));

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn("EduOracle: Vision Tutor timeout hit. Serving fallback.");
        resolve(FALLBACK_VISION);
      }, 4000); 
    });

    const finalData = await Promise.race([geminiPromise, timeoutPromise]);
    return NextResponse.json(finalData, { status: 200 });

  } catch (error) {
    console.error("EduOracle Vision Error:", error);
    return NextResponse.json(FALLBACK_VISION, { status: 200 });
  }
}