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
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // The frictionless entry function
  const handleStartDemo = () => {
    setIsLoading(true);
    // Simulate a brief 1.5s AI "boot up" sequence for the judges before routing
    setTimeout(() => {
      // 🚨 FIXED: Route aligned with our App Router directory structure
      router.push("/student");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow Effects - Scaled for mobile to prevent overflow/distraction */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center z-10 space-y-6 md:space-y-8 px-2 sm:px-4">
        {/* Summit Branding */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-300 mb-2 md:mb-4">
          <Presentation className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          <span>Live Demo: GCU AI Summit</span>
        </div>

        {/* Main Typography - Fluid scaling from mobile to desktop */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
          Edu
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Oracle
          </span>{" "}
          AI
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto px-4 sm:px-0">
          From Data to Destiny. <br className="hidden sm:block" />
          AI that predicts and prevents academic failure.
        </p>

        {/* Action Buttons - Stacked full-width on mobile, inline on tablet+ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 md:pt-8 w-full sm:w-auto px-4 sm:px-0">
          {/* Primary CTA: Student Demo */}
          <button
            onClick={handleStartDemo}
            disabled={isLoading}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-full font-medium text-base sm:text-lg hover:bg-neutral-200 transition-all disabled:opacity-70">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="truncate">Initializing AI DNA...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5 shrink-0" />
                <span>Try Demo Student</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </>
            )}
          </button>

          {/* Secondary CTA: Teacher Command Center */}
          <button
            onClick={() => router.push("/teacher")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-base sm:text-lg hover:bg-white/10 transition-all">
            <Presentation className="w-5 h-5 text-purple-400 shrink-0" />
            <span>Educator View</span>
          </button>
        </div>

        {/* Tertiary Action: Quiz Battle (Optimized touch target for audience phones) */}
        <div className="pt-8 md:pt-12">
          <button
            onClick={() => router.push("/battle")}
            className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-300 flex items-center justify-center gap-2 mx-auto transition-colors p-2">
            <Swords className="w-4 h-4" />
            Join Live Quiz Battle (Audience)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
