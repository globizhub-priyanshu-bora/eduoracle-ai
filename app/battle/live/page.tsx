"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Timer, Trophy, CheckCircle2, XCircle, Loader2, Trash2, 
  Users, Flame, FileText, ChevronLeft, 
  Linkedin, Download, Medal, ShieldCheck
} from "lucide-react";

// --- THE SECURE QUESTION DATABASE ---
const DOMAIN_QUESTIONS: Record<string, any[]> = {
  civil: [
    { id: 1, difficulty: "EASY", question: "What is the primary purpose of a slump test in concrete?", options: ["To determine compressive strength", "To measure workability", "To check water-cement ratio", "To find the setting time"], correctAnswer: 1 },
    { id: 2, difficulty: "EASY", question: "According to Hooke's Law, within the elastic limit, stress is directly proportional to:", options: ["Strain", "Area", "Volume", "Temperature"], correctAnswer: 0 },
    { id: 3, difficulty: "MEDIUM", question: "What is the theoretical maximum value of Poisson's ratio for any macroscopic isotropic material?", options: ["0.25", "0.33", "0.50", "1.00"], correctAnswer: 2 },
    { id: 4, difficulty: "MEDIUM", question: "In fluid mechanics, what does a Reynolds number of less than 2000 signify in a pipe flow?", options: ["Turbulent flow", "Transitional flow", "Laminar flow", "Supersonic flow"], correctAnswer: 2 },
    { id: 5, difficulty: "MEDIUM", question: "The bending moment on a simply supported beam carrying a uniformly distributed load is maximum at:", options: ["The supports", "The center", "Quarter span", "It is constant throughout"], correctAnswer: 1 },
    { id: 6, difficulty: "HARD", question: "Which equation is primarily used to measure the flow of water through a porous medium like soil?", options: ["Bernoulli's Equation", "Navier-Stokes Equation", "Darcy's Law", "Manning's Formula"], correctAnswer: 2 },
    { id: 7, difficulty: "HARD", question: "Biochemical Oxygen Demand (BOD) is a measure of:", options: ["Dissolved oxygen in water", "Organic matter decomposed by bacteria", "Chemical toxicity", "pH level of wastewater"], correctAnswer: 1 },
    { id: 8, difficulty: "MEDIUM", question: "In surveying, the angle between the true meridian and the magnetic meridian is called:", options: ["Magnetic Declination", "Dip", "Azimuth", "Local Attraction"], correctAnswer: 0 },
    { id: 9, difficulty: "EASY", question: "What is the standard size of a concrete cube used for compressive strength testing?", options: ["100mm x 100mm x 100mm", "150mm x 150mm x 150mm", "200mm x 200mm x 200mm", "250mm x 250mm x 250mm"], correctAnswer: 1 },
    { id: 10, difficulty: "HARD", question: "The process of removal of water from the soil pores under sustained load is known as:", options: ["Compaction", "Consolidation", "Permeability", "Liquefaction"], correctAnswer: 1 }
  ],
  electrical: [
    { id: 11, difficulty: "EASY", question: "Why are the cores of transformers laminated?", options: ["To reduce copper losses", "To reduce hysteresis losses", "To reduce eddy current losses", "To improve cooling"], correctAnswer: 2 },
    { id: 12, difficulty: "EASY", question: "According to Kirchhoff's Current Law (KCL), the algebraic sum of currents meeting at a node is:", options: ["Infinite", "Zero", "Equal to the voltage", "Dependent on resistance"], correctAnswer: 1 },
    { id: 13, difficulty: "MEDIUM", question: "What is the primary function of a Buchholz relay in a power transformer?", options: ["Voltage regulation", "Cooling control", "Protection against internal faults", "Overload protection"], correctAnswer: 2 },
    { id: 14, difficulty: "MEDIUM", question: "In an AC circuit, the ratio of real power to apparent power is known as:", options: ["Form factor", "Peak factor", "Power factor", "Quality factor"], correctAnswer: 2 },
    { id: 15, difficulty: "MEDIUM", question: "What happens to the slip of an induction motor when it operates at exactly synchronous speed?", options: ["It becomes 1", "It becomes zero", "It becomes infinite", "It becomes negative"], correctAnswer: 1 },
    { id: 16, difficulty: "HARD", question: "Which effect causes alternating current (AC) to distribute itself unequally, concentrating near the surface of the conductor?", options: ["Ferranti Effect", "Proximity Effect", "Skin Effect", "Corona Effect"], correctAnswer: 2 },
    { id: 17, difficulty: "HARD", question: "Thevenin's Theorem replaces a complex linear network with an equivalent circuit consisting of:", options: ["A current source in parallel with a resistor", "A voltage source in series with a resistor", "A voltage source in parallel with a capacitor", "Multiple voltage sources"], correctAnswer: 1 },
    { id: 18, difficulty: "MEDIUM", question: "A Zener diode is primarily used for:", options: ["Amplification", "Rectification", "Voltage regulation", "Signal oscillation"], correctAnswer: 2 },
    { id: 19, difficulty: "EASY", question: "What is the unit of reactive power in an AC system?", options: ["Watts (W)", "Volt-Amperes (VA)", "Volt-Amperes Reactive (VAR)", "Joules (J)"], correctAnswer: 2 },
    { id: 20, difficulty: "HARD", question: "The synchronous speed of a 4-pole, 50 Hz AC motor is:", options: ["1000 RPM", "1500 RPM", "3000 RPM", "1200 RPM"], correctAnswer: 1 }
  ],
  mechanical: [
    { id: 21, difficulty: "MEDIUM", question: "Which thermodynamic cycle has the highest theoretical efficiency operating between two temperature limits?", options: ["Otto Cycle", "Rankine Cycle", "Carnot Cycle", "Diesel Cycle"], correctAnswer: 2 },
    { id: 22, difficulty: "EASY", question: "According to Newton's Law of Viscosity, shear stress is directly proportional to:", options: ["Velocity", "Pressure", "Rate of shear strain", "Temperature"], correctAnswer: 2 },
    { id: 23, difficulty: "MEDIUM", question: "What does the area under a Stress-Strain curve up to the fracture point represent?", options: ["Modulus of Elasticity", "Toughness", "Resilience", "Yield Strength"], correctAnswer: 1 },
    { id: 24, difficulty: "HARD", question: "In heat transfer, thermal radiation is governed by which law?", options: ["Fourier's Law", "Newton's Law of Cooling", "Stefan-Boltzmann Law", "Fick's Law"], correctAnswer: 2 },
    { id: 25, difficulty: "EASY", question: "The ratio of the speed of an object to the local speed of sound is called the:", options: ["Reynolds Number", "Mach Number", "Prandtl Number", "Nusselt Number"], correctAnswer: 1 },
    { id: 26, difficulty: "MEDIUM", question: "Which heat treatment process is used primarily to relieve internal stresses and soften the metal?", options: ["Quenching", "Tempering", "Annealing", "Case hardening"], correctAnswer: 2 },
    { id: 27, difficulty: "HARD", question: "Euler's formula for column buckling is applicable only for:", options: ["Short columns", "Long columns", "Intermediate columns", "Composite columns"], correctAnswer: 1 },
    { id: 28, difficulty: "HARD", question: "Bernoulli's equation is fundamentally derived from the principle of conservation of:", options: ["Mass", "Momentum", "Energy", "Angular Momentum"], correctAnswer: 2 },
    { id: 29, difficulty: "EASY", question: "In a standard 4-stroke SI engine, the spark plug ignites the fuel-air mixture just before the end of the:", options: ["Intake stroke", "Compression stroke", "Power stroke", "Exhaust stroke"], correctAnswer: 1 },
    { id: 30, difficulty: "MEDIUM", question: "A thermodynamic process in which entropy remains constant is called:", options: ["Isothermal", "Isobaric", "Isochoric", "Isentropic"], correctAnswer: 3 }
  ],
  electronics: [
    { id: 31, difficulty: "EASY", question: "What is the primary advantage of a Universal Gate (like NAND or NOR)?", options: ["They consume zero power", "Any boolean function can be implemented using them alone", "They have infinite input impedance", "They are naturally analog"], correctAnswer: 1 },
    { id: 32, difficulty: "MEDIUM", question: "According to the Nyquist-Shannon sampling theorem, the sampling frequency must be at least:", options: ["Equal to the maximum signal frequency", "Twice the maximum signal frequency", "Half the maximum signal frequency", "Ten times the maximum signal frequency"], correctAnswer: 1 },
    { id: 33, difficulty: "EASY", question: "An ideal Operational Amplifier (Op-Amp) has an Input Impedance of:", options: ["Zero", "100 Ohms", "Infinite", "Negative value"], correctAnswer: 2 },
    { id: 34, difficulty: "MEDIUM", question: "Which digital circuit is used to select one of many input data lines and forward it to a single output line?", options: ["Decoder", "Multiplexer (MUX)", "Demultiplexer", "Encoder"], correctAnswer: 1 },
    { id: 35, difficulty: "HARD", question: "In a Bipolar Junction Transistor (BJT), the base region is heavily doped to ensure:", options: ["High current gain", "Low recombination rate", "High breakdown voltage", "The base is lightly doped"], correctAnswer: 3 },
    { id: 36, difficulty: "MEDIUM", question: "What does CMRR stand for in the context of operational amplifiers?", options: ["Common-Mode Rejection Ratio", "Current-Mode Resistance Ratio", "Capacitive-Mode Reactive Ratio", "Circuit-Mode Relay Ratio"], correctAnswer: 0 },
    { id: 37, difficulty: "EASY", question: "Which flip-flop is known as the 'Delay' flip-flop?", options: ["SR Flip-Flop", "JK Flip-Flop", "T Flip-Flop", "D Flip-Flop"], correctAnswer: 3 },
    { id: 38, difficulty: "HARD", question: "In Amplitude Modulation (AM), if the modulation index is greater than 1, it results in:", options: ["Perfect transmission", "Over-modulation and distortion", "Zero bandwidth", "Frequency hopping"], correctAnswer: 1 },
    { id: 39, difficulty: "HARD", question: "Maxwell's equations fundamentally describe the behavior of:", options: ["Quantum mechanics", "Thermodynamics", "Electromagnetic fields", "Nuclear strong forces"], correctAnswer: 2 },
    { id: 40, difficulty: "MEDIUM", question: "What is the core difference between a Microprocessor and a Microcontroller?", options: ["Microcontrollers lack ALUs", "Microcontrollers integrate CPU, memory, and I/O on a single chip", "Microprocessors are only used for analog signals", "Microprocessors are always slower"], correctAnswer: 1 }
  ],
  "current-affairs": [
    { id: 41, difficulty: "EASY", question: "Which joint Earth-observing satellite mission was collaboratively developed by NASA and ISRO for launch in the mid-2020s?", options: ["Chandrayaan-4", "NISAR", "AstroSat-2", "Mangalyaan-2"], correctAnswer: 1 },
    { id: 42, difficulty: "EASY", question: "What is the primary objective of ISRO's Aditya-L1 mission?", options: ["To study the Martian atmosphere", "To collect lunar soil samples", "To study the solar atmosphere and solar winds", "To map the Milky Way galaxy"], correctAnswer: 2 },
    { id: 43, difficulty: "MEDIUM", question: "In 2024, the European Union passed the world's first comprehensive legal framework for Artificial Intelligence, known as the:", options: ["AI Bill of Rights", "EU AI Act", "Turing Directive", "Algorithmic Accountability Law"], correctAnswer: 1 },
    { id: 44, difficulty: "MEDIUM", question: "Which country is slated to host the UN Climate Change Conference (COP30) in 2025?", options: ["United Arab Emirates", "India", "Brazil", "United Kingdom"], correctAnswer: 2 },
    { id: 45, difficulty: "EASY", question: "The ISRO Gaganyaan mission aims to demonstrate:", options: ["Human spaceflight capability to Low Earth Orbit", "A permanent lunar base", "Asteroid deflection technology", "Interplanetary robotic landing"], correctAnswer: 0 },
    { id: 46, difficulty: "HARD", question: "Which BRICS summit saw the historic expansion of the bloc to include nations like Egypt, Ethiopia, Iran, and the UAE?", options: ["12th Summit (Russia)", "14th Summit (China)", "15th Summit (South Africa)", "16th Summit (Russia)"], correctAnswer: 2 },
    { id: 47, difficulty: "MEDIUM", question: "India's 'Semicon India Programme' is an initiative designed primarily to:", options: ["Import cheap semiconductors", "Build a robust domestic semiconductor manufacturing ecosystem", "Ban the export of silicon", "Develop quantum computers exclusively"], correctAnswer: 1 },
    { id: 48, difficulty: "HARD", question: "NASA's Artemis III mission is historically significant because its primary goal is to:", options: ["Send the first humans to Mars", "Land the first humans near the Lunar South Pole", "Retrieve samples from an asteroid", "Launch the James Webb Space Telescope"], correctAnswer: 1 },
    { id: 49, difficulty: "MEDIUM", question: "Which city is the headquarters of the International Solar Alliance (ISA), an initiative jointly launched by India and France?", options: ["Paris", "New Delhi", "Gurugram", "Geneva"], correctAnswer: 2 },
    { id: 50, difficulty: "MEDIUM", question: "In the context of recent AI advancements, what does 'LLM' stand for?", options: ["Logical Language Module", "Large Language Model", "Linear Learning Machine", "Linguistic Logic Matrix"], correctAnswer: 1 }
  ],
  "reasoning-aptitude": [
    { id: 51, difficulty: "EASY", question: "If 5 workers can build a wall in 12 days, how many days will 10 workers take to build the same wall?", options: ["6 days", "24 days", "8 days", "10 days"], correctAnswer: 0 },
    { id: 52, difficulty: "MEDIUM", question: "A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?", options: ["36 km/h", "54 km/h", "45 km/h", "30 km/h"], correctAnswer: 0 },
    { id: 53, difficulty: "MEDIUM", question: "Looking at a portrait, a man said, 'That man's father is my father's son.' Who is in the portrait?", options: ["The man himself", "The man's son", "The man's father", "The man's brother"], correctAnswer: 1 },
    { id: 54, difficulty: "HARD", question: "The ratio of the ages of A and B is 4:3. After 6 years, the ratio will be 11:9. What is the present age of A?", options: ["16 years", "20 years", "24 years", "28 years"], correctAnswer: 0 },
    { id: 55, difficulty: "MEDIUM", question: "Complete the series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctAnswer: 1 },
    { id: 56, difficulty: "HARD", question: "In a code, 'ROCK' is written as 'SNDL'. How is 'COLD' written in that same code?", options: ["DPME", "DNME", "DOME", "DQNF"], correctAnswer: 1 },
    { id: 57, difficulty: "EASY", question: "What is the average of the first five prime numbers?", options: ["5.6", "5.4", "5.8", "6.0"], correctAnswer: 0 },
    { id: 58, difficulty: "HARD", question: "A sum of money doubles itself in 10 years at simple interest. What is the annual rate of interest?", options: ["5%", "10%", "12%", "15%"], correctAnswer: 1 },
    { id: 59, difficulty: "MEDIUM", question: "Point A is 10m North of Point B. Point C is 10m East of Point B. What is the shortest distance between A and C?", options: ["10m", "20m", "10√2m", "15m"], correctAnswer: 2 },
    { id: 60, difficulty: "HARD", question: "Two pipes can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?", options: ["10 mins", "12 mins", "15 mins", "25 mins"], correctAnswer: 1 }
  ]
};

export default function BattlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "current-affairs";

  const domainTitles: Record<string, string> = {
    "civil": "Civil Engineering",
    "electrical": "Electrical Engineering",
    "mechanical": "Mechanical Engineering",
    "electronics": "Electronics & Telecomm.",
    "current-affairs": "Recent Current Affairs",
    "reasoning-aptitude": "Reasoning & Aptitude"
  };
  const displaySyllabus = domainTitles[domainParam] || "ISRO 'SC' Syllabus";
  
  // --- States ---
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [introStage, setIntroStage] = useState<number | string | null>(null);
  const [isWrongShake, setIsWrongShake] = useState(false);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [streak, setStreak] = useState(0);
  const [showLogs, setShowLogs] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false); 

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [liveAudience] = useState(Math.floor(Math.random() * 40) + 85);
  const [timeLeft, setTimeLeft] = useState(300); // 5 Minutes
  const [isGarbageCollectUsed, setIsGarbageCollectUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const currentQuestion = questions[currentQIndex];

  // Helper for Ranks
  const getRank = (finalScore: number) => {
    if (finalScore >= 500) return "Mission Director";
    if (finalScore >= 400) return "Scientist 'SC'";
    if (finalScore >= 250) return "Senior Researcher";
    return "Cadet Engineer";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadedQuestions = DOMAIN_QUESTIONS[domainParam] || DOMAIN_QUESTIONS["current-affairs"];
    setQuestions(loadedQuestions);
    setTimeout(() => { setIsLoading(false); setIntroStage(3); }, 1200);
  }, [domainParam]);

  useEffect(() => {
    if (introStage === null) return;
    if (typeof introStage === 'number' && introStage > 1) {
      setTimeout(() => setIntroStage(introStage - 1), 1000);
    } else if (introStage === 1) {
      setTimeout(() => setIntroStage("MISSION START!"), 1000);
    } else if (introStage === "MISSION START!") {
      setTimeout(() => setIntroStage(null), 1000);
    }
  }, [introStage]);

  const handleFinish = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (isFinished || isLoading || introStage !== null) return;
    if (timeLeft <= 0) { handleFinish(); return; }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isLoading, introStage, handleFinish]);

  const handleGarbageCollect = () => {
    if (isGarbageCollectUsed || isAnswered || !currentQuestion) return;
    const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== currentQuestion.correctAnswer);
    const shuffled = incorrectIndices.sort(() => 0.5 - Math.random());
    setHiddenOptions([shuffled[0], shuffled[1]]);
    setIsGarbageCollectUsed(true);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    setUserAnswers((prev) => [...prev, index]);

    const isCorrect = index === currentQuestion.correctAnswer;
    setQuestionResults((prev) => [...prev, isCorrect]);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((prev) => prev + (newStreak >= 3 ? 15 : 10));
    } else {
      setIsWrongShake(true);
      setTimeout(() => setIsWrongShake(false), 500);
      setStreak(0); 
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHiddenOptions([]); 
      } else { setIsFinished(true); }
    }, 2000); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium animate-pulse text-orange-400">Booting Mission Telemetry...</h2>
      </div>
    );
  }

  if (introStage !== null) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">
        <motion.div key={introStage} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }} className="text-7xl md:text-9xl font-black text-white z-10">{introStage}</motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col p-4 sm:p-6 relative overflow-hidden">
      
      <AnimatePresence>
        {/* MISSION LOGS OVERLAY */}
        {showLogs && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-md p-4 sm:p-8 flex flex-col">
            <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
              <header className="flex items-center justify-between mb-8">
                <button onClick={() => setShowLogs(false)} className="flex items-center gap-2 text-neutral-400 hover:text-white"><ChevronLeft size={20} /> Back</button>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white"><FileText className="text-orange-500" /> Mission Telemetry</h2>
              </header>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[idx] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Node {idx + 1} • {q.difficulty}</span>
                        {isCorrect ? <span className="text-emerald-500 text-xs font-bold">SUCCESS</span> : <span className="text-red-500 text-xs font-bold">FAILURE</span>}
                      </div>
                      <h4 className="font-medium text-neutral-200 mb-4">{q.question}</h4>
                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg text-sm border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>{q.options[userAnswers[idx] ?? 0] || "Skipped"}</div>
                        {!isCorrect && <div className="p-3 rounded-lg text-sm bg-white/5 border border-white/10 text-neutral-300 opacity-60">Correct Protocol: {q.options[q.correctAnswer]}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ACHIEVEMENT CARD MODAL */}
        {showCertificate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="relative p-8 text-center space-y-6">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 blur-[80px] rounded-full" />
                  <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)] rotate-12 mb-4">
                    <ShieldCheck size={48} className="text-white -rotate-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">Verified Achievement</h3>
                    <h2 className="text-3xl font-black text-white italic">MISSION DEBRIEF</h2>
                  </div>
                  <div className="py-6 border-y border-white/5 space-y-4">
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Candidate Rank</p>
                      <p className="text-2xl font-bold text-white uppercase tracking-tighter">{getRank(score + timeLeft)}</p>
                    </div>
                    <div className="flex justify-center gap-12">
                       <div><p className="text-[10px] text-neutral-500 uppercase font-bold">XP Score</p><p className="text-xl font-mono text-orange-400">{score + timeLeft}</p></div>
                       <div><p className="text-[10px] text-neutral-500 uppercase font-bold">Accuracy</p><p className="text-xl font-mono text-emerald-400">{Math.round((questionResults.filter(Boolean).length / questions.length) * 100)}%</p></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-white text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all"><Download size={14}/> SAVE LOGS</button>
                    <button className="flex-1 py-4 bg-[#0A66C2] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#004182] transition-all"><Linkedin size={14}/> PRESTIGE SHARE</button>
                  </div>
                  <button onClick={() => setShowCertificate(false)} className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors">Dismiss Intelligence</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col w-full max-w-3xl mx-auto mb-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/battle")} className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors"><ArrowLeft size={20} /></button>
          </div>
          <div className={`flex items-center gap-3 px-6 py-2 rounded-xl border transition-all ${timeLeft < 60 ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse" : "bg-white/5 border-white/10 text-orange-400"}`}>
            <Timer size={20} /><span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-3">
             {streak >= 3 && <div className="text-rose-500 font-bold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 flex items-center gap-1 animate-bounce"><Flame size={14}/> {streak}x</div>}
             <div className="flex items-center gap-2 text-orange-400 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-orange-500/20"><Trophy size={20}/><span>{score}</span></div>
          </div>
        </div>
        <div className="flex gap-2 w-full h-1.5">
          {questions.map((_, idx) => (
            <div key={idx} className={`flex-1 rounded-full transition-all duration-500 ${idx < questionResults.length ? (questionResults[idx] ? "bg-emerald-500 shadow-[0_0_8px_emerald]" : "bg-red-500 shadow-[0_0_8px_red]") : (idx === currentQIndex ? "bg-orange-500 animate-pulse" : "bg-white/10")}`} />
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {!isFinished && currentQuestion ? (
            <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={isWrongShake ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
              <div className={`p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all ${isWrongShake ? "bg-red-500/10 border-red-500/50" : "bg-white/5 border-white/10"}`}>
                <div className="flex items-center justify-between mb-4 text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-500">Node {currentQIndex + 1} of {questions.length}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md border ${
                      currentQuestion.difficulty === 'HARD' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
                      currentQuestion.difficulty === 'MEDIUM' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 
                      'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-md text-orange-500">{displaySyllabus}</span>
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">{currentQuestion.question}</h2>
              </div>
              <div className="grid gap-3">
                {currentQuestion.options.map((option: string, index: number) => {
                  const isHidden = hiddenOptions.includes(index);
                  if (isHidden) return <button key={index} disabled className="p-4 rounded-xl border border-transparent opacity-10 cursor-not-allowed text-left text-neutral-600 line-through">{option}</button>;
                  let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300";
                  let Icon = null;
                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswer) { stateClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"; Icon = <CheckCircle2 size={20}/>; }
                    else if (index === selectedAnswer) { stateClass = "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"; Icon = <XCircle size={20}/>; }
                    else { stateClass = "bg-white/5 border-white/10 opacity-50"; }
                  }
                  return <button key={index} onClick={() => handleAnswer(index)} disabled={isAnswered} className={`relative flex items-center justify-between p-4 rounded-xl border transition-all text-left ${stateClass}`}><span>{option}</span>{Icon && <span className="absolute right-4">{Icon}</span>}</button>;
                })}
              </div>
              <div className="flex justify-center pt-4 border-t border-white/10">
                <button onClick={handleGarbageCollect} disabled={isGarbageCollectUsed || isAnswered} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${isGarbageCollectUsed || isAnswered ? "bg-neutral-800 text-neutral-600" : "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"}`}><Trash2 size={16}/> Garbage Collect (50/50)</button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm w-full">
              <div className="mx-auto w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30 shadow-[0_0_30px_orange]"><Trophy size={40} className="text-orange-400" /></div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Mission Success!</h2>
              
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-auto space-y-4">
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="font-bold uppercase text-[10px] tracking-widest text-neutral-500">Combat Rank</span>
                  <span className="text-orange-500 font-bold">{getRank(score + timeLeft)}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-300"><span>Base Score</span><span className="font-mono font-bold text-2xl">{score}</span></div>
                <div className="flex justify-between items-center text-emerald-400"><span>Speed Bonus</span><span className="font-mono font-bold text-2xl">+{timeLeft > 0 ? timeLeft : 0}</span></div>
                <div className="h-px bg-white/10 w-full my-2" />
                <div className="flex justify-between items-end"><span className="font-bold text-neutral-400 uppercase tracking-widest text-sm mb-1">Total XP</span><span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500">{score + (timeLeft > 0 ? timeLeft : 0)}</span></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <button onClick={() => setShowCertificate(true)} className="py-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-xl font-bold border border-orange-500/20 flex items-center justify-center gap-2 transition-all"><Medal size={18}/> GET PRESTIGE CARD</button>
                <button onClick={() => setShowLogs(true)} className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 flex items-center justify-center gap-2 transition-all"><FileText size={18}/> REVIEW DATA</button>
                <button onClick={() => router.push("/")} className="py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"><ChevronLeft size={18}/> COMMAND CENTER</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}