"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  Mail, 
  User, 
  Target, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2,
  Cpu,
  Activity
} from "lucide-react";

export default function AddStudentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    targetExam: "ISRO Scientist 'SC'",
    weakSubject: "None",
    isStruggler: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call to Prisma
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", targetExam: "ISRO Scientist 'SC'", weakSubject: "None", isStruggler: false });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Enroll Student</h1>
        <p className="text-neutral-400 mt-1">Provision a new digital twin in the EduOracle tracking system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: The Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-6 bg-neutral-900/40 border border-white/5 backdrop-blur-md p-6 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Identity & Metrics</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Das"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="rahul@eduoracle.com"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Target Exam Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Target Goal</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <select
                    name="targetExam"
                    value={formData.targetExam}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="ISRO Scientist 'SC'">ISRO Scientist 'SC'</option>
                    <option value="GATE ECE 2026">GATE ECE 2026</option>
                    <option value="DRDO RAC">DRDO RAC</option>
                  </select>
                </div>
              </div>

              {/* Initial Weakness Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Known Weakness</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <select
                    name="weakSubject"
                    value={formData.weakSubject}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="None">None (Unassessed)</option>
                    <option value="FPGA Routing">FPGA Routing</option>
                    <option value="Digital Logic">Digital Logic</option>
                    <option value="CMOS Fabrication">CMOS Fabrication</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Silent Struggler Toggle */}
            <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div>
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Flag as Silent Struggler
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Force AI to monitor this student with elevated priority.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isStruggler"
                  checked={formData.isStruggler}
                  onChange={handleInputChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess || !formData.name || !formData.email}
              className="w-full relative overflow-hidden flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Provisioning...
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Student Enrolled
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    Initialize Student Tracker
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </motion.div>

        {/* Right Column: Live Digital Twin Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-8 space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest px-1">Live Profile Preview</h3>
            
            <div className="relative p-6 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative background glow */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-30 ${formData.isStruggler ? 'bg-red-500' : 'bg-blue-500'}`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 border-2 border-white/10 flex items-center justify-center text-xl font-black text-white shadow-inner">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    formData.isStruggler ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}>
                    {formData.isStruggler ? "High Risk" : "Stable"}
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-white tracking-tight truncate">
                  {formData.name || "Student Name"}
                </h4>
                <p className="text-sm text-neutral-400 truncate mb-6">
                  {formData.email || "student@eduoracle.com"}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-neutral-400 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Goal
                    </span>
                    <span className="text-xs font-bold text-white">{formData.targetExam}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-neutral-400 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Watchlist Area
                    </span>
                    <span className={`text-xs font-bold ${formData.weakSubject !== "None" ? "text-orange-400" : "text-white"}`}>
                      {formData.weakSubject}
                    </span>
                  </div>
                </div>
                
                {/* AI Placeholder logic */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mb-2">AI Initial Assessment</p>
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500/20 w-full animate-pulse rounded-full" />
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 text-center italic">Awaiting first diagnostic exam...</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}