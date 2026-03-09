"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Rocket,
  ArrowLeft,
  Cpu,
  Globe,
  Plus,
  X,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Expanding the Master API 'careerEngine' string array into visual objects
const mockCareerData = {
  primaryGoal: {
    title: "ISRO Scientist 'SC' (Computer Science)",
    alignmentScore: 94,
    trajectory: "Optimal",
    lockedSkills: ["Operating Systems", "Data Structures"],
    pendingSkills: ["Paging & Segmentation", "Advanced Algorithms"],
  },
  alternativeEngines: [
    {
      title: "Cloud Solutions Architect",
      alignmentScore: 82,
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      gap: "Requires deeper Distributed Systems focus.",
    },
    {
      title: "Systems Engineer",
      alignmentScore: 76,
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      gap: "Requires Low-Level Hardware Architecture.",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120 } },
};

export default function CareerGoalsPage() {
  const [data] = useState(mockCareerData);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 md:p-10 font-sans overflow-x-hidden relative">
      {/* Mobile-Optimized Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 mb-8 md:mb-10"
      >
        <Link
          href="/student"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2 md:gap-3">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-400 shrink-0" />
              AI Career Engine
            </h1>
            <p className="text-neutral-400 mt-2 flex items-center gap-2 text-sm md:text-base">
              <BrainCircuit className="w-4 h-4 text-blue-400 shrink-0" />
              Mapping cognitive data to real-world trajectories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Add New Career Goal Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 md:py-4 rounded-2xl text-sm font-bold transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              Explore Trajectory
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white border border-purple-500/20 px-5 py-3 md:py-4 rounded-2xl text-sm font-bold transition-all active:scale-95">
              <Zap className="w-4 h-4" />
              Recalculate
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 md:space-y-8"
      >
        {/* Primary Target */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-3xl p-5 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-purple-400 font-bold mb-3 text-sm md:text-base uppercase tracking-wider">
                <Target className="w-4 h-4 md:w-5 md:h-5" /> Primary AI Match
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {data.primaryGoal.title}
              </h2>
              <p className="text-sm md:text-base text-neutral-300 mb-6 max-w-xl leading-relaxed">
                Based on your Academic Health Score and Learning DNA, you are on
                an optimal trajectory for this role. Completing your current GPS
                route will boost alignment.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-sm font-medium">
                  <ShieldCheck className="w-4 h-4" /> Trajectory:{" "}
                  {data.primaryGoal.trajectory}
                </div>
                <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl text-purple-400 text-sm font-medium">
                  <Rocket className="w-4 h-4" /> Alignment:{" "}
                  {data.primaryGoal.alignmentScore}%
                </div>
              </div>
            </div>

            {/* AI Skill Mapping Radar */}
            <div className="w-full lg:w-72 bg-black/40 border border-white/10 rounded-2xl p-5 shrink-0 flex flex-col justify-center">
              <h3 className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-4 border-b border-white/10 pb-2">
                Cognitive Milestones
              </h3>
              <div className="space-y-4">
                {data.primaryGoal.lockedSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-300">{skill}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
                {data.primaryGoal.pendingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between opacity-50"
                  >
                    <span className="text-sm text-neutral-400">{skill}</span>
                    <div className="w-4 h-4 rounded-full border-2 border-neutral-600" />
                  </div>
                ))}
              </div>
              <Link
                href="/student/gps"
                className="mt-5 w-full bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-xs font-medium text-center transition-colors text-white block"
              >
                View GPS for Pending Skills
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Alternative Engine Trajectories */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-400" /> Alternative
            Trajectories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {data.alternativeEngines.map((alt, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 hover:border-white/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-black/50 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
                      {alt.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white">
                        {alt.title}
                      </h3>
                      <div className="text-xs md:text-sm text-neutral-400 mt-0.5">
                        Alternative Engine Match
                      </div>
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {alt.alignmentScore}%
                  </div>
                </div>

                <div className="w-full bg-black/50 h-1.5 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alt.alignmentScore}%` }}
                    transition={{ duration: 1, delay: 0.2 * idx }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs md:text-sm text-amber-400/80 max-w-[75%] leading-relaxed">
                    <span className="font-semibold text-amber-400">
                      Gap Analysis:
                    </span>{" "}
                    {alt.gap}
                  </p>
                  <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* "EXPLORE NEW TRAJECTORY" MODAL OVERLAY */}
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
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-blue-400">
                    <Search className="w-5 h-5" />
                    Explore New Trajectory
                  </h2>
                  <p className="text-neutral-400 text-xs md:text-sm mt-1">
                    Calculate your cognitive compatibility for a new role.
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
                    Target Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Go (Golang) Backend Engineer"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Industry Domain
                    </label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                      <option>Space & Remote Sensing (GIS)</option>
                      <option>Enterprise Tech & SaaS</option>
                      <option>FinTech / Web3</option>
                      <option>AI & Machine Learning</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Target Timeframe
                    </label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                      <option>Next 6 Months</option>
                      <option>1 Year</option>
                      <option>2+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-2">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-1">
                        AI Skill Gap Analysis
                      </h4>
                      <p className="text-xs text-blue-200/70 leading-relaxed">
                        Initializing this trajectory will command the Gemini API
                        to cross-reference your current Learning DNA with
                        industry-standard requirements for this specific role.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer / Submit */}
              <div className="p-5 md:p-6 border-t border-white/10 bg-black/40 shrink-0">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-[0.98]"
                >
                  <BrainCircuit className="w-5 h-5" />
                  Simulate Compatibility
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
