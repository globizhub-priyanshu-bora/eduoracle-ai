"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, BrainCircuit, Users, Video } from "lucide-react";

const scheduleData = [
  { time: "09:00 AM", title: "ECE-401 Lecture: Memory Architecture", type: "In-Person", icon: Users, isAI: false },
  { time: "11:30 AM", title: "Automated ISRO Mock 2 Deployment", type: "System Event", icon: Clock, isAI: true },
  { time: "02:00 PM", title: "1-on-1 Remedial: Amit Kalita", type: "Virtual", icon: Video, isAI: false },
  { time: "04:00 PM", title: "AI Vision Tutor Summary Report Generation", type: "Data Sync", icon: BrainCircuit, isAI: true },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-blue-500" />
          Command Schedule
        </h1>
        <p className="text-neutral-400 mt-2">Today's academic timeline and automated system events.</p>
      </header>

      <div className="relative border-l-2 border-white/10 ml-6 space-y-12 py-6">
        {scheduleData.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-neutral-950 flex items-center justify-center ${event.isAI ? "bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-neutral-600"}`}>
              <event.icon className="w-3 h-3 text-white" />
            </div>

            <div className={`p-5 rounded-2xl border backdrop-blur-md transition-colors ${event.isAI ? "bg-blue-900/10 border-blue-500/20 hover:bg-blue-900/20" : "bg-neutral-900/40 border-white/10 hover:bg-white/[0.02]"}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <span className="text-sm font-black text-white bg-white/10 px-3 py-1 rounded-lg w-fit">
                  {event.time}
                </span>
                {event.isAI && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1">
                    <BrainCircuit className="w-3 h-3" /> System Automated
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mt-2">{event.title}</h3>
              <p className="text-sm text-neutral-400 font-medium mt-1">Format: {event.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}