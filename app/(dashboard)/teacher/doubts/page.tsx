"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Camera, 
  CheckCircle2, 
  Clock, 
  MessageSquareWarning,
  ChevronRight,
  BrainCircuit
} from "lucide-react";

export default function StudentDoubtsPage() {
  const [filter, setFilter] = useState("Unresolved");

  // Mock data representing the VisionQuery table in your Neon DB
  const doubts = [
    {
      id: "1",
      student: "Amit Kalita",
      topic: "Digital VLSI Design",
      query: "Why is the setup time violating in this CMOS layout?",
      time: "10 mins ago",
      status: "Unresolved",
      aiConfidence: "92%",
      severity: "High",
    },
    {
      id: "2",
      student: "Rahul Das",
      topic: "FPGA Routing Algorithms",
      query: "I don't understand the logic block mapping here.",
      time: "1 hour ago",
      status: "Unresolved",
      aiConfidence: "88%",
      severity: "Critical",
    },
    {
      id: "3",
      student: "Sneha Menon",
      topic: "Verilog HDL Timing",
      query: "Is this non-blocking assignment causing the race condition?",
      time: "3 hours ago",
      status: "Resolved",
      aiConfidence: "98%",
      severity: "Low",
    },
    {
      id: "4",
      student: "Karan Varma",
      topic: "Circuit Parasitics",
      query: "How do I calculate the parasitic capacitance for this node?",
      time: "5 hours ago",
      status: "Unresolved",
      aiConfidence: "85%",
      severity: "Medium",
    }
  ];

  const filteredDoubts = doubts.filter(d => filter === "All" || d.status === filter);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Student Doubts</h1>
          <p className="text-neutral-400 mt-1">Live feed of AI Vision Tutor queries from your cohort.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick Filters */}
          <div className="flex bg-neutral-900/50 border border-white/10 rounded-lg p-1">
            {["Unresolved", "Resolved", "All"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  filter === f 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doubts Feed */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDoubts.map((doubt, i) => (
          <motion.div
            key={doubt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:bg-neutral-900/60 transition-colors group"
          >
            {/* Image Placeholder (Simulating Vision Upload) */}
            <div className="w-full md:w-48 h-32 bg-neutral-950 rounded-xl border border-white/10 flex flex-col items-center justify-center text-neutral-600 relative overflow-hidden shrink-0">
              <Camera className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs font-medium uppercase tracking-widest">Image Upload</span>
              {doubt.status === "Unresolved" && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                    <BrainCircuit className="w-3 h-3" />
                    <span>Topic: {doubt.topic}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <Clock className="w-3 h-3" />
                    {doubt.time}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">"{doubt.query}"</h3>
                <p className="text-sm text-neutral-400">Asked by <span className="text-neutral-200 font-medium">{doubt.student}</span></p>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                    doubt.severity === "Critical" ? "bg-red-500/10 border-red-500/20 text-red-400" :
                    doubt.severity === "High" ? "bg-orange-500/10 border-orange-500/20 text-orange-400" :
                    "bg-neutral-800 border-white/10 text-neutral-400"
                  }`}>
                    {doubt.severity} Priority
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    AI Confidence: <span className="text-white">{doubt.aiConfidence}</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                    <MessageSquareWarning className="w-4 h-4" />
                    Review AI Solution
                  </button>
                  {doubt.status === "Unresolved" && (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-400 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredDoubts.length === 0 && (
          <div className="py-12 text-center text-neutral-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No {filter.toLowerCase()} doubts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}