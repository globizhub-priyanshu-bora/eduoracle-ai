"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Play, Gauge, Flame, Skull, ChevronLeft, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";

function EntryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "reasoning";
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/10 text-center relative">
          <button onClick={() => router.push('/battle')} className="absolute left-6 top-10 text-neutral-500"><ChevronLeft/></button>
          <div className="text-orange-500 text-[10px] font-black uppercase mb-2 flex justify-center gap-2 tracking-[0.2em]"><ShieldCheck size={12}/> Deployment Briefing</div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">{domain.replace('-', ' ')}</h1>
        </div>
        <div className="p-10 space-y-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-5 rounded-3xl border border-white/5 text-center"><p className="text-[10px] text-neutral-500 uppercase font-bold">Nodes</p><p className="text-2xl font-mono text-orange-400 font-black">10</p></div>
            <div className="bg-black/40 p-5 rounded-3xl border border-white/5 text-center"><p className="text-[10px] text-neutral-500 uppercase font-bold">Timer</p><p className="text-2xl font-mono text-white font-black">05:00</p></div>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 font-black uppercase mb-4 tracking-widest text-center">Threat Level Calibration</p>
            <div className="grid grid-cols-3 gap-2">
              {['easy', 'medium', 'hard'].map((d: any) => (
                <button key={d} onClick={() => setDifficulty(d)} className={`py-5 rounded-2xl border flex flex-col items-center gap-2 transition-all ${difficulty === d ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-white/5 border-white/5 text-neutral-500'}`}>
                  {d === 'easy' ? <Gauge size={20}/> : d === 'medium' ? <Flame size={20}/> : <Skull size={20}/>}
                  <span className="text-[10px] font-black uppercase">{d}</span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => router.push(`/battle/live?domain=${domain}&difficulty=${difficulty}`)} className="w-full py-6 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:shadow-orange-600/30 transition-all uppercase tracking-widest">Initialise Sequence</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function BattleEntry() {
  return (<Suspense fallback={<div className="bg-neutral-950 min-h-screen"/>}><EntryContent /></Suspense>);
}