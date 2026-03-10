"use client";

// 1. ADDED Suspense HERE
import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Timer,
  Trophy,
  CheckCircle2,
  XCircle,
  Loader2,
  Trash2,
  Users,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// 2. RENAMED FROM "export default function BattlePage()" to "function BattleLiveContent()"
function BattleLiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "current-affairs";

  const domainTitles: Record<string, string> = {
    civil: "Civil Engineering",
    electrical: "Electrical Engineering",
    mechanical: "Mechanical Engineering",
    electronics: "Electronics & Telecomm.",
    "current-affairs": "Recent Current Affairs",
  };
  const displaySyllabus = domainTitles[domain] || "ISRO 'SC' Syllabus";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [liveAudience] = useState(Math.floor(Math.random() * 40) + 85);

  // Timer: 5 Minutes (300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);

  const [isGarbageCollectUsed, setIsGarbageCollectUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const currentQuestion = questions[currentQIndex];

  // --- 🚨 PROPER FETCH LOGIC 🚨 ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // We tell the API which domain we want!
        const response = await fetch(`/api/battle-engine?domain=${domain}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to load questions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [domain]);

  const handleFinish = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (isFinished || isLoading) return;
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isLoading, handleFinish]);

  // Database Sync
  useEffect(() => {
    if (isFinished) {
      const finalTotalScore = score + (timeLeft > 0 ? timeLeft : 0);
      fetch("/api/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalScore: finalTotalScore,
          userId: "test-student-id",
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Database Sync:", data.message))
        .catch((err) => console.error("Sync Failed:", err));
    }
  }, [isFinished, score, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGarbageCollect = () => {
    if (isGarbageCollectUsed || isAnswered || !currentQuestion) return;
    const incorrectIndices = [0, 1, 2, 3].filter(
      (idx) => idx !== currentQuestion.correctAnswer,
    );
    const shuffled = incorrectIndices.sort(() => 0.5 - Math.random());
    setHiddenOptions([shuffled[0], shuffled[1]]);
    setIsGarbageCollectUsed(true);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      // 10 Marks per question
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHiddenOptions([]);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium animate-pulse text-orange-400">
          Generating {displaySyllabus} Scenarios...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8 z-10">
        <button
          onClick={() => router.push("/battle")}
          className="p-2 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div
          className={`flex items-center gap-3 px-4 md:px-6 py-2 rounded-xl border transition-all duration-500 ${
            timeLeft < 60
              ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              : "bg-white/5 border-white/10 text-orange-400"
          }`}
        >
          <Timer
            className={`w-5 h-5 ${timeLeft < 60 ? "animate-bounce" : ""}`}
          />
          <span className="font-mono text-xl font-black tracking-widest">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Users className="w-4 h-4 text-neutral-400" />
            {liveAudience}
          </div>
          <div className="flex items-center gap-2 text-orange-400 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
            <Trophy className="w-5 h-5" />
            <span>{score}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {!isFinished && currentQuestion ? (
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-6"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4 text-sm text-neutral-400">
                  <span>
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full text-xs text-orange-400 font-bold">
                    <span>{displaySyllabus}</span>
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid gap-3">
                {currentQuestion.options.map(
                  (option: string, index: number) => {
                    const isHidden = hiddenOptions.includes(index);
                    if (isHidden) {
                      return (
                        <button
                          key={index}
                          disabled
                          className="p-4 rounded-xl border border-transparent opacity-10 cursor-not-allowed text-left"
                        >
                          <span className="font-medium pr-8 line-through text-neutral-600">
                            {option}
                          </span>
                        </button>
                      );
                    }

                    let buttonStateClass =
                      "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300";
                    let Icon = null;

                    if (isAnswered) {
                      if (index === currentQuestion.correctAnswer) {
                        buttonStateClass =
                          "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                        Icon = (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        );
                      } else if (index === selectedAnswer) {
                        buttonStateClass =
                          "bg-red-500/20 border-red-500/50 text-red-400";
                        Icon = <XCircle className="w-5 h-5 text-red-400" />;
                      } else {
                        buttonStateClass =
                          "bg-white/5 border-white/10 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`relative flex items-center justify-between p-4 rounded-xl border transition-all text-left ${buttonStateClass}`}
                      >
                        <span className="font-medium pr-8">{option}</span>
                        {Icon && (
                          <span className="absolute right-4">{Icon}</span>
                        )}
                      </button>
                    );
                  },
                )}
              </div>

              <div className="flex justify-center pt-4 border-t border-white/10">
                <button
                  onClick={handleGarbageCollect}
                  disabled={isGarbageCollectUsed || isAnswered}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm w-full"
            >
              <div className="mx-auto w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <Trophy className="w-10 h-10 text-orange-400" />
              </div>
              <h2 className="text-3xl font-black text-white">
                Mission Accomplished!
              </h2>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-auto space-y-4">
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="font-medium tracking-wide">Base Score</span>
                  <span className="font-mono font-bold text-2xl">
                    {score} / 100
                  </span>
                </div>

                <div className="flex justify-between items-center text-emerald-400">
                  <span className="font-medium tracking-wide">
                    Speed Bonus{" "}
                    <span className="text-emerald-500/50 text-xs">
                      ({timeLeft}s × 1)
                    </span>
                  </span>
                  <span className="font-mono font-bold text-2xl">
                    +{timeLeft > 0 ? timeLeft : 0}
                  </span>
                </div>

                <div className="h-px bg-white/10 w-full my-2" />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-neutral-400 uppercase tracking-widest text-sm mb-1">
                    Total XP Rank
                  </span>
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-lg">
                    {score + (timeLeft > 0 ? timeLeft : 0)}
                  </span>
                </div>
              </div>

              <div className="text-neutral-400 mb-8 text-sm bg-white/5 py-2 px-4 rounded-full inline-block border border-white/5">
                {timeLeft <= 0
                  ? "Time expired! Speed bonus forfeited."
                  : `Mission cleared with ${formatTime(timeLeft)} remaining on the clock.`}
              </div>

              <button
                onClick={() => router.push("/")}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:from-orange-500 hover:to-red-500 transition-all shadow-lg hover:shadow-orange-500/25 active:scale-95 w-full sm:w-auto flex justify-center items-center mx-auto gap-2"
              >
                Return to Command Center
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// 3. ADDED NEW DEFAULT EXPORT WRAPPED IN SUSPENSE
export default function BattlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-50">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
          <h2 className="text-xl font-medium animate-pulse text-orange-400">
            Initializing Battle Engine...
          </h2>
        </div>
      }
    >
      <BattleLiveContent />
    </Suspense>
  );
}
