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
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow Effects (The "AI" Aesthetic) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center z-10 space-y-8">
        {/* Summit Branding */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-4">
          <Presentation className="w-4 h-4 text-blue-400" />
          <span>Live Demo: GCU AI Summit</span>
        </div>

        {/* Main Typography */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Edu
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Oracle
          </span>{" "}
          AI
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light">
          From Data to Destiny. <br className="hidden md:block" />
          AI that predicts and prevents academic failure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {/* Primary CTA: Student Demo */}
          <button
            onClick={handleStartDemo}
            disabled={isLoading}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-neutral-200 transition-all disabled:opacity-70">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing AI DNA...
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5" />
                Try Demo Student
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Secondary CTA: Teacher Command Center */}
          <button
            onClick={() => router.push("/teacher")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all">
            <Presentation className="w-5 h-5 text-purple-400" />
            Educator View
          </button>
        </div>

        {/* Tertiary Action: Quiz Battle (Hidden on desktop, meant for audience phones) */}
        <div className="pt-12">
          <button
            onClick={() => router.push("/battle")}
            className="text-sm text-neutral-500 hover:text-neutral-300 flex items-center justify-center gap-2 mx-auto transition-colors">
            <Swords className="w-4 h-4" />
            Join Live Quiz Battle (Audience)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
