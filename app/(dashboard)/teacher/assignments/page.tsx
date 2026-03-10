"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Sparkles, Clock, CheckCircle2, FileText, Send } from "lucide-react";

const activeAssignments = [
  { id: 1, title: "FPGA Routing: Switch Matrix Deep Dive", type: "AI Generated", dueDate: "Tomorrow, 11:59 PM", completion: 80, isAI: true },
  { id: 2, title: "CMOS Fabrication Stages Quiz", type: "Standard", dueDate: "Friday, 5:00 PM", completion: 45, isAI: false },
  { id: 3, title: "Verilog HDL Race Conditions", type: "Remedial", dueDate: "Sunday, 11:59 PM", completion: 10, isAI: true },
];

export default function AssignmentsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-blue-500" />
            Adaptive Assignments
          </h1>
          <p className="text-neutral-400 mt-2">Manage workloads and generate AI-targeted problem sets.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"
        >
          {isGenerating ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compiling...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Auto-Generate via AI</>
          )}
        </button>
      </header>

      {/* Generator Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-3xl backdrop-blur-md flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Cohort Analysis</h3>
            <p className="text-sm text-blue-200/70 mt-1">40% of the class failed the recent Timing Violations quiz. Click auto-generate to deploy a tailored remedial worksheet.</p>
          </div>
        </div>
      </motion.div>

      {/* Assignment List */}
      <div className="space-y-4">
        {activeAssignments.map((task, i) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-md flex flex-col md:flex-row justify-between gap-6 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex gap-4">
              <div className={`p-3 rounded-xl h-fit ${task.isAI ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-neutral-400"}`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{task.title}</h3>
                  {task.isAI && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/20">AI Generated</span>}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm font-medium text-neutral-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Due: {task.dueDate}</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {task.type}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full md:w-48 shrink-0 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-neutral-400">Completion</span>
                <span className={task.completion > 50 ? "text-green-400" : "text-orange-400"}>{task.completion}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${task.completion}%` }} transition={{ duration: 1 }} className={`h-full rounded-full ${task.completion > 50 ? "bg-green-500" : "bg-orange-500"}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}