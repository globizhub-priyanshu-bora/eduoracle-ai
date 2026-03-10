"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle, 
  Cpu, 
  Zap, 
  Activity,
  Microscope
} from "lucide-react";

export default function PerformanceInsightsPage() {
  // Hardcoded to match your exact Neon DB seed data for the demo
  const stats = [
    { label: "Cohort Average", value: "81.5%", trend: "-2.4%", isPositive: false, icon: Activity },
    { label: "High-Risk Students", value: "4", trend: "+1", isPositive: false, icon: AlertTriangle },
    { label: "Predicted Pass Rate", value: "60%", trend: "-15%", isPositive: false, icon: Target },
    { label: "AI Accuracy Score", value: "94%", trend: "+2.1%", isPositive: true, icon: Microscope },
  ];

  const bottlenecks = [
    { topic: "FPGA Routing Algorithms", failRate: 68, impact: "Critical" },
    { topic: "Timing Violations", failRate: 55, impact: "High" },
    { topic: "Digital VLSI Design", failRate: 42, impact: "Medium" },
    { topic: "CMOS Fabrication", failRate: 30, impact: "Low" },
  ];

  const trajectoryData = [
    { name: "Rahul D.", current: 88, predicted: 42, status: "Crashing" },
    { name: "Amit K.", current: 75, predicted: 35, status: "Crashing" },
    { name: "Neha S.", current: 91, predicted: 48, status: "Crashing" },
    { name: "Karan V.", current: 82, predicted: 40, status: "Crashing" },
    { name: "Pooja N.", current: 95, predicted: 94, status: "Stable" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Performance Insights</h1>
          <p className="text-neutral-400 mt-1">Real-time cognitive analytics for ECE-401 Advanced Systems.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">AI Analysis Active</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <stat.icon className="w-5 h-5 text-neutral-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
              }`}>
                {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            <p className="text-sm font-medium text-neutral-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bottleneck Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Syllabus Bottlenecks</h2>
          </div>
          <div className="space-y-6">
            {bottlenecks.map((item) => (
              <div key={item.topic}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-neutral-300">{item.topic}</span>
                  <span className="font-bold text-neutral-400">{item.failRate}% Failure Rate</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.failRate}%` }}
                    transition={{ duration: 1, type: "spring" }}
                    className={`h-2.5 rounded-full ${
                      item.failRate > 60 ? "bg-red-500" : item.failRate > 40 ? "bg-orange-500" : "bg-blue-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trajectory Warning List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-md flex flex-col"
        >
          <h2 className="text-lg font-bold text-white mb-6">Trajectory Warnings</h2>
          <div className="flex-1 space-y-4">
            {trajectoryData.map((student) => (
              <div key={student.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="font-bold text-white text-sm">{student.name}</p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                    Current: <span className="text-white font-medium">{student.current}</span>
                    <TrendingDown className="w-3 h-3 mx-1 text-neutral-600" />
                    Pred: <span className={student.predicted < 50 ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                      {student.predicted}
                    </span>
                  </p>
                </div>
                {student.status === "Crashing" ? (
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors">
            View All Predictions
          </button>
        </motion.div>
      </div>
    </div>
  );
}