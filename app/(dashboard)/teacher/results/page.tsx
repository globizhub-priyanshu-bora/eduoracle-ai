"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, Trophy, Medal, Award, 
  TrendingUp, Download, CheckCircle2, AlertOctagon,
  BrainCircuit
} from "lucide-react";

// Ranked data based on the 10 ECE students
const finalResults = [
  { id: "S10", name: "Pooja Nath", score: 96, predicted: 94, status: "Honors" },
  { id: "S02", name: "Priya Sharma", score: 92, predicted: 95, status: "Honors" },
  { id: "S08", name: "Anjali Thakuria", score: 89, predicted: 88, status: "Distinction" },
  { id: "S04", name: "Sneha Menon", score: 85, predicted: 82, status: "Distinction" },
  { id: "S07", name: "Rohan Baruah", score: 78, predicted: 75, status: "Pass" },
  { id: "S05", name: "Vikram Bora", score: 62, predicted: 55, status: "Pass" },
  { id: "S06", name: "Neha Saikia", score: 55, predicted: 48, status: "Pass" },
  { id: "S01", name: "Rahul Das", score: 48, predicted: 42, status: "Failed" },
  { id: "S09", name: "Karan Varma", score: 45, predicted: 40, status: "Failed" },
  { id: "S03", name: "Amit Kalita", score: 38, predicted: 35, status: "Failed" },
];

export default function FinalResultsPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 2000);
  };

  const topThree = finalResults.slice(0, 3);
  const remainingStudents = finalResults.slice(3);

  const getRankStyle = (index: number) => {
    switch(index) {
      case 0: return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: Trophy };
      case 1: return { color: "text-slate-300", bg: "bg-slate-300/10", border: "border-slate-300/30", icon: Medal };
      case 2: return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: Award };
      default: return { color: "text-neutral-500", bg: "bg-neutral-800", border: "border-white/10", icon: null };
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto space-y-8 pb-32">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            Final Cohort Results
          </h1>
          <p className="text-neutral-400 mt-2">ECE-401 Advanced Systems • Semester End Report</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-neutral-900/50 border border-white/10 hover:bg-white/5 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm backdrop-blur-md">
            <Download className="w-4 h-4" /> Export Transcripts
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing || isPublished}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 ${
              isPublished ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isPublishing ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Committing...</>
            ) : isPublished ? (
              <><CheckCircle2 className="w-4 h-4" /> Published to Portal</>
            ) : (
              <><TrendingUp className="w-4 h-4" /> Publish Final Grades</>
            )}
          </button>
        </div>
      </header>

      {/* --- AI ACCURACY METRIC --- */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Predictive Accuracy: 94.2%</h3>
            <p className="text-sm text-blue-200/70 mt-1">
              EduOracle successfully predicted 9 out of 10 student outcomes within a 3% margin of error on day 14 of the semester.
            </p>
          </div>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="flex flex-col px-4 py-2 bg-neutral-900/50 border border-white/5 rounded-xl">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Pass Rate</span>
            <span className="text-xl font-black text-green-400">70%</span>
          </div>
          <div className="flex flex-col px-4 py-2 bg-neutral-900/50 border border-white/5 rounded-xl">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Failed</span>
            <span className="text-xl font-black text-red-400">30%</span>
          </div>
        </div>
      </motion.div>

      {/* --- TOP 3 PODIUM --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {topThree.map((student, i) => {
          const style = getRankStyle(i);
          const RankIcon = style.icon!;
          return (
            <motion.div 
              key={student.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col items-center p-8 rounded-3xl border backdrop-blur-xl ${
                i === 0 ? "md:-mt-8 bg-gradient-to-b from-yellow-500/10 to-neutral-900/40 border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.1)]" : 
                "bg-neutral-900/40 border-white/10"
              }`}
            >
              <div className={`absolute -top-6 w-12 h-12 rounded-full border-4 border-neutral-950 flex items-center justify-center ${style.bg} ${style.border}`}>
                <RankIcon className={`w-5 h-5 ${style.color}`} />
              </div>
              
              <div className={`w-20 h-20 mt-4 mb-4 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner border-2 ${style.border} bg-neutral-800`}>
                {student.name.charAt(0)}
              </div>
              
              <h3 className="text-xl font-bold text-white tracking-tight">{student.name}</h3>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${style.color}`}>Rank {i + 1}</span>
              
              <div className="mt-6 text-center">
                <div className="text-4xl font-black text-white">{student.score}<span className="text-xl text-neutral-500">%</span></div>
                <div className="text-xs text-neutral-500 mt-2 font-medium">AI Predicted: {student.predicted}%</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- RANKED COHORT LIST --- */}
      <div className="mt-8 bg-neutral-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-neutral-500 uppercase text-[10px] tracking-[0.2em] border-b border-white/5">
                <th className="p-5 font-bold w-16 text-center">Rank</th>
                <th className="p-5 font-bold">Student</th>
                <th className="p-5 font-bold text-center">Final Score</th>
                <th className="p-5 font-bold text-center">AI Prediction</th>
                <th className="p-5 font-bold text-right">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {remainingStudents.map((student, i) => {
                const rank = i + 4;
                const isFailed = student.status === "Failed";
                
                return (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.05) }}
                    className={`transition-colors group ${isFailed ? "bg-red-500/[0.02] hover:bg-red-500/[0.05]" : "hover:bg-white/[0.02]"}`}
                  >
                    <td className="p-5 text-center font-mono text-neutral-500 font-bold">{rank}</td>
                    <td className="p-5">
                      <div className="font-bold text-white">{student.name}</div>
                      <div className="text-xs text-neutral-500 font-mono mt-0.5">{student.id}</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`font-black text-lg ${isFailed ? "text-red-400" : "text-white"}`}>
                        {student.score}%
                      </span>
                    </td>
                    <td className="p-5 text-center text-neutral-400 font-medium">
                      {student.predicted}%
                    </td>
                    <td className="p-5 text-right">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${
                        isFailed ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                        "bg-white/5 text-neutral-300 border-white/10"
                      }`}>
                        {isFailed && <AlertOctagon className="w-3.5 h-3.5" />}
                        {student.status}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}