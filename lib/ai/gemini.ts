import { GoogleGenerativeAI } from "@google/generative-ai";

// ------------------------------------------------------------------
// 1. DYNAMIC KEY MANAGER
// ------------------------------------------------------------------
// Safely gathers all keys into an array, filtering out undefined/empty ones
export const getGeminiKeys = (): string[] => {
  const keys = [
    process.env.GEMINI_API_KEY1,
    process.env.GEMINI_API_KEY2,
    process.env.GEMINI_API_KEY3,
  ].filter(Boolean) as string[];

  if (keys.length === 0) {
    console.warn("⚠️ No GEMINI API keys found in .env");
  }
  
  return keys;
};

// ------------------------------------------------------------------
// 2. LEGACY EXPORTS (To prevent breaking existing imports)
// ------------------------------------------------------------------
// Grabs the first working key for simple operations
const primaryKey = getGeminiKeys()[0] || "";
export const genAI = new GoogleGenerativeAI(primaryKey);

export const getJsonModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Upgraded to 2.5
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2, // Low temp for highly deterministic data
    },
  });
};

// ------------------------------------------------------------------
// 3. 🚀 GLOBAL ROTATION UTILITY 🚀
// ------------------------------------------------------------------
/**
 * Wrap any future Gemini API calls in this function to automatically
 * get 4-second timeouts, JSON formatting, and 3-key rotation!
 */
export async function executeWithGeminiRotation(prompt: string | any[], timeoutMs: number = 4000) {
  const apiKeys = getGeminiKeys();
  
  if (apiKeys.length === 0) {
    throw new Error("No API keys available to process request.");
  }

  for (let i = 0; i < apiKeys.length; i++) {
    try {
      console.log(`[Global Gemini Utility] Attempting with Key ${i + 1}...`);
      const ai = new GoogleGenerativeAI(apiKeys[i]);
      
      const model = ai.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      });

      // Execute with Timeout
      const aiResponse = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout limit hit")), timeoutMs))
      ]) as any;

      console.log(`[Global Gemini Utility] Success with Key ${i + 1}!`);
      return aiResponse.response.text();
      
    } catch (error: any) {
      console.warn(`[Global Gemini Utility] Key ${i + 1} failed: ${error.message}`);
      // If we are on the very last key and it fails, throw the error outwards
      if (i === apiKeys.length - 1) {
        throw new Error("All Gemini API keys exhausted or timed out.");
      }
    }
  }
}