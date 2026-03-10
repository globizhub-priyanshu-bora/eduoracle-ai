"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, AlertOctagon, Zap, Send, 
  CheckCircle2, Clock, UserX, BrainCircuit
} from "lucide-react";

// Data tied to the specific ECE students flagged as "At Risk" in your seed
const activeAlerts = [
  { 
    id: "INT-01", 
    student: "Rahul Das", 
    trigger: "46% negative deviation on Mock 1", 
    rootCause: "FPGA Routing Algorithms",
    severity: "Critical", 
    aiStrategy: "Deploy an interactive 5-step remedial module focusing on switch matrix architectures. Bypass standard quizzes.",
    status: "Pending Action"
  },
  { 
    id: "INT-02", 
    student: "Amit Kalita", 
    trigger: "Failing sequential logic constraints", 
    rootCause: "Digital VLSI Design",
    severity: "High", 
    aiStrategy: "Assign dynamic visual K-Map solver exercises. Schedule mandatory 15-minute 1-on-1 review.",
    status: "Pending Action"
  },
  { 
    id: "INT-03", 
    student: "Karan Varma", 
    trigger: "Chronic absenteeism + 40% health score", 
    rootCause: "Circuit Parasitics",
    severity: "High", 
    aiStrategy: "Draft and stage early-warning email to student and academic advisor outlining specific knowledge gaps.",
    status: "Deployed"
  },
];

export default function InterventionHubPage() {
  const [alerts, setAlerts] = useState(activeAlerts);
  const [deployingId, setDeployingId] = useState<string | null>(null);

  const handleDeploy = (id: string) => {
    setDeployingId(id);
    // Simulate API delay for deploying an AI intervention
    setTimeout(() => {
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, status: "Deployed" } : alert
      ));
      setDeployingId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            Intervention Hub
          </h1>
          <p className="text-neutral-400 mt-2">AI-generated remediation strategies for at-risk students.</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <BrainCircuit className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Oracle Engine Active</span>
        </div>
      </header>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 flex items-center gap-4 backdrop-blur-md">
          <div className="p-3 bg-red-500/10 rounded-xl">
            <AlertOctagon className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{alerts.filter(a => a.status === "Pending Action").length}</p>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Pending Interventions</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 flex items-center gap-4 backdrop-blur-md">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{alerts.filter(a => a.status === "Deployed").length}</p>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Strategies Deployed</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 flex items-center gap-4 backdrop-blur-md">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <UserX className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">3</p>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Critical Dropouts Prevented</p>
          </div>
        </div>
      </div>

      {/* --- INTERVENTION FEED --- */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-[0.2em] px-2 mb-4">Action Required</h2>
        
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <motion.div 
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`p-6 rounded-3xl border backdrop-blur-xl relative overflow-hidden ${
                alert.status === "Deployed" 
                  ? "bg-white/[0.02] border-white/5" 
                  : "bg-neutral-900/60 border-white/10 shadow-2xl"
              }`}
            >
              {/* Background Glow for Pending Critical Alerts */}
              {alert.status === "Pending Action" && alert.severity === "Critical" && (
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
              )}

              <div className="flex flex-col lg:flex-row gap-6 lg:items-center relative z-10">
                {/* Identity & Trigger */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                      alert.severity === "Critical" ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                      "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-sm font-medium text-neutral-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Detected 2 hrs ago
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{alert.student}</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                      <strong className="text-neutral-200">Trigger:</strong> {alert.trigger}
                    </p>
                    <p className="text-sm text-neutral-400 mt-0.5">
                      <strong className="text-neutral-200">Root Cause Failure:</strong> {alert.rootCause}
                    </p>
                  </div>
                </div>

                {/* AI Recommended Strategy */}
                <div className="flex-1 bg-black/40 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">EduOracle Strategy</span>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                    "{alert.aiStrategy}"
                  </p>
                </div>

                {/* Action Button */}
                <div className="w-full lg:w-48 shrink-0">
                  {alert.status === "Deployed" ? (
                    <div className="w-full py-4 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-center gap-2 text-green-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" /> Active
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDeploy(alert.id)}
                      disabled={deployingId === alert.id}
                      className="w-full py-4 rounded-xl border border-blue-500/50 bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {deployingId === alert.id ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deploying...</>
                      ) : (
                        <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Deploy Plan</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}