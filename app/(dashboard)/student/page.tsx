"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Target,
  Activity,
  Map,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Circle,
  TrendingUp,
  Zap,
  X,
} from "lucide-react";
import ConceptGraph from "@/components/graph/ConceptGraph";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 120 } 
  },
};

export default function StudentDashboard() {
  const [data, setData] = useState(mockDashboardData);
  const [studyHours, setStudyHours] = useState(3);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showGraph, setShowGraph] = useState(false);

  const simulatedProbability = Math.min(
    99,
    data.studentInsights.examProbability + (studyHours - 3) * 6,
  );

  const getProbabilityStatus = () => {
    if (simulatedProbability < 60)
      return {
        color: "from-red-500 to-rose-600",
        text: "text-red-400",
        label: "Critical Risk",
        shadow: "shadow-red-500/20",
      };
    if (simulatedProbability < 80)
      return {
        color: "from-amber-400 to-orange-500",
        text: "text-amber-400",
        label: "Borderline",
        shadow: "shadow-amber-500/20",
      };
    return {
      color: "from-emerald-400 to-teal-500",
      text: "text-emerald-400",
      label: "Optimal Trajectory",
      shadow: "shadow-emerald-500/20",
    };
  };

  const status = getProbabilityStatus();

  const toggleTask = (taskName: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskName)) newSet.delete(taskName);
      else newSet.add(taskName);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 md:p-10 font-sans overflow-x-hidden relative">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-10 border-b border-white/10 pb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            AI Diagnostic Overview
          </h1>
          <p className="text-neutral-400 mt-2 flex items-center gap-2 text-sm sm:text-base">
            <Target className="w-4 h-4 text-blue-400 shrink-0" />
            Target Exam: ISRO Scientist 'SC'
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-500/10 px-4 py-2.5 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] w-fit">
          <Activity className="text-blue-400 w-4 h-4 md:w-5 md:h-5 animate-pulse shrink-0" />
          <span className="text-xs md:text-sm font-medium text-blue-200">
            Live Cognitive Sync Active
          </span>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 relative overflow-hidden group"
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-transform duration-500 group-hover:scale-110">
              <Activity className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className="text-neutral-400 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2">
              Academic Health Score
            </h2>
            <div className="flex items-end gap-2">
              <span className="text-4xl md:text-5xl font-bold text-white">
                {data.studentInsights.academicHealthScore}
              </span>
              <span className="text-neutral-500 text-base md:text-lg mb-1">
                / 100
              </span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 md:mt-6 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${data.studentInsights.academicHealthScore}%`,
                }}
                transition={{ duration: 1.5 }}
                className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 relative flex flex-col justify-between shadow-lg transition-all duration-300 ${status.shadow}`}
          >
            <div>
              <h2 className="text-neutral-400 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2 flex justify-between items-center">
                Exam Probability
                <span
                  className={`text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 ${status.text}`}
                >
                  {status.label}
                </span>
              </h2>
              <div className="flex justify-between items-end mb-4">
                <motion.span
                  key={simulatedProbability}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${status.color}`}
                >
                  {simulatedProbability}%
                </motion.span>
              </div>
            </div>
            <div className="mt-2 md:mt-4 pt-4 border-t border-white/10">
              <label className="text-xs text-neutral-400 flex justify-between mb-3 items-center">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-blue-400" /> Twin Override
                </span>
                <span className="text-white font-medium bg-white/10 px-2 py-1 rounded">
                  {studyHours} hrs/day
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
                className="w-full h-2 md:h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-neutral-400 text-xs md:text-sm uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" /> AI Learning DNA
              </h2>
              <div className="inline-block px-3 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-md text-xs md:text-sm font-medium mb-3">
                🧬 {data.studentInsights.learningDNA.type}
              </div>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-4">
                {data.studentInsights.learningDNA.description}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs text-neutral-500 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Career Trajectories
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.studentInsights.careerEngine.map((career, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-neutral-300"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-400" /> Academic GPS Route
              </h2>
              <Link
                href="/student/gps"
                className="text-xs text-blue-400 hover:text-blue-300 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20"
              >
                Expand
              </Link>
            </div>
            <div className="space-y-6">
              {data.academicGPS.map((plan, index) => (
                <div key={index} className="flex gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30 text-sm">
                      {plan.week}
                    </div>
                    {index !== data.academicGPS.length - 1 && (
                      <div className="w-px h-full bg-white/10 my-2"></div>
                    )}
                  </div>
                  <div className="pb-4 flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-3">
                      {plan.focus}
                    </h3>
                    <ul className="space-y-2">
                      {plan.tasks.map((task, i) => {
                        const isDone = completedTasks.has(task);
                        return (
                          <li
                            key={i}
                            onClick={() => toggleTask(task)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${isDone ? "bg-white/5 border-white/10 opacity-50" : "bg-black/40 border-white/10 hover:border-white/20"}`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-blue-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-neutral-500 shrink-0" />
                            )}
                            <span
                              className={`text-xs md:text-sm leading-snug ${isDone ? "text-neutral-500 line-through" : "text-neutral-300"}`}
                            >
                              {task}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" /> AI Predicted Blindspots
              </h2>
              <div className="space-y-3">
                {data.predictedBoardQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-black/40 p-3 md:p-4 rounded-xl border border-red-500/10"
                  >
                    <span className="text-[10px] md:text-xs font-semibold text-red-400/80 uppercase tracking-wider block mb-1">
                      {q.topic}
                    </span>
                    <p className="text-xs md:text-sm text-neutral-200 leading-relaxed">
                      {q.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Link
                href="/student/tutor"
                className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                <span className="text-xs md:text-sm font-medium text-center">
                  AI Vision Tutor
                </span>
              </Link>
              <button
                onClick={() => setShowGraph(true)}
                className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                <span className="text-xs md:text-sm font-medium text-center">
                  Concept Graph
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showGraph && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-2 sm:p-4 md:p-10 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-neutral-950 border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5 shrink-0">
                <div>
                  <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2">
                    <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />{" "}
                    Dependency Engine
                  </h2>
                </div>
                <button
                  onClick={() => setShowGraph(false)}
                  className="p-2 bg-white/10 hover:bg-red-500/20 text-white rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Force height constraint on mobile so the graph is zoomable/pannable without scrolling the whole page */}
              <div className="w-full h-[50vh] md:h-[600px] overflow-hidden">
                <ConceptGraph />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
