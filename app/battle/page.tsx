"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Zap, Settings, Radio, Globe2, ChevronRight, ShieldCheck } from 'lucide-react';

export default function DomainSelectionPage() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const domains = [
    { id: "civil", title: "Basic Civil Engineering", icon: <Building2 size={24} />, color: "from-blue-500/20 to-cyan-500/5", borderColor: "border-blue-500/50", textColor: "text-blue-400" },
    { id: "electrical", title: "Basic Electrical Engineering", icon: <Zap size={24} />, color: "from-yellow-500/20 to-orange-500/5", borderColor: "border-yellow-500/50", textColor: "text-yellow-400" },
    { id: "mechanical", title: "Basic Mechanical Engineering", icon: <Settings size={24} />, color: "from-red-500/20 to-rose-500/5", borderColor: "border-red-500/50", textColor: "text-red-400" },
    { id: "electronics", title: "Electronics & Telecomm.", icon: <Radio size={24} />, color: "from-purple-500/20 to-fuchsia-500/5", borderColor: "border-purple-500/50", textColor: "text-purple-400" },
    { id: "current-affairs", title: "Recent Current Affairs", icon: <Globe2 size={24} />, color: "from-emerald-500/20 to-teal-500/5", borderColor: "border-emerald-500/50", textColor: "text-emerald-400" }
  ];

  const handleProceed = () => {
    if (selectedDomain) {
      // 🚨 Sends them to the Briefing Page with the domain!
      router.push(`/battle/entry?domain=${selectedDomain}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full z-10">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <ShieldCheck size={14} className="text-orange-500" />
            Mission Configuration
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
            Select Your Domain
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto">
            Choose your engineering specialization or current affairs track to calibrate the AI Battle Engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {domains.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            return (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDomain(domain.id)}
                className={`relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected ? `bg-gradient-to-br ${domain.color} ${domain.borderColor} shadow-[0_0_20px_rgba(0,0,0,0.3)]` : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-neutral-300"
                }`}
              >
                <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${isSelected ? domain.textColor : "text-neutral-400"}`}>
                  {domain.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isSelected ? "text-white" : "text-neutral-200"}`}>{domain.title}</h3>
                  <p className="text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wider">Targeted Simulation</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? `border-current ${domain.textColor}` : "border-neutral-600"}`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button onClick={handleProceed} disabled={!selectedDomain} className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${selectedDomain ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer" : "bg-white/5 text-neutral-500 border border-white/5 cursor-not-allowed"}`}>
            Acknowledge & Proceed
            <ChevronRight size={20} className={selectedDomain ? "animate-pulse" : ""} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}