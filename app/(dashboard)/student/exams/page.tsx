"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Target,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
  BarChart,
  Lock,
  Zap,
  Plus,
  X,
  UploadCloud,
  FileText,
} from "lucide-react";
import Link from "next/link";

// Hardcoded predictive exam data for the ISRO SC Context
const mockExamsData = {
  readinessScore: 78,
  upcomingMocks: [
    {
      id: "mock-1",
      title: "ISRO Full-Length Mock Test 4",
      date: "Scheduled for Day 7 of GPS",
      duration: "120 mins",
      aiRecommendation: "Wait until GPS completion",
      locked: true,
    },
    {
      id: "mock-2",
      title: "Targeted: Memory Management",
      date: "Recommended Today",
      duration: "45 mins",
      aiRecommendation: "Optimal time to test Virtual Memory",
      locked: false,
    },
  ],
  pastExams: [
    {
      id: "past-1",
      title: "ISRO Full-Length Mock Test 3",
      score: 42,
      total: 100,
      date: "2 days ago",
      rootCauseFailure: "Paging & Segmentation",
      status: "critical",
    },
    {
      id: "past-2",
      title: "Data Structures Diagnostic",
      score: 85,
      total: 100,
      date: "1 week ago",
      rootCauseFailure: "None (Optimal)",
      status: "mastered",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function PredictiveExamsPage() {
  const [data] = useState(mockExamsData);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 md:p-10 font-sans overflow-x-hidden relative">
      {/* Mobile-Optimized Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 mb-8 md:mb-10 border-b border-white/10 pb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2 md:gap-3">
            <BarChart className="w-6 h-6 md:w-8 md:h-8 text-blue-400 shrink-0" />
            Predictive Assessment Engine
          </h1>
          <p className="text-neutral-400 mt-2 flex items-center gap-2 text-sm md:text-base">
            <Target className="w-4 h-4 text-purple-400 shrink-0" /> Target: ISRO
            Scientist 'SC'
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Add Exam Trigger Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 md:py-4 rounded-2xl text-sm font-bold transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            Sync External Exam
          </button>

          {/* Readiness Gauge */}
          <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-2xl backdrop-blur-md w-full sm:w-auto min-w-[200px] flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                AI Readiness
              </div>
              <div className="text-xl md:text-2xl font-bold text-emerald-400">
                {data.readinessScore}%
              </div>
            </div>
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-emerald-500/50" />
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 md:space-y-8"
      >
        {/* Dynamic Micro-Mock Generator */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-5 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 text-sm md:text-base">
                <Zap className="w-4 h-4 md:w-5 md:h-5" /> AI Custom Micro-Mock
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Generate "Virtual Memory" Test
              </h2>
              <p className="text-sm md:text-base text-neutral-300">
                Based on your Academic GPS, you are ready for a 15-minute
                high-yield mock test to prove mastery over your latest weak
                point.
              </p>
            </div>

            <button className="w-full md:w-auto group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 md:py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]">
              <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start 15-Min Mock
            </button>
          </div>
        </motion.div>

        {/* Two Column Layout for Exams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Scheduled & Recommended Exams */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-400" /> Upcoming
              Assessments
            </h2>

            {data.upcomingMocks.map((exam) => (
              <div
                key={exam.id}
                className={`bg-white/5 border rounded-2xl p-5 transition-all relative overflow-hidden ${exam.locked ? "border-white/5 opacity-80" : "border-white/10 hover:border-purple-500/30"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1">
                      {exam.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {exam.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {exam.date}
                      </span>
                    </div>
                  </div>
                  {exam.locked ? (
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5 shrink-0">
                      <Lock className="w-4 h-4 text-neutral-500" />
                    </div>
                  ) : (
                    <button className="bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors shrink-0">
                      Launch
                    </button>
                  )}
                </div>

                <div
                  className={`text-xs md:text-sm px-3 py-2.5 rounded-lg border flex items-start md:items-center gap-2 ${exam.locked ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`}
                >
                  <Brain className="w-4 h-4 shrink-0 mt-0.5 md:mt-0" />
                  <span>
                    <span className="font-semibold">AI Suggests:</span>{" "}
                    {exam.aiRecommendation}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cognitive Autopsy (Past Exams) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-emerald-400" /> Cognitive Autopsy
              (Past)
            </h2>

            {data.pastExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-black/40 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1">
                      {exam.title}
                    </h3>
                    <div className="text-xs text-neutral-500">{exam.date}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xl md:text-2xl font-bold ${exam.status === "critical" ? "text-red-400" : "text-emerald-400"}`}
                    >
                      {exam.score}
                      <span className="text-xs md:text-sm text-neutral-500 font-normal">
                        /{exam.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-2">
                    Identified Root Cause Failure
                  </div>
                  {exam.status === "critical" ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 w-fit">
                        <AlertTriangle className="w-4 h-4 shrink-0" />{" "}
                        {exam.rootCauseFailure}
                      </div>
                      <Link
                        href="/student/gps"
                        className="text-xs md:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                      >
                        View GPS Route &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />{" "}
                      {exam.rootCauseFailure}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* "SYNC TARGET EXAM" MODAL OVERLAY (MOBILE RESPONSIVE) */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10 bg-white/5 shrink-0">
                <div>
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    Sync External Exam
                  </h2>
                  <p className="text-neutral-400 text-xs md:text-sm mt-1">
                    Feed exam parameters into the predictive engine.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Content */}
              <div className="p-5 md:p-6 space-y-5 overflow-y-auto custom-scrollbar">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Exam Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., University Mid-Sem OS"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Context
                    </label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                      <option>ISRO SC Syllabus</option>
                      <option>GATE CS Syllabus</option>
                      <option>University Standard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex justify-between">
                    <span>AI Syllabus Analysis</span>
                    <span className="text-blue-400 text-[10px] bg-blue-500/10 px-2 py-0.5 rounded-md">
                      Optional
                    </span>
                  </label>

                  {/* Faux Drag & Drop Zone */}
                  <div className="w-full border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-white mb-1">
                        Upload Syllabus or Past Paper
                      </div>
                      <div className="text-xs text-neutral-500">
                        PDF, JPG, or DOCX up to 10MB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer / Submit */}
              <div className="p-5 md:p-6 border-t border-white/10 bg-black/40 shrink-0">
                <button
                  onClick={() => setShowAddModal(false)} // Just closes it for the demo
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-[0.98]"
                >
                  <Brain className="w-5 h-5" />
                  Initialize Predictive Sync
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
