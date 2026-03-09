"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Presentation,
  Swords,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/student");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-black text-neutral-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* 🎥 HIGH-TECH BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105">
          <source
            src="/eduoraclebg.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center z-10 space-y-6 md:space-y-8 px-2 sm:px-4 mb-20">
        {/* Summit Branding */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-300 mb-2 md:mb-4 backdrop-blur-md">
          <Presentation className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          <span>Live Demo: GCU AI Summit</span>
        </div>

        {/* Brand Identity */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight">
          Edu
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
            Globiz
          </span>{" "}
          AI
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          The Predictive Knowledge Layer. <br className="hidden sm:block" />
          Mapping cognitive DNA across Math, Science, and Technology.
        </p>

        {/* Responsive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 md:pt-8 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={handleStartDemo}
            disabled={isLoading}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-70 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="truncate">Initializing AI...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5" />
                <span>Try Demo Student</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <button
            onClick={() => router.push("/teacher")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-md transition-all active:scale-95">
            <Presentation className="w-5 h-5 text-purple-400" />
            <span>Educator View</span>
          </button>
        </div>

        {/* Live Audience Engagement */}
        <div className="pt-8 md:pt-12">
          <button
            onClick={() => router.push("/battle")}
            className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-300 flex items-center justify-center gap-2 mx-auto transition-colors p-2">
            <Swords className="w-4 h-4" />
            Join Live Quiz Battle (Audience)
          </button>
        </div>
      </motion.div>

      {/* 🇮🇳 DEVELOPER CREDIT FOOTER */}
      <footer className="absolute bottom-6 w-full text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-white/10 mb-2" />
          <p className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold">
            Developed by{" "}
            <span className="text-neutral-300">Globizhub India Pvt Ltd</span>
          </p>
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-600 uppercase tracking-widest mt-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Secured Enterprise Infrastructure</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
