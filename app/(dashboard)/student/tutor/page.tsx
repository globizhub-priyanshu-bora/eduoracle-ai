"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  UploadCloud,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ChevronRight,
  BrainCircuit,
  ArrowLeft,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function VisionTutorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solution, setSolution] = useState<any | null>(null);

  // Simulated 3-Step Solution matching the PRD requirement
  const mockSolution = {
    identifiedTopic: "Effective Access Time (EAT) Calculation with TLB",
    steps: [
      {
        title: "Identify Given Variables",
        explanation:
          "TLB Hit Ratio (α) = 80% (0.8), TLB Access Time (c) = 20ns, Main Memory Access Time (m) = 100ns.",
      },
      {
        title: "Apply the EAT Formula",
        explanation:
          "EAT = α(c + m) + (1 - α)(c + 2m). The second part represents a TLB miss, requiring two memory accesses (one for page table, one for actual data).",
      },
      {
        title: "Calculate Final Result",
        explanation:
          "EAT = 0.8(20 + 100) + 0.2(20 + 200) = 0.8(120) + 0.2(220) = 96 + 44 = 140ns.",
      },
    ],
    nextStep:
      "Review Virtual Memory translation mapping to avoid TLB miss penalties.",
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the preview
      setImage(URL.createObjectURL(file));
      setSolution(null);
    }
  };

  const analyzeImage = () => {
    if (!image) return;
    setIsAnalyzing(true);

    // Simulating the 4-Second Magic Trick (Promise.race fallback delay)
    setTimeout(() => {
      setIsAnalyzing(false);
      setSolution(mockSolution);
    }, 2500); // 2.5s feels natural for the UI demo
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 lg:p-10 font-sans overflow-x-hidden">
      {/* Mobile-Optimized Header */}
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              AI Vision Tutor
            </h1>
            <p className="text-neutral-400 text-sm md:text-base mt-2">
              Snap a photo of any complex math or architecture problem for a
              3-step breakdown.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Main Layout: Stacks on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left Column: Upload & Preview Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-4"
        >
          {/* The Upload Box */}
          <div
            className={`relative w-full aspect-[4/3] md:aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300
            ${image ? "border-blue-500/50 bg-black/50" : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40"}`}
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Uploaded problem"
                  className="object-contain w-full h-full opacity-80"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-neutral-900/90 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/10">
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                      <span className="font-medium text-blue-100">
                        Gemini Vision is analyzing...
                      </span>
                    </div>
                  </div>
                )}
                {!isAnalyzing && !solution && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={() => setImage(null)}
                      className="p-3 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </>
            ) : (
              <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-6 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Tap to Upload or Take Photo
                </h3>
                <p className="text-sm text-neutral-400 max-w-xs">
                  Supports JPG, PNG, and HEIC files up to 10MB.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Mobile-Friendly Action Button */}
          <AnimatePresence>
            {image && !solution && !isAnalyzing && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={analyzeImage}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                Generate 3-Step Solution
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: AI Solution Stream */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!solution && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl"
              >
                <BrainCircuit className="w-16 h-16 text-neutral-600 mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-neutral-400 mb-2">
                  Awaiting Visual Input
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm">
                  Upload a textbook problem, handwritten equation, or
                  architecture diagram to begin the cognitive trace.
                </p>
              </motion.div>
            )}

            {solution && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 md:p-5 rounded-2xl flex items-start gap-4 backdrop-blur-sm">
                  <div className="bg-purple-500/20 p-2 rounded-lg mt-1 shrink-0">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-300 uppercase tracking-wider font-bold mb-1">
                      Identified Context
                    </div>
                    <div className="text-white font-medium text-sm md:text-base">
                      {solution.identifiedTopic}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 md:before:ml-7 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:to-transparent">
                  {solution.steps.map((step: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-14 md:pl-16 pr-2 py-2"
                    >
                      <div className="absolute left-0 top-3 w-12 h-12 md:w-14 md:h-14 bg-neutral-950 border-2 border-blue-500/30 rounded-full flex items-center justify-center font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] z-10 text-sm md:text-base">
                        0{index + 1}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-white text-sm md:text-base mb-2">
                          {step.title}
                        </h4>
                        <p className="text-neutral-300 text-sm md:text-sm leading-relaxed">
                          {step.explanation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 bg-black/40 border border-white/10 p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-sm md:text-base text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{solution.nextStep}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
