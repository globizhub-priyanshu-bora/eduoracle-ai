"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ------------------------------------------------------------------
// 1. UPDATE STUDENT STATE (GPS & Digital Twin Slider)
// ------------------------------------------------------------------
export async function updateStudentStateAction(data: {
  currentStudyHours?: number;
  completedGpsTasks?: string[];
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const updateData: any = {};
    if (data.currentStudyHours !== undefined) updateData.currentStudyHours = data.currentStudyHours;
    if (data.completedGpsTasks !== undefined) updateData.completedGpsTasks = data.completedGpsTasks;

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: user.studentProfile.id },
      data: updateData,
    });

    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Action Error - Update State:", error);
    return { success: false, error: "Failed to update state" };
  }
}

// ------------------------------------------------------------------
// 2. GET STUDENT STATE (Loads GPS & Twin Data on refresh)
// ------------------------------------------------------------------
export async function getStudentStateAction() {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    // Auto-create demo student if DB is empty
    if (!user || !user.studentProfile) {
      user = await prisma.user.create({
        data: {
          name: "Kabilon (Demo Student)",
          role: "STUDENT",
          studentProfile: { create: { targetExam: "ISRO Scientist 'SC'" } },
        },
        include: { studentProfile: true },
      });
    }

    return { 
      success: true, 
      data: {
        completedGpsTasks: user.studentProfile!.completedGpsTasks || [],
        currentStudyHours: user.studentProfile!.currentStudyHours || 3
      } 
    };
  } catch (error) {
    console.error("Action Error - Get Student State:", error);
    return { success: false, error: "Failed to fetch student state" };
  }
}

// ------------------------------------------------------------------
// 3. SYNC EXTERNAL EXAM
// ------------------------------------------------------------------
export async function syncExamAction(formData: {
  title: string;
  type: string;
  date: string;
  context: string;
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const newExam = await prisma.exam.create({
      data: {
        studentProfileId: user.studentProfile.id,
        title: formData.title,
        type: formData.type,
        date: formData.date ? new Date(formData.date) : null,
        aiRecommendation: "Analyzing syllabus parameters...",
        targetGoal: "Pending AI Calibration",
        syllabusTags: [formData.context], 
      },
    });

    revalidatePath("/student/exams");
    return { success: true, exam: newExam };
  } catch (error) {
    console.error("Action Error - Sync Exam:", error);
    return { success: false, error: "Failed to sync exam" };
  }
}

// ------------------------------------------------------------------
// 4. GET ALL SYNCED EXAMS
// ------------------------------------------------------------------
export async function getStudentExamsAction() {
  try {
    const user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const exams = await prisma.exam.findMany({
      where: { studentProfileId: user.studentProfile.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: exams };
  } catch (error) {
    console.error("Action Error - Get Exams:", error);
    return { success: false, error: "Failed to load exams" };
  }
}

// ------------------------------------------------------------------
// 5. GET CAREER TRAJECTORY DATA
// ------------------------------------------------------------------
export async function getCareerTrajectoryAction() {
  try {
    const user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "Profile not found" };

    const profile = user.studentProfile;
    const insights = (profile.latestAIInsights as any) || {};
    
    return {
      success: true,
      data: {
        primaryGoal: {
          title: profile.targetExam,
          alignmentScore: profile.latestHealthScore || 0,
          trajectory: insights.trajectory || "Stable",
          lockedSkills: insights.lockedSkills || ["Operating Systems"], 
          pendingSkills: insights.pendingSkills || ["Paging & Segmentation"], 
        },
        alternativeEngines: insights.alternativeEngines || [],
      },
    };
  } catch (error) {
    console.error("Action Error - Get Career:", error);
    return { success: false, error: "Failed to load trajectory" };
  }
}

// ------------------------------------------------------------------
// 6. SIMULATE NEW CAREER TRAJECTORY
// ------------------------------------------------------------------
export async function simulateCareerTrajectoryAction(formData: {
  targetRole: string;
  targetIndustry: string;
  timeframe: string;
}) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    const profile = user.studentProfile;
    const currentInsights = (profile.latestAIInsights as any) || {};
    const existingAlternatives = currentInsights.alternativeEngines || [];

    const simulatedNewEngine = {
      title: formData.targetRole,
      alignmentScore: Math.floor(Math.random() * (85 - 60 + 1) + 60), 
      industry: formData.targetIndustry,
      gap: `Requires deeper focus on ${formData.targetIndustry} standards. Timeframe: ${formData.timeframe}.`,
    };

    const updatedAlternatives = [simulatedNewEngine, ...existingAlternatives].slice(0, 4);
    const updatedInsights = { ...currentInsights, alternativeEngines: updatedAlternatives };

    await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        targetRole: formData.targetRole,
        targetIndustry: formData.targetIndustry,
        latestAIInsights: updatedInsights,
      },
    });

    revalidatePath("/student/career-goals");
    return { success: true, message: "Trajectory simulation complete" };
  } catch (error) {
    console.error("Action Error - Simulate Career:", error);
    return { success: false, error: "Simulation failed" };
  }
}

// ------------------------------------------------------------------
// 7. REAL AI VISION TUTOR ANALYSIS (With API Key Rotation)
// ------------------------------------------------------------------
export async function analyzeVisionQueryAction(base64Image: string, mimeType: string) {
  try {
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    // Group all available keys into an array, filtering out undefined ones
    const apiKeys = [
      process.env.GEMINI_API_KEY1,
      process.env.GEMINI_API_KEY2,
      process.env.GEMINI_API_KEY3
    ].filter(Boolean) as string[];

    if (apiKeys.length === 0) {
      return { success: false, error: "No Gemini API keys configured." };
    }

    const base64Data = base64Image.split(',')[1];
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    };

    const prompt = `You are an expert AI tutor. Analyze the image provided, which contains a math, physics, or computer science problem. 
    Solve it and provide a structured response in exactly this JSON format. Do not use markdown blocks, just return raw JSON:
    {
      "identifiedTopic": "Brief name of the topic (e.g., 'Newtonian Mechanics: Inclined Planes')",
      "steps": [
        { "title": "Step 1: Identify Given Variables", "explanation": "..." },
        { "title": "Step 2: Apply the Formula", "explanation": "..." },
        { "title": "Step 3: Calculate Final Result", "explanation": "..." }
      ],
      "nextStep": "A brief 1-sentence recommendation on what to study next to master this."
    }`;

    let responseText = "";
    let isSuccess = false;

    // 🚀 THE ROTATION ENGINE 🚀
    // Loop through each key. If one throws a quota error, it catches it and moves to the next key.
    for (let i = 0; i < apiKeys.length; i++) {
      try {
        console.log(`Attempting Gemini API Call with Key ${i + 1}...`);
        const genAI = new GoogleGenerativeAI(apiKeys[i]);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
        
        const result = await model.generateContent([prompt, imagePart]);
        responseText = result.response.text();
        
        isSuccess = true;
        break; // If successful, exit the loop immediately!
      } catch (keyError: any) {
        console.warn(`Key ${i + 1} failed. Reason: ${keyError.message}`);
        // If we just failed on the LAST key, throw the error outwards
        if (i === apiKeys.length - 1) {
          throw new Error("All provided Gemini API keys have exhausted their limits or failed.");
        }
      }
    }

    if (!isSuccess) {
       throw new Error("Failed to generate content after checking all keys.");
    }
    
    // Clean and parse the JSON response
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiSolution = JSON.parse(cleanJson);

    // Save to database
    await prisma.visionQuery.create({
      data: {
        studentProfileId: user.studentProfile.id,
        imageUrl: "uploaded_via_base64", 
        identifiedTopic: aiSolution.identifiedTopic,
        solution: aiSolution,
      },
    });

    return { success: true, data: aiSolution };
  } catch (error) {
    console.error("Action Error - Vision Query:", error);
    return { success: false, error: "Failed to analyze image. All API keys might be exhausted." };
  }
}

// ------------------------------------------------------------------
// 8. CGPA PREDICTION ENGINE
// ------------------------------------------------------------------
export async function calculateCGPAPredictionAction(formData: {
  pastCGPA: number;
  internal: number;
  attendance: number;
  studyHours: number;
  assignments: number;
}) {
  try {
    let studyScore = (formData.studyHours / 6) * 100;
    if (studyScore > 100) studyScore = 100;

    const predictionScore = 
      (formData.pastCGPA * 10 * 0.40) +  
      (formData.internal * 0.30) +       
      (formData.attendance * 0.10) +     
      (studyScore * 0.15) +              
      (formData.assignments * 0.05);     

    const predictedCGPA = Number((predictionScore / 10).toFixed(2));
    const percentage = Number(predictionScore.toFixed(2));

    return { 
      success: true, 
      data: { percentage, cgpa: predictedCGPA } 
    };
  } catch (error) {
    console.error("Action Error - Predict CGPA:", error);
    return { success: false, error: "Failed to calculate prediction" };
  }
}