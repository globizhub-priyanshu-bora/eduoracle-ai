"use client";

import { useState } from "react";
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
  BrainCircuit,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { calculateCGPAPredictionAction } from "@/actions/student.actions";

export default function PredictorPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{ percentage: number; cgpa: number } | null>(null);

  const [formData, setFormData] = useState({
    pastCGPA: 7.5,
    internal: 80,
    attendance: 85,
    studyHours: 4,
    assignments: 90,
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    try {
      // Small artificial delay to make the "AI Engine" feel like it's processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const res = await calculateCGPAPredictionAction(formData);
      if (res.success && res.data) {
        setResult(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 lg:p-10 font-sans overflow-x-hidden">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 mb-6 md:mb-10"
      >
        <Link
          href="/student"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <LineChart className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            Trajectory Predictor
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-2">
            Simulate your future CGPA using our weighted cognitive algorithm.
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        
        {/* Left Column: Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <Calculator className="w-5 h-5 text-blue-400" /> Input Parameters
          </h2>

          <form onSubmit={handleCalculate} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Past CGPA */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" /> Past CGPA (0-10)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={formData.pastCGPA}
                  onChange={(e) => setFormData({ ...formData, pastCGPA: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Internal Marks */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" /> Internal Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.internal}
                  onChange={(e) => setFormData({ ...formData, internal: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Attendance */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Percent className="w-4 h-4 text-amber-400" /> Attendance (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              {/* Assignments */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-pink-400" /> Assignments (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.assignments}
                  onChange={(e) => setFormData({ ...formData, assignments: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Study Hours Slider */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Daily Study Hours
                </span>
                <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">
                  {formData.studyHours} hrs
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={formData.studyHours}
                onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-neutral-500 text-right">Optimal threshold is 6 hours/day</p>
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
              {isCalculating ? "Running Algorithm..." : "Simulate Trajectory"}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Output / Result */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!result && !isCalculating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl"
              >
                <TrendingUp className="w-16 h-16 text-neutral-600 mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-neutral-400 mb-2">
                  Engine Ready
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm">
                  Adjust your current parameters and hit simulate to project your final CGPA based on the EduOracle weightage model.
                </p>
              </motion.div>
            )}

            {isCalculating && (
               <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl"
             >
               <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
               <h3 className="text-xl font-medium text-blue-400 animate-pulse">
                 Calculating Weights...
               </h3>
             </motion.div>
            )}

            {result && !isCalculating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                <div className="text-center relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-2">
                    <CheckCircle2 className="w-4 h-4" /> Projection Complete
                  </div>
                  
                  <div>
                    <div className="text-neutral-400 font-medium mb-2 uppercase tracking-widest text-sm">Predicted CGPA</div>
                    <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 drop-shadow-2xl">
                      {result.cgpa}
                    </div>
                  </div>

                  <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/5 mx-auto max-w-sm mt-8">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${result.cgpa >= 8.5 ? 'bg-emerald-500' : result.cgpa >= 7.0 ? 'bg-blue-500' : 'bg-amber-500'}`}
                     />
                  </div>
                  
                  <div className="flex justify-between max-w-sm mx-auto text-xs font-bold text-neutral-500 uppercase tracking-widest mt-2">
                     <span>0.0</span>
                     <span>{result.percentage}% Accuracy</span>
                     <span>10.0</span>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
                     <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-neutral-500 uppercase font-bold">Heaviest Factor</div>
                        <div className="text-sm text-emerald-400 font-medium">Past CGPA (40%)</div>
                     </div>
                     <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-neutral-500 uppercase font-bold">Growth Lever</div>
                        <div className="text-sm text-blue-400 font-medium">Study Hrs (15%)</div>
                     </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}