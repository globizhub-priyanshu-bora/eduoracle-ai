import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key exists to prevent silent build failures
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY is missing from .env");
}

// Export the singleton instance
export const genAI = new GoogleGenerativeAI(apiKey || "");

// Helper to grab the Flash model pre-configured for strict JSON output
export const getJsonModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // 🚨 FIXED: Upgraded from the deprecated 1.5 model
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2, // Low temperature for highly deterministic data
    },
  });
};