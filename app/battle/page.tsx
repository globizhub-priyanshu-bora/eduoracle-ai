"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Timer, Trophy, CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function BattlePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [liveAudience] = useState(Math.floor(Math.random() * 40) + 85);

  // --- NEW: Power-Up State ---
  const [isGarbageCollectUsed, setIsGarbageCollectUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/battle-engine');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to load questions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQIndex];

  // --- NEW: Garbage Collect Logic ---
  const handleGarbageCollect = () => {
    if (isGarbageCollectUsed || isAnswered || !currentQuestion) return;

    // Find all incorrect indices
    const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== currentQuestion.correctAnswer);
    
    // Shuffle and pick 2 to hide
    const shuffled = incorrectIndices.sort(() => 0.5 - Math.random());
    setHiddenOptions([shuffled[0], shuffled[1]]);
    setIsGarbageCollectUsed(true);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 100);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHiddenOptions([]); // Reset hidden options for the next question
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium animate-pulse text-orange-400">Generating ISRO 'SC' Battle Scenarios...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8 z-10">
        <button onClick={() => router.push("/")} className="p-2 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full border border-white/10">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Live Match • {liveAudience} Viewers
        </div>
        <div className="flex items-center gap-2 text-orange-400 font-bold">
          <Trophy className="w-5 h-5" />
          <span>{score}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {!isFinished && currentQuestion ? (
            <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4 text-sm text-neutral-400">
                  <span>Question {currentQIndex + 1} of {questions.length}</span>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    <span>ISRO 'SC' Syllabus</span>
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">{currentQuestion.question}</h2>
              </div>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isHidden = hiddenOptions.includes(index);
                  
                  // If hidden by power-up, render a disabled invisible slot to maintain layout height
                  if (isHidden) {
                    return (
                       <button key={index} disabled className="p-4 rounded-xl border border-transparent opacity-10 cursor-not-allowed text-left">
                         <span className="font-medium pr-8 line-through text-neutral-600">{option}</span>
                       </button>
                    );
                  }

                  let buttonStateClass = "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300";
                  let Icon = null;

                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonStateClass = "bg-green-500/20 border-green-500/50 text-green-400";
                      Icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
                    } else if (index === selectedAnswer) {
                      buttonStateClass = "bg-red-500/20 border-red-500/50 text-red-400";
                      Icon = <XCircle className="w-5 h-5 text-red-400" />;
                    } else {
                      buttonStateClass = "bg-white/5 border-white/10 opacity-50";
                    }
                  }

                  return (
                    <button key={index} onClick={() => handleAnswer(index)} disabled={isAnswered} className={`relative flex items-center justify-between p-4 rounded-xl border transition-all text-left ${buttonStateClass}`}>
                      <span className="font-medium pr-8">{option}</span>
                      {Icon && <span className="absolute right-4">{Icon}</span>}
                    </button>
                  );
                })}
              </div>

              {/* NEW: Power-Ups Bar */}
              <div className="flex justify-center pt-4 border-t border-white/10">
                <button 
                  onClick={handleGarbageCollect}
                  disabled={isGarbageCollectUsed || isAnswered}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isGarbageCollectUsed || isAnswered 
                      ? "bg-neutral-800 text-neutral-600 cursor-not-allowed" 
                      : "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  Garbage Collect (50/50)
                </button>
              </div>

            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm w-full">
              <div className="mx-auto w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 border border-orange-500/30">
                <Trophy className="w-10 h-10 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold">Battle Complete!</h2>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 py-4">{score}</div>
              <button onClick={() => router.push("/")} className="mt-4 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}