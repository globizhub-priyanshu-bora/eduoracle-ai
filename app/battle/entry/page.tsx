"use client";

import React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Trophy, Target, Play, Info, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";

export default function BattleQuizEntry() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "current-affairs";

  const domainTitles: Record<string, string> = {
    "civil": "Civil Engineering",
    "electrical": "Electrical Engineering",
    "mechanical": "Mechanical Engineering",
    "electronics": "Electronics & Telecomm.",
    "current-affairs": "Recent Current Affairs"
  };
  const displayTitle = domainTitles[domain] || "ISRO Scientist 'SC'";

  const quizDetails = {
    title: `${displayTitle} Battle`,
    expiryDate: "23 Mar, 2026",
    startDate: "11 Mar, 2026",
    endDate: "14 Mar, 2026",
    attempts: 1,
    totalScore: 500,
    passingScore: 300,
    questions: 5,
    duration: "00:02",
    department: "Department of Space & AI Research"
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            <ShieldCheck size={14} />
            Verified Mission
          </div>
          <h1 className="text-2xl font-bold text-white">{quizDetails.title}</h1>
          <p className="text-neutral-400 text-xs mt-2 italic">Expiry Date: {quizDetails.expiryDate}</p>
        </div>

        <div className="grid grid-cols-2 border-b border-white/5">
          <div className="p-4 border-r border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Calendar size={14} className="text-orange-500" />
              <span className="text-[10px] font-bold uppercase">Start Date</span>
            </div>
            <p className="font-bold text-orange-400">{quizDetails.startDate}</p>
          </div>
          <div className="p-4 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Calendar size={14} className="text-red-500" />
              <span className="text-[10px] font-bold uppercase">End Date</span>
            </div>
            <p className="font-bold text-red-400">{quizDetails.endDate}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <StatRow icon={<Play size={16}/>} label="Attempt Count" value={quizDetails.attempts} />
            <StatRow icon={<Trophy size={16}/>} label="Total Score" value={quizDetails.totalScore} />
            <StatRow icon={<Target size={16} className="text-orange-500"/>} label="Passing Score" value={quizDetails.passingScore} highlight />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-black text-orange-400">{quizDetails.questions}</span>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-tighter">Questions</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-black text-white">{quizDetails.duration}</span>
              <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-tighter">Hours</span>
            </div>
          </div>

          <button 
            // 🚨 Sends them to the Live Quiz with the domain! 🚨
            onClick={() => router.push(`/battle/live?domain=${domain}`)}
            className="w-full mt-4 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2 group"
          >
            Start Battle Quiz
            <Play size={18} className="fill-current group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatRow({ icon, label, value, highlight = false }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-3 text-neutral-400">
        <span className="p-1.5 bg-white/5 rounded-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <span className={`font-mono font-bold ${highlight ? 'text-orange-400' : 'text-neutral-200'}`}>{value}</span>
    </div>
  );
}