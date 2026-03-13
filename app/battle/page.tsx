"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Zap, Settings, Radio, Globe2, ChevronRight, 
  ShieldCheck, Brain, Trophy, Medal, Award, Flame, 
  User, Star, Activity, Users, Edit2, Check, LayoutGrid, Loader2, Stethoscope, 
  Dna, Baby, Bone, HeartPulse, Microscope, Calculator, TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const MOCK_LEADERBOARD = [
  { id: "1", score: 720, rank: "Mission Director", domain: "Reasoning & Apt.", trend: "up", isCurrentUser: true },
  { id: "2", name: "Rahul D.", score: 680, rank: "Mission Director", domain: "Radiology", avatar: "RD", trend: "same" },
  { id: "3", name: "Vikram K.", score: 645, rank: "Scientist 'SC'", domain: "Computer Science", avatar: "VK", trend: "down" },
  { id: "4", name: "Anita P.", score: 590, rank: "Scientist 'SC'", domain: "Electrical Eng.", avatar: "AP", trend: "up" },
  { id: "5", name: "John M.", score: 510, rank: "Scientist 'SC'", domain: "Mechanical Eng.", avatar: "JM", trend: "up" },
  { id: "6", name: "Priya T.", score: 480, rank: "Scientist 'SC'", domain: "General Medicine", avatar: "PT", trend: "same" },
  { id: "7", name: "Rohan C.", score: 410, rank: "Senior Researcher", domain: "Orthopedics", avatar: "RC", trend: "down" },
  { id: "8", name: "Sneha V.", score: 350, rank: "Senior Researcher", domain: "Civil Eng.", avatar: "SV", trend: "up" },
];

function PodiumCard({ user, height, color, shadow, icon, delay, isCenter = false }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className={`relative w-28 sm:w-44 flex flex-col items-center ${isCenter ? 'z-10' : 'z-0'}`}>
      <div className={`absolute -top-12 w-16 h-16 rounded-full bg-neutral-900 border-4 flex items-center justify-center font-black shadow-2xl ${isCenter ? 'border-orange-500 w-20 h-20' : 'border-neutral-700'}`}>
        <span className="text-white text-xl">{user?.avatar || "OP"}</span>
      </div>
      <div className={`w-full ${height} bg-gradient-to-t ${color} rounded-t-3xl p-[1px] ${shadow}`}>
        <div className="w-full h-full bg-neutral-900 rounded-t-[23px] flex flex-col items-center justify-end pb-6 px-2 text-center border-x border-t border-white/5">
          <span className="text-[10px] sm:text-xs text-white truncate w-full font-bold uppercase tracking-widest mb-1">{user?.name || "Unknown"}</span>
          <span className="font-mono font-black text-lg sm:text-2xl text-orange-500">{user?.score || 0}</span>
        </div>
      </div>
    </motion.div>
  );
}

function BattleHubContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"missions" | "leaderboard">("missions");
  const [sector, setSector] = useState<"eng" | "med" | "cog">("eng");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  
  // 🚨 PERSISTENT NAME LOGIC 🚨
  const [userName, setUserName] = useState("Operative"); 
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [tempName, setTempName] = useState("");

  // Check Local Storage when component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("eduoracle_player_name");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const branches = {
    eng: [
      { id: "civil", title: "Civil Engineering", icon: <Building2 size={20}/>, color: "from-blue-500/20", text: "text-blue-400" },
      { id: "electrical", title: "Electrical Engineering", icon: <Zap size={20}/>, color: "from-yellow-500/20", text: "text-yellow-400" },
      { id: "electronics", title: "Electronics Eng.", icon: <Radio size={20}/>, color: "from-purple-500/20", text: "text-purple-400" },
      { id: "computer-science", title: "Computer Science", icon: <LayoutGrid size={20}/>, color: "from-cyan-500/20", text: "text-cyan-400" },
      { id: "mechanical", title: "Mechanical Engineering", icon: <Settings size={20}/>, color: "from-red-500/20", text: "text-red-400" },
    ],
    med: [
      { id: "radiology", title: "Radiology", icon: <Microscope size={20}/>, color: "from-emerald-500/20", text: "text-emerald-400" },
      { id: "dermatology", title: "Dermatology", icon: <Dna size={20}/>, color: "from-teal-500/20", text: "text-teal-400" },
      { id: "general-medicine", title: "General Medicine", icon: <Stethoscope size={20}/>, color: "from-green-500/20", text: "text-green-400" },
      { id: "pediatrics", title: "Pediatrics", icon: <Baby size={20}/>, color: "from-rose-500/20", text: "text-rose-400" },
      { id: "obgy", title: "OBGY", icon: <HeartPulse size={20}/>, color: "from-pink-500/20", text: "text-pink-400" },
      { id: "orthopedics", title: "Orthopedics", icon: <Bone size={20}/>, color: "from-orange-500/20", text: "text-orange-400" },
    ],
    cog: [
      { id: "reasoning", title: "Reasoning", icon: <Brain size={20}/>, color: "from-indigo-500/20", text: "text-indigo-400" },
      { id: "basic-maths", title: "Basic Maths", icon: <Calculator size={20}/>, color: "from-violet-500/20", text: "text-violet-400" },
      { id: "current-affairs", title: "Current Affairs", icon: <Globe2 size={20}/>, color: "from-amber-500/20", text: "text-amber-400" },
    ]
  };

  const getInitials = (n: string) => {
    if (!n) return "OP";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  // Save to State AND Local Storage
  const handleSaveName = () => {
    if (tempName.trim() !== "") {
      const newName = tempName.trim();
      setUserName(newName);
      localStorage.setItem("eduoracle_player_name", newName); 
    }
    setShowNamePopup(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-4 sm:p-6 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Glows */}
      <div className={`absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${activeTab === 'missions' ? 'bg-blue-600/10' : 'bg-orange-600/10'}`} />
      <div className={`absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${activeTab === 'missions' ? 'bg-purple-600/10' : 'bg-yellow-600/5'}`} />

      {/* 🚨 NAME CONFIGURATION POPUP 🚨 */}
      <AnimatePresence>
        {showNamePopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-neutral-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl max-w-sm w-full">
              <h3 className="text-2xl font-black text-white mb-2 uppercase italic">Identity Config</h3>
              <p className="text-xs text-neutral-400 mb-6 font-bold tracking-widest uppercase">Enter your name:</p>
              <input 
                autoFocus 
                placeholder="Enter your name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="w-full bg-black/50 border border-orange-500/50 rounded-xl p-4 text-white font-bold outline-none focus:border-orange-500 transition-colors mb-6 shadow-inner"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowNamePopup(false)} className="flex-1 py-4 rounded-xl font-black text-xs text-neutral-400 bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-widest">Cancel</button>
                <button onClick={handleSaveName} className="flex-1 py-4 rounded-xl font-black text-xs text-white bg-orange-600 hover:bg-orange-500 transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(234,88,12,0.4)]">Save Data</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        {/* HUD */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center font-black text-white">{getInitials(userName)}</div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-md border-2 border-neutral-950">LVL 42</div>
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-0.5">Operative</p>
              {/* Trigger the Popup */}
              <h2 onClick={() => { setTempName(userName); setShowNamePopup(true); }} className="text-xl font-black text-white flex items-center gap-2 cursor-pointer group hover:text-orange-400 transition-colors" title="Click to change player">
                {userName} <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
              </h2>
            </div>
          </div>
          <div className="flex gap-8">
             <div className="text-center md:text-right"><p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest flex items-center gap-1 justify-center md:justify-end"><Star size={10} className="text-orange-500"/> Total XP</p><p className="text-2xl font-mono font-black text-orange-400">720</p></div>
             <div className="w-px h-10 bg-white/10 hidden md:block" />
             <div className="text-center md:text-right"><p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest flex items-center gap-1 justify-center md:justify-end"><Activity size={10} className="text-emerald-500"/> Global Rank</p><p className="text-2xl font-mono font-black text-white">#1</p></div>
          </div>
        </motion.div>

        {/* Toggle Hub/Leaderboard */}
        <div className="flex bg-black/40 p-1.5 rounded-full border border-white/10 max-w-sm w-full mb-10 relative shadow-inner">
          <button onClick={() => setActiveTab("missions")} className={`flex-1 py-3 text-xs font-black uppercase rounded-full transition-all z-10 ${activeTab === 'missions' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Missions</button>
          <button onClick={() => setActiveTab("leaderboard")} className={`flex-1 py-3 text-xs font-black uppercase rounded-full transition-all z-10 ${activeTab === 'leaderboard' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Hall of Fame</button>
          <motion.div animate={{ left: activeTab === "missions" ? "6px" : "calc(50% + 6px)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 rounded-full shadow-lg" />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "missions" ? (
            <motion.div key="missions" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
              {/* Sector Selector */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                {["eng", "med", "cog"].map((s: any) => (
                  <button key={s} onClick={() => { setSector(s); setSelectedBranch(null); }} className={`px-6 py-3 rounded-2xl border font-black text-xs uppercase tracking-widest transition-all ${sector === s ? 'bg-orange-600 border-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]' : 'bg-white/[0.02] border-white/5 text-neutral-500 hover:bg-white/10 hover:text-neutral-300'}`}>
                    {s === 'eng' ? 'Engineering' : s === 'med' ? 'Medical' : 'Cognitive Tracks'}
                  </button>
                ))}
              </div>

              {/* Branch Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {branches[sector].map(b => {
                  const isSelected = selectedBranch === b.id;
                  return (
                    <motion.button key={b.id} whileHover={{ y: -4, scale: 1.02 }} onClick={() => setSelectedBranch(b.id)} className={`relative p-6 rounded-[2rem] border text-left transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${b.color} border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]` : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
                      <div className={`p-4 rounded-2xl w-fit mb-6 bg-black/40 ${isSelected ? b.text : 'text-neutral-500'}`}>{b.icon}</div>
                      <h3 className={`font-black text-lg uppercase tracking-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{b.title}</h3>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase mt-2 tracking-widest flex items-center gap-1"><Users size={12}/> 10 Nodes Ready</p>
                      {isSelected && <div className={`absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-current animate-ping ${b.text}`} />}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => selectedBranch && router.push(`/battle/entry?domain=${selectedBranch}`)} 
                  disabled={!selectedBranch}
                  className={`px-16 py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 ${selectedBranch ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:shadow-[0_0_60px_rgba(234,88,12,0.6)] active:scale-95' : 'bg-white/5 text-neutral-600 border border-white/5 cursor-not-allowed'}`}
                >
                  Enter Combat Zone <ChevronRight size={20} className={selectedBranch ? "animate-pulse" : ""} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="leaderboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full flex flex-col items-center">
               
               {/* THE PODIUM */}
               <div className="flex items-end justify-center gap-2 sm:gap-6 h-64 mb-16 w-full mt-4">
                 <PodiumCard user={MOCK_LEADERBOARD[1]} height="h-40" color="from-slate-400 to-slate-600" shadow="shadow-slate-500/20" icon={<Medal size={24} className="text-slate-300"/>} delay={0.1} />
                 
                 {/* Dynamically applying the edited userName and Initials to the #1 Spot */}
                 <PodiumCard user={{...MOCK_LEADERBOARD[0], name: userName, avatar: getInitials(userName)}} height="h-56" color="from-yellow-400 to-amber-600" shadow="shadow-[0_0_40px_rgba(234,179,8,0.3)]" icon={<Trophy size={32} className="text-yellow-300"/>} isCenter delay={0} />
                 
                 <PodiumCard user={MOCK_LEADERBOARD[2]} height="h-32" color="from-orange-500 to-red-700" shadow="shadow-orange-600/20" icon={<Award size={24} className="text-orange-400"/>} delay={0.2} />
               </div>

               {/* FULL LIST VIEW (Ranks 4-8) */}
               <div className="flex flex-col gap-3 w-full max-w-4xl pb-20">
                 {MOCK_LEADERBOARD.slice(3).map((u, i) => (
                   <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border bg-white/[0.02] border-white/5 hover:bg-white/5 transition-colors group">
                     <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col items-center w-8">
                          <span className="text-lg font-black text-neutral-500">#{i+4}</span>
                          {u.trend === 'up' ? <TrendingUp size={12} className="text-emerald-500 mt-1" /> : u.trend === 'down' ? <TrendingDown size={12} className="text-red-500 mt-1" /> : <Minus size={12} className="text-neutral-700 mt-1" />}
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-2 border-white/10 bg-neutral-800 text-white group-hover:border-white/30 transition-colors">{u.avatar}</div>
                        <div>
                          <h3 className="font-bold text-base text-white">{u.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{u.domain}</span>
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                        <span className="font-mono text-xl font-black text-white">{u.score}</span>
                        <span className="text-[9px] font-black text-neutral-500 uppercase">XP</span>
                     </div>
                   </motion.div>
                 ))}
               </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 🚨 SAFE DEFAULT EXPORT BOUNDARY 🚨
export default function BattleHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center"><Loader2 size={48} className="animate-spin text-orange-500" /></div>}>
      <BattleHubContent />
    </Suspense>
  );
}