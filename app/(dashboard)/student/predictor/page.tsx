"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Calculator,
  ArrowLeft,
  GraduationCap,
  Clock,
  BookCheck,
  Percent,
  Award,
  Loader2,
  TrendingUp,
  CheckCircle2,
  CalendarDays,
  Zap,
  LayoutGrid,
  SlidersHorizontal,
  BrainCircuit,
  Target
} from "lucide-react";
import Link from "next/link";
import { calculateCGPAPredictionAction } from "@/actions/student.actions";

export default function PredictorPage() {
  const [viewMode, setViewMode] = useState<"standard" | "simulator">("standard");
  const [isCalculating, setIsCalculating] = useState(false);
  const [serverResult, setServerResult] = useState<{ percentage: number; cgpa: number } | null>(null);

  const [formData, setFormData] = useState({
    pastCGPA: 7.5,
    internal: 80,
    attendance: 85,
    studyHours: 4,
    assignments: 90,
  });

  // -------------------------------------------------------------------------
  // STANDARD MODE: Server Action Calculation
  // -------------------------------------------------------------------------
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setServerResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await calculateCGPAPredictionAction(formData);
      if (res.success && res.data) {
        setServerResult(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  // -------------------------------------------------------------------------
  // SIMULATOR MODE: Real-time Client Calculations & AI Roadmap Generation
  // -------------------------------------------------------------------------
  const realTimeStats = useMemo(() => {
    let studyScore = (formData.studyHours / 6) * 100;
    if (studyScore > 100) studyScore = 100;

    const predictionScore = 
      (formData.pastCGPA * 10 * 0.40) +  
      (formData.internal * 0.30) +       
      (formData.attendance * 0.10) +     
      (studyScore * 0.15) +              
      (formData.assignments * 0.05);

    return {
      cgpa: Number((predictionScore / 10).toFixed(2)),
      percentage: Number(predictionScore.toFixed(2))
    };
  }, [formData]);

  const dynamicRoadmap = useMemo(() => {
    const deficits = [
      { name: "Attendance", score: formData.attendance, threshold: 85, action: `Your attendance is at ${formData.attendance}%. You are bleeding easy marks. Prioritize attending all lab sessions this month to recover the 10% weightage.` },
      { name: "Internal Exams", score: formData.internal, threshold: 80, action: `Internals hold massive 30% weight. Your ${formData.internal}% is risky. Focus exclusively on the midterm syllabus and past papers for the next 4 weeks.` },
      { name: "Study Hours", score: (formData.studyHours / 6) * 100, threshold: 90, action: `Endurance is low (${formData.studyHours} hrs/day). Use the Pomodoro technique to slowly ramp up to the 6-hour optimal threshold.` },
      { name: "Assignments", score: formData.assignments, threshold: 95, action: `Missing assignment marks (${formData.assignments}%). Block out Sundays purely for pending files. It's a guaranteed 5% boost.` },
    ];

    const sortedDeficits = deficits.sort((a, b) => a.score - b.score);
    const priority1 = sortedDeficits[0];
    const priority2 = sortedDeficits[1];

    return [
      {
        month: "Month 1: Triage & Setup",
        title: priority1.score < priority1.threshold ? `${priority1.name} Recovery` : "Baseline Solidification",
        desc: priority1.score < priority1.threshold ? priority1.action : "All baseline metrics are healthy. Focus heavily on expanding your core subject knowledge this month.",
        bgClass: "bg-blue-500",
        textClass: "text-blue-400",
        shadowClass: "shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      },
      {
        month: "Month 2: Deep Work",
        title: priority2.score < priority2.threshold ? `Stabilize ${priority2.name}` : "Algorithm & Concept Mapping",
        desc: priority2.score < priority2.threshold ? priority2.action : "Transition from theory to application. Complete 5 mock tests focusing purely on high-weightage topics.",
        bgClass: "bg-purple-500",
        textClass: "text-purple-400",
        shadowClass: "shadow-[0_0_15px_rgba(168,85,247,0.5)]"
      },
      {
        month: "Month 3: Execution",
        title: "Simulated Exam State",
        desc: `Shift to timing-based execution. Aim for ${Math.max(8.5, realTimeStats.cgpa + 0.5).toFixed(1)} alignment. Your current trajectory sits at ${realTimeStats.cgpa}.`,
        bgClass: "bg-emerald-500",
        textClass: "text-emerald-400",
        shadowClass: "shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      }
    ];
  }, [formData, realTimeStats]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 lg:p-10 font-sans overflow-x-hidden relative">
      
      {/* HEADER & TOGGLE */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 relative z-10"
      >
        <div>
          <Link href="/student" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit text-sm md:text-base mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <LineChart className="w-6 h-6 md:w-8 md:h-8 text-blue-400" /> Trajectory Predictor
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-2">
            Calculate your future CGPA or simulate real-time adjustments.
          </p>
        </div>

        {/* 🌟 THE VIEW TOGGLE 🌟 */}
        <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-1.5 backdrop-blur-md">
          <button
            onClick={() => setViewMode("standard")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "standard" ? "bg-white/10 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Standard
          </button>
          <button
            onClick={() => setViewMode("simulator")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "simulator" ? "bg-purple-500/20 text-purple-300 shadow-lg border border-purple-500/30" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> AI Simulator
          </button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        
        {/* ===================================================================== */}
        {/* MODE 1: STANDARD CALCULATOR VIEW                                      */}
        {/* ===================================================================== */}
        {viewMode === "standard" && (
          <motion.div 
            key="standard-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <Calculator className="w-5 h-5 text-blue-400" /> Input Parameters
              </h2>
              <form onSubmit={handleCalculate} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2"><GraduationCap className="w-4 h-4 text-emerald-400" /> Past CGPA</label>
                    <input type="number" step="0.1" min="0" max="10" required value={formData.pastCGPA} onChange={(e) => setFormData({ ...formData, pastCGPA: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> Internal Score (%)</label>
                    <input type="number" min="0" max="100" required value={formData.internal} onChange={(e) => setFormData({ ...formData, internal: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2"><Percent className="w-4 h-4 text-amber-400" /> Attendance (%)</label>
                    <input type="number" min="0" max="100" required value={formData.attendance} onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2"><BookCheck className="w-4 h-4 text-pink-400" /> Assignments (%)</label>
                    <input type="number" min="0" max="100" required value={formData.assignments} onChange={(e) => setFormData({ ...formData, assignments: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50" />
                  </div>
                </div>
                
                {/* Fixed Color-Filled Slider for Standard Mode */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex justify-between items-center">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Daily Study Hours</span>
                    <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">{formData.studyHours} hrs</span>
                  </label>
                  <input 
                    type="range" min="0" max="12" step="0.5" 
                    value={formData.studyHours} 
                    onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                    style={{ background: `linear-gradient(to right, #3b82f6 ${(formData.studyHours / 12) * 100}%, rgba(255,255,255,0.1) ${(formData.studyHours / 12) * 100}%)` }}
                  />
                </div>
                
                <button type="submit" disabled={isCalculating} className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3">
                  {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
                  {isCalculating ? "Running Algorithm..." : "Simulate Trajectory"}
                </button>
              </form>
            </div>

            {/* Right Column: Server Result */}
            <div className="w-full">
              {!serverResult && !isCalculating && (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <TrendingUp className="w-16 h-16 text-neutral-600 mb-4 opacity-50" />
                  <h3 className="text-xl font-medium text-neutral-400 mb-2">Engine Ready</h3>
                  <p className="text-sm text-neutral-500 max-w-sm">Hit simulate to project your final CGPA based on the EduOracle model.</p>
                </div>
              )}
              {isCalculating && (
                 <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl">
                   <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                   <h3 className="text-xl font-medium text-blue-400 animate-pulse">Calculating Weights...</h3>
                 </div>
              )}
              {serverResult && !isCalculating && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
                  <div className="text-neutral-400 font-medium mb-2 uppercase tracking-widest text-sm">Predicted CGPA</div>
                  <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 drop-shadow-2xl mb-8">{serverResult.cgpa}</div>
                  <button onClick={() => setViewMode("simulator")} className="mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
                    <Zap className="w-4 h-4 text-amber-400" /> Switch to Advanced Simulator
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ===================================================================== */}
        {/* MODE 2: AI SIMULATOR & DYNAMIC ROADMAP                                */}
        {/* ===================================================================== */}
        {viewMode === "simulator" && (
          <motion.div 
            key="simulator-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
          >
            {/* LEFT PANEL: SCROLLABLE SLIDERS (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                <SlidersHorizontal className="w-5 h-5 text-purple-400" /> Parameter Sandbox
              </h3>
              <p className="text-sm text-neutral-400 mb-8">Drag sliders to instantly update your projection and AI action plan.</p>

              <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Sliders - All fixed with dynamic inline gradients! */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold"><span className="text-neutral-300">Past CGPA</span><span className="text-emerald-400">{formData.pastCGPA}</span></div>
                  <input 
                    type="range" min="0" max="10" step="0.1" 
                    value={formData.pastCGPA} 
                    onChange={(e) => setFormData({ ...formData, pastCGPA: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                    style={{ background: `linear-gradient(to right, #10b981 ${(formData.pastCGPA / 10) * 100}%, rgba(255,255,255,0.1) ${(formData.pastCGPA / 10) * 100}%)` }} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold"><span className="text-neutral-300">Internal Score</span><span className="text-purple-400">{formData.internal}%</span></div>
                  <input 
                    type="range" min="0" max="100" step="1" 
                    value={formData.internal} 
                    onChange={(e) => setFormData({ ...formData, internal: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                    style={{ background: `linear-gradient(to right, #a855f7 ${formData.internal}%, rgba(255,255,255,0.1) ${formData.internal}%)` }} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold"><span className="text-neutral-300">Attendance</span><span className="text-amber-400">{formData.attendance}%</span></div>
                  <input 
                    type="range" min="0" max="100" step="1" 
                    value={formData.attendance} 
                    onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                    style={{ background: `linear-gradient(to right, #f59e0b ${formData.attendance}%, rgba(255,255,255,0.1) ${formData.attendance}%)` }} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold"><span className="text-neutral-300">Assignments</span><span className="text-pink-400">{formData.assignments}%</span></div>
                  <input 
                    type="range" min="0" max="100" step="1" 
                    value={formData.assignments} 
                    onChange={(e) => setFormData({ ...formData, assignments: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-pink-500" 
                    style={{ background: `linear-gradient(to right, #ec4899 ${formData.assignments}%, rgba(255,255,255,0.1) ${formData.assignments}%)` }} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold"><span className="text-neutral-300">Daily Study Hours</span><span className="text-blue-400">{formData.studyHours} hrs</span></div>
                  <input 
                    type="range" min="0" max="12" step="0.5" 
                    value={formData.studyHours} 
                    onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })} 
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                    style={{ background: `linear-gradient(to right, #3b82f6 ${(formData.studyHours / 12) * 100}%, rgba(255,255,255,0.1) ${(formData.studyHours / 12) * 100}%)` }} 
                  />
                </div>

              </div>

              {/* REAL TIME HUD */}
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl flex items-center justify-between shadow-2xl">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-blue-300 mb-1">Live Projection</div>
                  <div className="text-4xl font-black text-white">{realTimeStats.cgpa}</div>
                </div>
                <Target className="w-10 h-10 text-white/20" />
              </div>
            </div>

            {/* RIGHT PANEL: DYNAMIC ROADMAP (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  <CalendarDays className="w-5 h-5 text-emerald-400" /> Auto-Generated Action Plan
                </h3>
                <div className="text-xs font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Syncing to Sliders
                </div>
              </div>

              {/* Month by Month Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent pt-4">
                <AnimatePresence mode="popLayout">
                  {dynamicRoadmap.map((item, index) => (
                    <motion.div 
                      key={item.month + item.title} // Re-animates when title changes
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-black ${item.bgClass} text-white font-bold ${item.shadowClass} z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                        {index + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-black/60 border border-white/10 rounded-2xl p-5 hover:border-white/30 transition-colors backdrop-blur-md">
                        <div className={`text-xs ${item.textClass} font-bold tracking-widest uppercase mb-2`}>{item.month}</div>
                        <h4 className="text-lg font-bold text-white mb-2 leading-tight">{item.title}</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}