"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardList, Search, Save, AlertTriangle, 
  TrendingDown, Calculator, Check, FileSpreadsheet
} from "lucide-react";

// Mock data mapped to the 10 ECE students
const initialScores = [
  { id: "S01", name: "Rahul Das", mock1: 42, quiz1: 45, midterm: 0 },
  { id: "S02", name: "Priya Sharma", mock1: 90, quiz1: 95, midterm: 0 },
  { id: "S03", name: "Amit Kalita", mock1: 35, quiz1: 40, midterm: 0 },
  { id: "S04", name: "Sneha Menon", mock1: 82, quiz1: 88, midterm: 0 },
  { id: "S05", name: "Vikram Bora", mock1: 55, quiz1: 60, midterm: 0 },
  { id: "S06", name: "Neha Saikia", mock1: 48, quiz1: 52, midterm: 0 },
  { id: "S07", name: "Rohan Baruah", mock1: 76, quiz1: 80, midterm: 0 },
  { id: "S08", name: "Anjali Thakuria", mock1: 88, quiz1: 85, midterm: 0 },
  { id: "S09", name: "Karan Varma", mock1: 40, quiz1: 38, midterm: 0 },
  { id: "S10", name: "Pooja Nath", mock1: 94, quiz1: 92, midterm: 0 },
];

export default function ExamScoresPage() {
  const [scores, setScores] = useState(initialScores);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Handle inline score editing
  const handleScoreChange = (id: string, field: string, value: string) => {
    const numValue = value === "" ? 0 : Math.min(100, Math.max(0, parseInt(value) || 0));
    setScores(prev => prev.map(s => s.id === id ? { ...s, [field]: numValue } : s));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setHasChanges(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1200);
  };

  const calculateAverage = (student: any) => {
    const total = student.mock1 + student.quiz1 + student.midterm;
    const count = [student.mock1, student.quiz1, student.midterm].filter(v => v > 0).length || 1;
    return Math.round(total / count);
  };

  // Color logic for heatmap cells
  const getScoreColor = (score: number) => {
    if (score === 0) return "text-neutral-600 bg-neutral-900/50";
    if (score >= 80) return "text-green-400 bg-green-500/10 border-green-500/20";
    if (score >= 55) return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20 font-bold shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]";
  };

  const filteredScores = scores.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto space-y-8 pb-32">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-blue-500" />
            Exam Scores
          </h1>
          <p className="text-neutral-400 mt-2">ECE-401 Gradebook • Click any cell to edit</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col px-5 py-2 bg-neutral-900/50 border border-white/5 rounded-xl">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Class Average</span>
            <span className="text-xl font-black text-blue-400 flex items-center gap-2">
              <Calculator className="w-4 h-4" /> 68%
            </span>
          </div>
        </div>
      </header>

      {/* --- AI ANOMALY DETECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-md"
      >
        <div className="p-2 bg-red-500/20 rounded-full mt-0.5">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
            AI Score Anomaly Detected
          </h3>
          <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
            <strong className="text-white">Rahul Das</strong> scored <strong className="text-red-400">42%</strong> on Mock 1. This represents a <strong className="text-red-400">46% negative deviation</strong> from his predictive baseline. AI recommends immediate intervention.
          </p>
        </div>
      </motion.div>

      {/* --- SEARCH & ACTIONS --- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm shadow-inner"
          />
        </div>
        
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors">
          <FileSpreadsheet className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* --- DATA GRID --- */}
      <div className="bg-neutral-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.02] text-neutral-500 uppercase text-[10px] tracking-[0.2em] border-b border-white/5">
                <th className="p-5 font-bold w-1/4">Student</th>
                <th className="p-5 font-bold text-center">ISRO Mock 1</th>
                <th className="p-5 font-bold text-center">Quiz 1 (Timing)</th>
                <th className="p-5 font-bold text-center">Midterm (Pending)</th>
                <th className="p-5 font-bold text-center border-l border-white/5">Current Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredScores.map((student, i) => {
                const avg = calculateAverage(student);
                return (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="transition-colors hover:bg-white/[0.02] group"
                  >
                    <td className="p-5">
                      <div className="font-bold text-white">{student.name}</div>
                      <div className="text-xs text-neutral-500 font-mono mt-0.5">{student.id}</div>
                    </td>
                    
                    {/* Editable Cells */}
                    {['mock1', 'quiz1', 'midterm'].map((field) => (
                      <td key={field} className="p-3 text-center">
                        <input
                          type="number"
                          value={student[field as keyof typeof student] || ""}
                          onChange={(e) => handleScoreChange(student.id, field, e.target.value)}
                          placeholder="--"
                          className={`w-16 text-center text-sm font-black py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text ${getScoreColor(Number(student[field as keyof typeof student]))}`}
                        />
                      </td>
                    ))}

                    <td className="p-5 text-center border-l border-white/5">
                      <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg border text-xs font-black ${getScoreColor(avg)}`}>
                        {avg}%
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FLOATING SAVE BAR --- */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-0 right-0 md:left-[280px] flex justify-center z-50 px-4 pointer-events-none"
          >
            <div className="bg-neutral-900 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-2xl p-2 flex items-center gap-4 backdrop-blur-xl pointer-events-auto">
              <div className="px-4 text-sm font-medium text-orange-400 hidden sm:flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Unsaved changes
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving || isSuccess}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  isSuccess 
                    ? "bg-green-500 text-white" 
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                }`}
              >
                {isSaving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Syncing...</>
                ) : isSuccess ? (
                  <><Check className="w-4 h-4" /> Synced to DB</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Grades</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}