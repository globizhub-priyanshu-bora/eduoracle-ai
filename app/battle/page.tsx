"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Zap, Settings, Radio, Globe2, ChevronRight, 
  ShieldCheck, Brain, Trophy, Medal, Award, Search, Flame, 
  TrendingUp, TrendingDown, Minus, User, Star, Activity, Clock, Users
} from 'lucide-react';

// --- ENHANCED MOCK DATABASE ---
const MOCK_USER = { name: "Triya Nath", xp: 720, globalRank: 1, level: 42 };

const MOCK_LEADERBOARD = [
  { id: "1", name: "Triya Nath", score: 720, rank: "Mission Director", domain: "Reasoning & Aptitude", avatar: "TN", trend: "up", isCurrentUser: true },
  { id: "2", name: "Rahul D.", score: 680, rank: "Mission Director", domain: "Civil Engineering", avatar: "RD", trend: "same", isCurrentUser: false },
  { id: "3", name: "Vikram K.", score: 645, rank: "Mission Director", domain: "Current Affairs", avatar: "VK", trend: "up", isCurrentUser: false },
  { id: "4", name: "Anita P.", score: 590, rank: "Scientist 'SC'", domain: "Electrical Engineering", avatar: "AP", trend: "down", isCurrentUser: false },
  { id: "5", name: "John M.", score: 510, rank: "Scientist 'SC'", domain: "Mechanical Engineering", avatar: "JM", trend: "up", isCurrentUser: false },
  { id: "6", name: "Priya T.", score: 480, rank: "Scientist 'SC'", domain: "Reasoning & Aptitude", avatar: "PT", trend: "same", isCurrentUser: false },
  { id: "7", name: "Rohan C.", score: 410, rank: "Scientist 'SC'", domain: "Electronics & Telecomm.", avatar: "RC", trend: "down", isCurrentUser: false },
  { id: "8", name: "Sneha V.", score: 350, rank: "Senior Researcher", domain: "Civil Engineering", avatar: "SV", trend: "up", isCurrentUser: false },
];

const LEADERBOARD_DOMAINS = [
  "All", "Civil Engineering", "Electrical Engineering", "Mechanical Engineering", 
  "Electronics & Telecomm.", "Current Affairs", "Reasoning & Aptitude"
];

const TIME_FILTERS = ["All Time", "This Week", "Today"];

// PREMIUM PODIUM SUB-COMPONENT
function PodiumCard({ user, rank, height, color, shadow, icon, delay, isCenter = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: "spring", bounce: 0.5 }}
      className={`relative w-28 sm:w-44 flex flex-col items-center ${isCenter ? 'z-10' : 'z-0 opacity-90 hover:opacity-100'}`}
    >
      <div className={`absolute -top-14 sm:-top-20 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-neutral-950 border-4 flex items-center justify-center font-black text-2xl sm:text-3xl shadow-2xl ${isCenter ? 'border-yellow-400 w-24 h-24 sm:w-32 sm:h-32 -top-16 sm:-top-24 z-20' : 'border-neutral-700'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500">{user.avatar}</span>
        <div className={`absolute -bottom-4 sm:-bottom-5 bg-neutral-900 border border-white/10 p-2.5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] ${isCenter ? 'ring-2 ring-yellow-500/50' : ''}`}>
          {icon}
        </div>
      </div>

      <div className={`w-full ${height} bg-gradient-to-t ${color} rounded-t-3xl p-[2px] ${shadow} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent w-full h-1/3" />
        <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-t-[22px] backdrop-blur-xl flex flex-col items-center justify-end pb-6 sm:pb-8 px-3 text-center border-x border-t border-white/10">
          <span className="font-black text-white text-base sm:text-lg truncate w-full mb-1 drop-shadow-md">{user.name}</span>
          <div className="bg-black/50 px-3 py-1 rounded-lg border border-white/10">
            <span className={`font-mono font-black text-xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-b ${color}`}>
              {user.score}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BattleHubPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"missions" | "leaderboard">("missions");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [leaderboardTab, setLeaderboardTab] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");

  const domains = [
    { id: "civil", title: "Civil Engineering", enrolled: "1.2k", trending: false, icon: <Building2 size={28} />, color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/50", text: "text-blue-400" },
    { id: "electrical", title: "Electrical Engineering", enrolled: "850", trending: true, icon: <Zap size={28} />, color: "from-yellow-500/20 to-orange-500/5", border: "border-yellow-500/50", text: "text-yellow-400" },
    { id: "mechanical", title: "Mechanical Engineering", enrolled: "2.1k", trending: false, icon: <Settings size={28} />, color: "from-red-500/20 to-rose-500/5", border: "border-red-500/50", text: "text-red-400" },
    { id: "electronics", title: "Electronics & Telecomm.", enrolled: "620", trending: false, icon: <Radio size={28} />, color: "from-purple-500/20 to-fuchsia-500/5", border: "border-purple-500/50", text: "text-purple-400" },
    { id: "current-affairs", title: "Recent Current Affairs", enrolled: "4.5k", trending: true, icon: <Globe2 size={28} />, color: "from-emerald-500/20 to-teal-500/5", border: "border-emerald-500/50", text: "text-emerald-400" },
    { id: "reasoning-aptitude", title: "Reasoning & Aptitude", enrolled: "5.2k", trending: true, icon: <Brain size={28} />, color: "from-indigo-500/20 to-purple-500/5", border: "border-indigo-500/50", text: "text-indigo-400" }
  ];

  const filteredLeaderboard = MOCK_LEADERBOARD.filter((user) => {
    const matchesDomain = leaderboardTab === "All" || user.domain === leaderboardTab;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const topThree = filteredLeaderboard.slice(0, 3);
  const restOfBoard = filteredLeaderboard.slice(3);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center p-4 sm:p-6 relative overflow-x-hidden">
      <div className={`absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${activeView === 'missions' ? 'bg-blue-600/10' : 'bg-orange-600/10'}`} />
      <div className={`absolute bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${activeView === 'missions' ? 'bg-purple-600/10' : 'bg-yellow-600/5'}`} />

      <div className="max-w-6xl w-full z-10 flex flex-col items-center pt-4">
        
        {/* PREMIUM HUD */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center"><User size={24} className="text-white" /></div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-neutral-950">LVL {MOCK_USER.level}</div>
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-0.5">Operative</p>
              <h2 className="text-xl font-black text-white">{MOCK_USER.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-8 w-full md:w-auto justify-between md:justify-end">
            <div className="text-center md:text-right">
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center justify-center md:justify-end gap-1 mb-1"><Star size={10} className="text-orange-500"/> Total XP</p>
              <p className="text-2xl font-mono font-black text-orange-400">{MOCK_USER.xp.toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center md:text-right">
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center justify-center md:justify-end gap-1 mb-1"><Activity size={10} className="text-emerald-500"/> Global Rank</p>
              <p className="text-2xl font-mono font-black text-white">#{MOCK_USER.globalRank}</p>
            </div>
          </div>
        </motion.div>

        {/* TOGGLE SWITCH */}
        <div className="flex bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 mb-10 w-full max-w-sm relative shadow-inner">
          <button onClick={() => setActiveView("missions")} className={`flex-1 py-3 text-sm font-black uppercase tracking-wider rounded-full transition-all z-10 flex items-center justify-center gap-2 ${activeView === "missions" ? "text-white" : "text-neutral-500"}`}>
            <ShieldCheck size={16} /> Missions
          </button>
          <button onClick={() => setActiveView("leaderboard")} className={`flex-1 py-3 text-sm font-black uppercase tracking-wider rounded-full transition-all z-10 flex items-center justify-center gap-2 ${activeView === "leaderboard" ? "text-white" : "text-neutral-500"}`}>
            <Trophy size={16} /> Leaderboard
          </button>
          <motion.div className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]" initial={false} animate={{ left: activeView === "missions" ? "6px" : "calc(50% + 6px)" }} />
        </div>

        <div className="w-full relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeView === "missions" ? (
              <motion.div key="missions" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="w-full flex flex-col items-center">
                <div className="text-center mb-10 space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Select Your Protocol</h1>
                  <p className="text-neutral-400 max-w-lg mx-auto font-medium">Initialize a combat sequence to earn XP and climb the global ranks.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 w-full">
                  {domains.map((domain) => {
                    const isSelected = selectedDomain === domain.id;
                    return (
                      <motion.button key={domain.id} whileHover={{ scale: 1.02, y: -4 }} onClick={() => setSelectedDomain(domain.id)} className={`relative flex flex-col p-6 rounded-3xl border text-left transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${domain.color} ${domain.border} shadow-2xl ring-1 ring-white/20` : "bg-white/[0.02] border-white/5 hover:border-white/20"}`}>
                        <div className="absolute top-4 right-4"><div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? `border-current ${domain.text}` : "border-neutral-700"}`}>{isSelected && <div className="w-2.5 h-2.5 rounded-full bg-current" />}</div></div>
                        <div className={`p-3 rounded-2xl w-fit mb-4 bg-black/40 border border-white/5 ${isSelected ? domain.text : "text-neutral-400"}`}>{domain.icon}</div>
                        <h3 className={`font-black text-xl mb-2 ${isSelected ? "text-white" : "text-neutral-200"}`}>{domain.title}</h3>
                        <div className="flex items-center gap-3 mt-auto pt-4">
                           <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/30 border border-white/5 text-xs text-neutral-400 font-bold"><Users size={12} /> {domain.enrolled} Cadets</div>
                           {domain.trending && <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-xs text-orange-400 font-black tracking-widest uppercase"><Flame size={12} className="fill-current" /> Hot</div>}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <button onClick={() => selectedDomain && router.push(`/battle/entry?domain=${selectedDomain}`)} disabled={!selectedDomain} className={`flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-lg transition-all duration-500 ${selectedDomain ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg" : "bg-white/5 text-neutral-600 border border-white/5 cursor-not-allowed"}`}>INITIALIZE MISSION <ChevronRight size={24} /></button>
              </motion.div>
            ) : (
              <motion.div key="leaderboard" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="w-full flex flex-col">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 w-full">
                  <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar w-full lg:w-auto">
                    {LEADERBOARD_DOMAINS.map((domain) => (
                      <button key={domain} onClick={() => setLeaderboardTab(domain)} className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${leaderboardTab === domain ? "bg-orange-500 text-neutral-950" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>{domain}</button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
                      {TIME_FILTERS.map(tf => (
                         <button key={tf} onClick={() => setTimeFilter(tf)} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex-1 sm:flex-none ${timeFilter === tf ? 'bg-white/10 text-white' : 'text-neutral-500'}`}>{tf}</button>
                      ))}
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                      <input type="text" placeholder="Locate Cadet..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none" />
                    </div>
                  </div>
                </div>

                {topThree.length > 0 && (
                  <div className="flex items-end justify-center gap-2 sm:gap-8 mb-16 mt-12 h-64 w-full">
                    {topThree[1] && <PodiumCard user={topThree[1]} rank={2} height="h-44" color="from-slate-300 to-slate-400" shadow="shadow-slate-400/30" icon={<Medal size={24} className="text-slate-300"/>} delay={0.2} />}
                    {topThree[0] && <PodiumCard user={topThree[0]} rank={1} height="h-60" color="from-yellow-300 to-amber-500" shadow="shadow-yellow-500/40" icon={<Trophy size={36} className="text-yellow-300"/>} delay={0} isCenter />}
                    {topThree[2] && <PodiumCard user={topThree[2]} rank={3} height="h-32" color="from-orange-500 to-red-600" shadow="shadow-orange-600/30" icon={<Award size={24} className="text-orange-400"/>} delay={0.4} />}
                  </div>
                )}

                <div className="flex flex-col gap-3 w-full pb-20">
                  {restOfBoard.map((user, index) => (
                    <motion.div key={user.id} className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all ${user.isCurrentUser ? 'bg-orange-500/10 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col items-center justify-center w-8">
                          <span className={`text-lg font-black ${user.isCurrentUser ? 'text-orange-400' : 'text-neutral-500'}`}>#{index + 4}</span>
                          {user.trend === 'up' && <TrendingUp size={12} className="text-emerald-500 mt-1" />}
                          {user.trend === 'down' && <TrendingDown size={12} className="text-red-500 mt-1" />}
                          {user.trend === 'same' && <Minus size={12} className="text-neutral-600 mt-1" />}
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-2 ${user.isCurrentUser ? 'bg-orange-500 text-black border-orange-400' : 'bg-gradient-to-br from-neutral-700 to-neutral-800 text-white border-white/10'}`}>{user.avatar}</div>
                        <div>
                          <h3 className={`font-bold text-base flex items-center gap-2 ${user.isCurrentUser ? 'text-orange-400' : 'text-white'}`}>{user.name} {user.isCurrentUser && <span className="text-[9px] bg-orange-500 text-black px-1.5 py-0.5 rounded font-black">YOU</span>}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-neutral-300 uppercase bg-white/10 px-2 py-0.5 rounded-md border border-white/10">{user.rank}</span>
                            <span className="text-[10px] text-neutral-500 hidden sm:block">• {user.domain}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                        <span className={`font-mono text-xl font-black ${user.isCurrentUser ? 'text-orange-400' : 'text-white'}`}>{user.score}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase">XP</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}