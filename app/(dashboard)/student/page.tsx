"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Activity,
  Map,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Camera,
} from "lucide-react";

// The exact JSON contract we established, used here as fallback/initial data
const mockDashboardData = {
  studentInsights: {
    academicHealthScore: 72,
    examProbability: 85,
    learningDNA: {
      type: "Visual-Logical Learner",
      description:
        "Retains information best through node graphs and algorithmic step-by-step breakdowns.",
    },
    careerEngine: ["Data Scientist", "Cloud Architect", "Systems Engineer"],
  },
  predictedBoardQuestions: [
    {
      topic: "Operating Systems",
      question:
        "Explain the difference between paging and segmentation with examples.",
    },
    {
      topic: "Data Structures",
      question:
        "Write an algorithm to traverse a Binary Search Tree in post-order.",
    },
  ],
  academicGPS: [
    {
      week: 1,
      focus: "Core Memory Management",
      tasks: ["Review Virtual Memory", "Complete 5 Paging numericals"],
    },
    {
      week: 2,
      focus: "Advanced Data Structures",
      tasks: ["Implement AVL Trees", "Graph traversal mock test"],
    },
  ],
};

export default function StudentDashboard() {
  const [data, setData] = useState(mockDashboardData);
  const [studyHours, setStudyHours] = useState(3);

  // The Digital Twin Simulator effect
  // As the slider moves, it artificially recalculates the probability for the demo
  const simulatedProbability = Math.min(
    99,
    data.studentInsights.examProbability + (studyHours - 3) * 4,
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 font-sans">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Diagnostic Overview
          </h1>
          <p className="text-neutral-400 mt-1">
            Target Exam: ISRO Scientist 'SC' (Computer Science)
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Activity className="text-blue-400 w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium text-blue-100">
            Live Cognitive Sync Active
          </span>
        </div>
      </header>

      {/* Top Row: Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1: Academic Health Score */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="w-24 h-24" />
          </div>
          <h2 className="text-neutral-400 text-sm uppercase tracking-wider font-semibold mb-2">
            Academic Health Score
          </h2>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-white">
              {data.studentInsights.academicHealthScore}
            </span>
            <span className="text-neutral-500 text-lg mb-1">/ 100</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${data.studentInsights.academicHealthScore}%`,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Metric 2: Exam Probability Speedometer (Digital Twin) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between">
          <div>
            <h2 className="text-neutral-400 text-sm uppercase tracking-wider font-semibold mb-2 flex justify-between items-center">
              Exam Pass Probability
              <Target className="w-4 h-4 text-purple-400" />
            </h2>
            <div className="flex justify-between items-end mb-4">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {simulatedProbability}%
              </span>
            </div>
          </div>

          {/* Digital Twin Slider Module */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <label className="text-xs text-neutral-400 flex justify-between mb-2">
              <span>Digital Twin: Adjust Daily Study Hours</span>
              <span className="text-white font-medium">
                {studyHours} hrs/day
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full accent-purple-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Metric 3: AI Learning DNA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-neutral-400 text-sm uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-emerald-400" />
            AI Learning DNA
          </h2>
          <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md text-sm font-medium mb-3">
            {data.studentInsights.learningDNA.type}
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {data.studentInsights.learningDNA.description}
          </p>
        </div>
      </div>

      {/* Middle Row: Academic GPS & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic GPS Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-400" />
            Academic GPS Route
          </h2>
          <div className="space-y-6">
            {data.academicGPS.map((plan, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30">
                    {plan.week}
                  </div>
                  {index !== data.academicGPS.length - 1 && (
                    <div className="w-px h-full bg-white/10 my-2"></div>
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {plan.focus}
                  </h3>
                  <ul className="space-y-2">
                    {plan.tasks.map((task, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-400">
                        <BookOpen className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Failure Predictions & Vision Tutor */}
        <div className="space-y-6">
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Predicted Board Questions
            </h2>
            <div className="space-y-4">
              {data.predictedBoardQuestions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1 block">
                    {q.topic}
                  </span>
                  <p className="text-sm text-neutral-200">{q.question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons for the UI/UX Dev to hook up later */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl text-sm font-medium text-white">
              <Camera className="w-4 h-4 text-blue-400" />
              AI Doubt Tutor (Vision)
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl text-sm font-medium text-white">
              <Brain className="w-4 h-4 text-purple-400" />
              View Concept Graph
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
