"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// ------------------------------------------------------------------
// 1. SYNC EXTERNAL EXAM ACTION
// ------------------------------------------------------------------
export async function syncExamAction(formData: {
  title: string;
  type: string;
  date: string;
  context: string;
}) {
  try {
    // DEMO HACK: Find the first student, or create one if the DB is empty
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

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

    // Save the new exam to the Neon Database
    const newExam = await prisma.exam.create({
      data: {
        studentProfileId: user.studentProfile!.id,
        title: formData.title,
        type: formData.type,
        date: formData.date ? new Date(formData.date) : null,
        aiRecommendation: "Analyzing syllabus parameters...",
        targetGoal: "Pending AI Calibration",
        syllabusTags: [formData.context], 
      },
    });

    // Automatically refresh the page data so the new exam shows up instantly
    revalidatePath("/student/exams");

    return { success: true, exam: newExam };
  } catch (error) {
    console.error("Server Action Error - Sync Exam:", error);
    return { success: false, error: "Failed to sync exam" };
  }
}

// ------------------------------------------------------------------
// 2. UPDATE STUDENT STATE ACTION (GPS & Digital Twin)
// ------------------------------------------------------------------
export async function updateStudentStateAction(data: {
  currentStudyHours?: number;
  completedGpsTasks?: string[];
}) {
  try {
    // DEMO HACK: Find the demo student
    let user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) return { success: false, error: "User not found" };

    // Build the update payload based on what was passed
    const updateData: any = {};
    if (data.currentStudyHours !== undefined) updateData.currentStudyHours = data.currentStudyHours;
    if (data.completedGpsTasks !== undefined) updateData.completedGpsTasks = data.completedGpsTasks;

    // Update the database
    const updatedProfile = await prisma.studentProfile.update({
      where: { id: user.studentProfile!.id },
      data: updateData,
    });

    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Server Action Error - Update State:", error);
    return { success: false, error: "Failed to update state" };
  }
}