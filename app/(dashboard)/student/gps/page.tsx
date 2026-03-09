"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Map,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Trophy,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Hardcoded GPS Timeline expanded for the full-page view (ISRO SC Context)
const expandedGPSData = [
  {
    day: 1,
    title: "Foundation: Core Memory Management",
    focus: "Bridging the gap in Operating Systems fundamentals.",
    timeEstimate: "2.5 hrs",
    tasks: [
      "Review base differences between RAM and Logical Memory.",
      "Read Chapter 8: Main Memory (Galvin).",
      "Complete 10 introductory MCQs on Memory Allocation.",
    ],
  },
  {
    day: 2,
    title: "The Blindspot: Paging & Segmentation",
    focus: "Targeting the exact root cause of the mock test failure.",
    timeEstimate: "3.0 hrs",
    tasks: [
      "Watch conceptual breakdown of Page Tables.",
      "Solve 5 numericals on Logical to Physical Address Translation.",
      "Draw a memory map showing Segmentation with Paging.",
    ],
  },
  {
    day: 3,
    title: "Concept Bridge: Virtual Memory",
    focus: "Connecting mastered OS concepts to current targets.",
    timeEstimate: "2.0 hrs",
    tasks: [
      "Define Demand Paging and Page Faults.",
      "Calculate Effective Access Time (EAT).",
      "Upload a complex EAT numerical to AI Vision Tutor.",
    ],
  },
  {
    day: 4,
    title: "Algorithmic Warfare: Page Replacement",
    focus: "High-yield scoring area for ISRO.",
    timeEstimate: "3.5 hrs",
    tasks: [
      "Master FIFO, Optimal, and LRU algorithms.",
      "Practice Belady's Anomaly scenarios.",
      "Complete 15 Page Replacement trace problems.",
    ],
  },
  {
    day: 5,
    title: "Advanced Mechanisms: Thrashing & Working Set",
    focus: "Securing top-percentile conceptual clarity.",
    timeEstimate: "2.0 hrs",
    tasks: [
      "Analyze the causes of Thrashing.",
      "Review the Working-Set Model.",
      "Summarize Page-Fault Frequency strategy.",
    ],
  },
  {
    day: 6,
    title: "ISRO PYQ Gauntlet",
    focus: "Applying concepts to actual Previous Year Questions.",
    timeEstimate: "4.0 hrs",
    tasks: [
      "Solve ISRO CS 2017 & 2018 Memory Management questions.",
      "Solve ISRO CS 2020 Virtual Memory questions.",
      "Review incorrect answers against the Concept Graph.",
    ],
  },
  {
    day: 7,
    title: "Final Integration Mock",
    focus: "Proving mastery to the Predictive Engine.",
    timeEstimate: "1.5 hrs",
    tasks: [
      "Take 45-minute isolated OS memory mock test.",
      "Review final AI Health Score recalculation.",
      "Rest and prepare for next module.",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function AcademicGPSPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Calculate total progress
  const totalTasks = expandedGPSData.reduce(
    (acc, day) => acc + day.tasks.length,
    0,
  );
  const progressPercentage = Math.round(
    (completedTasks.size / totalTasks) * 100,
  );

  const toggleTask = (taskName: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskName)) newSet.delete(taskName);
      else newSet.add(taskName);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 font-sans overflow-x-hidden relative">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10 border-b border-white/10 pb-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Map className="w-8 h-8 text-blue-400" />
            7-Day Academic GPS
          </h1>
          <p className="text-neutral-400 mt-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            Active Route: Virtual Memory Recovery (ISRO SC)
          </p>
        </div>

        {/* Dynamic Progress Widget */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md min-w-[250px]">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-neutral-300">
              Route Progress
            </span>
            <span className="text-2xl font-bold text-blue-400">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
      </motion.header>

      {/* Main Timeline Layout */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative border-l-2 border-white/10 ml-4 md:ml-8 space-y-12 pb-20"
        >
          {expandedGPSData.map((dayData, dayIndex) => {
            // Check if all tasks for this day are done
            const isDayComplete = dayData.tasks.every((t) =>
              completedTasks.has(t),
            );
            // Determine if this is the "current" active day (first day with incomplete tasks)
            const isCurrentDay =
              !isDayComplete &&
              expandedGPSData
                .slice(0, dayIndex)
                .every((d) => d.tasks.every((t) => completedTasks.has(t)));

            return (
              <motion.div
                variants={itemVariants}
                key={dayData.day}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-neutral-950 flex items-center justify-center transition-colors duration-500
                  ${
                    isDayComplete
                      ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : isCurrentDay
                        ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"
                        : "bg-neutral-800"
                  }`}
                >
                  {isDayComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                  ) : isCurrentDay ? (
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  ) : (
                    <span className="text-xs font-bold text-white/50">
                      {dayData.day}
                    </span>
                  )}
                </div>

                {/* Day Card */}
                <div
                  className={`bg-white/5 border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden
                  ${
                    isDayComplete
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : isCurrentDay
                        ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {isCurrentDay && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      Current Target
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h2
                        className={`text-xl font-bold flex items-center gap-2 ${isDayComplete ? "text-emerald-400" : isCurrentDay ? "text-blue-400" : "text-white"}`}
                      >
                        Day {dayData.day}: {dayData.title}
                      </h2>
                      <p className="text-neutral-400 text-sm mt-1">
                        {dayData.focus}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 text-sm shrink-0">
                      <Clock className="w-4 h-4" />
                      {dayData.timeEstimate}
                    </div>
                  </div>

                  {/* Task List */}
                  <div className="space-y-3">
                    {dayData.tasks.map((task, taskIndex) => {
                      const isTaskDone = completedTasks.has(task);
                      return (
                        <div
                          key={taskIndex}
                          onClick={() => toggleTask(task)}
                          className={`flex items-start gap-4 p-3.5 rounded-xl border transition-all cursor-pointer select-none group
                            ${isTaskDone ? "bg-white/5 border-white/5 opacity-60" : "bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60"}`}
                        >
                          {isTaskDone ? (
                            <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
                          ) : (
                            <Circle className="w-5 h-5 mt-0.5 text-neutral-600 shrink-0 transition-transform group-hover:scale-110 group-hover:text-blue-400" />
                          )}
                          <span
                            className={`text-sm md:text-base transition-colors duration-300 ${isTaskDone ? "text-neutral-500 line-through" : "text-neutral-200"}`}
                          >
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Final Goal Node */}
          <motion.div
            variants={itemVariants}
            className="relative pl-8 md:pl-12 pt-6"
          >
            <div
              className={`absolute -left-[20px] top-6 w-10 h-10 rounded-full border-4 border-neutral-950 flex items-center justify-center transition-colors duration-1000
              ${progressPercentage === 100 ? "bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]" : "bg-neutral-800"}`}
            >
              <Trophy
                className={`w-5 h-5 ${progressPercentage === 100 ? "text-white" : "text-neutral-600"}`}
              />
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Cognitive Mastery Achieved
              </h3>
              <p className="text-neutral-400 text-sm mb-4">
                Completing this route recalculates your final AI Health Score
                and updates the Concept Graph.
              </p>

              {/* Call to action linking back to the Vision Tutor or Main Dashboard */}
              <div className="flex gap-4">
                <Link
                  href="/student/tutor"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <BrainCircuit className="w-4 h-4" /> Launch Vision Tutor
                </Link>
                <Link
                  href="/student"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/10"
                >
                  Return to Overview
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
