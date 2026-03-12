"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dna, Brain, Target, ArrowRight, ArrowLeft, Loader2, CheckCircle2, XCircle, Activity, Eye, TrendingUp, Zap
} from "lucide-react";
import Link from "next/link";
import { generateDNAQuizAction, analyzeDNAResultsAction } from "@/actions/student.actions";

const DNA_LEVELS = ["Low", "Moderate", "High", "Ultra"];

export default function LearningDNAPage() {
  const [step, setStep] = useState<string>("loading_quiz");

  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [analysis, setAnalysis] = useState<any>(null);
  const [finalScore, setFinalScore] = useState(0);

  // 👁️ Visual Memory Timer State
  const [showVisualPrompt, setShowVisualPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);

  // --- INIT ---
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setStep("loading_quiz");
    const res = await generateDNAQuizAction(); // No params needed now!
    if (res.success && res.data) {
      setQuizData(res.data);
      setCurrentQIndex(0);
      setUserAnswers([]);
      setupQuestionEnvironment(res.data[0]);
      setStep("quiz");
    } else {
      alert("Failed to initialize diagnostic engine.");
    }
  };

  const setupQuestionEnvironment = (question: any) => {
    setSelectedOption(null);
    if (question.type === "timed_visual") {
      setShowVisualPrompt(true);
      setTimeLeft(3);
    } else {
      setShowVisualPrompt(false);
    }
  };

  useEffect(() => {
    if (showVisualPrompt && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && showVisualPrompt) {
      setShowVisualPrompt(false); 
    }
  }, [showVisualPrompt, timeLeft]);

  const handleNextQuestion = async () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    if (currentQIndex < quizData.length - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setupQuestionEnvironment(quizData[nextIdx]);
    } else {
      // 🚀 CALCULATE THE BREAKDOWN 🚀
      setStep("loading_analysis");
      let score = 0;
      
      const breakdown: any = {
        "Concept Understanding": { correct: 0, total: 0 },
        "Problem Solving": { correct: 0, total: 0 },
        "Analytical Ability": { correct: 0, total: 0 },
        "Memory Retention": { correct: 0, total: 0 }
      };

      newAnswers.forEach((ans, idx) => { 
        const q = quizData[idx];
        const isCorrect = ans === q.correctAnswerIndex;
        if (isCorrect) score++;
        
        if (breakdown[q.category]) {
          breakdown[q.category].total += 1;
          if (isCorrect) breakdown[q.category].correct += 1;
        }
      });
      
      setFinalScore(score);
      
      // Pass the breakdown to the AI so it can determine the DNA!
      const res = await analyzeDNAResultsAction(breakdown, score, quizData.length);
      
      if (res.success && res.data) {
        setAnalysis(res.data);
        setStep("result");
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 lg:p-10 font-sans overflow-x-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 relative z-10">
        <Link href="/student" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Dna className="w-8 h-8 text-purple-400" /> Cognitive DNA Profiler
        </h1>
        <p className="text-neutral-400 mt-2">Complete this baseline diagnostic to reveal your learning architecture.</p>
      </motion.header>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">

          {/* LOADERS */}
          {(step === "loading_quiz" || step === "loading_analysis") && (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32 text-center">
              <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">{step === "loading_quiz" ? "Initializing Diagnostic Engine..." : "Decoding Neural Patterns..."}</h2>
              <p className="text-neutral-400">{step === "loading_analysis" && "Cross-referencing answers to extract your Cognitive DNA."}</p>
            </motion.div>
          )}

          {/* STEP 1: QUIZ INTERFACE */}
          {step === "quiz" && quizData.length > 0 && (
            <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl mx-auto">
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Question {currentQIndex + 1} of {quizData.length}</div>
                  {quizData[currentQIndex].category && (
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20 flex items-center gap-1">
                       <Activity className="w-3 h-3" /> {quizData[currentQIndex].category}
                    </div>
                  )}
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-purple-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentQIndex) / quizData.length) * 100}%` }} />
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                {showVisualPrompt ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
                    <Eye className="w-12 h-12 text-emerald-400 mb-4" />
                    <h2 className="text-3xl md:text-5xl font-black text-white whitespace-pre-line leading-tight">
                      {quizData[currentQIndex].question}
                    </h2>
                    <div className="mt-8 text-neutral-500 font-bold tracking-widest uppercase">
                      Hiding in {timeLeft} seconds...
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-xl md:text-2xl font-semibold leading-relaxed text-white mb-8">
                      {quizData[currentQIndex].type === "timed_visual" ? "What was the sequence displayed?" : quizData[currentQIndex].question}
                    </h2>

                    <div className="space-y-3">
                      {quizData[currentQIndex].options.map((option: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center gap-4
                            ${selectedOption === idx ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${selectedOption === idx ? 'border-purple-400 text-purple-400' : 'border-neutral-500 text-neutral-500'}`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-sm md:text-base font-medium">{option}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-10 flex justify-end">
                      <button onClick={handleNextQuestion} disabled={selectedOption === null} className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95">
                        {currentQIndex === quizData.length - 1 ? "Submit Diagnostics" : "Next Question"} 
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DYNAMIC RESULTS UI */}
          {step === "result" && analysis && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 🌟 NEW: THE EXTRACTED DNA PROFILE (Left Panel) */}
                <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                  
                  <div className="text-center mb-8 pb-8 border-b border-white/10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                      <Activity className="w-3 h-3" /> System Diagnosis
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{analysis.overallDNA}</h2>
                    <div className="text-neutral-400 text-sm">Score: <strong className="text-white">{finalScore}/{quizData.length}</strong></div>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Extracted Cognitive Traits</h3>
                  
                  <div className="space-y-6">
                    {[
                      { key: 'concept', label: 'Concept Logic', color: 'blue' },
                      { key: 'problemSolving', label: 'Problem Solving', color: 'purple' },
                      { key: 'analytical', label: 'Analytical Speed', color: 'amber' },
                      { key: 'memory', label: 'Data Retention', color: 'emerald' },
                    ].map((trait) => (
                      <div key={trait.key} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-neutral-300">{trait.label}</span>
                          <span className={`text-${trait.color}-400`}>{DNA_LEVELS[(analysis.traits[trait.key] || 2) - 1]}</span>
                        </div>
                        {/* Disabled Visual Slider showing their deduced capability */}
                        <div className="w-full h-2 bg-neutral-800 rounded-lg overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }} 
                             animate={{ width: `${((analysis.traits[trait.key] || 2) / 4) * 100}%` }} 
                             transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                             className={`h-full bg-${trait.color}-500 rounded-full shadow-[0_0_10px_rgba(var(--${trait.color}-500),0.8)]`} 
                           />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 🌟 ACTION PLAN (Right Panel) */}
                <div className="lg:col-span-7 space-y-6 flex flex-col">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6">
                      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Expand This</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">{analysis.focusMore}</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6">
                      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Target className="w-4 h-4" /> Reduce This</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">{analysis.focusLess}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-purple-400" /> Strategic Blueprint
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                      {analysis.actionPlan}
                    </p>
                  </div>

                </div>
              </div>

              {/* Autopsy Report */}
              <div className="bg-black/50 border border-white/10 rounded-3xl p-6 md:p-8 mt-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" /> Assessment Autopsy
                </h3>
                <div className="space-y-4">
                  {quizData.map((q, idx) => {
                    const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
                    return (
                      <div key={idx} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 mt-1">{isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}</div>
                          <div>
                            <h4 className="text-white text-sm font-medium mb-2">{q.type === 'timed_visual' ? "Visual Sequence Memory Test" : q.question}</h4>
                            <div className="text-xs text-neutral-400 bg-black/40 p-3 rounded-xl border border-white/5">
                              <span className="font-bold text-white mr-2">Insight:</span>{q.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={fetchQuiz} className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold transition-all">
                  Re-Calibrate DNA (Retake)
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}