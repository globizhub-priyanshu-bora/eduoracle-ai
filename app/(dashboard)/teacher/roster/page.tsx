"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, MoreVertical, Users, 
  BookOpen, Mail, Target, ShieldCheck, ChevronDown, Activity
} from "lucide-react";

// Data perfectly mapped to the 10 ECE students from your Neon DB seed
const mockRoster = [
  { id: "S01", name: "Rahul Das", email: "rahul@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 42, weakSubjects: ["FPGA Routing"], status: "At Risk" },
  { id: "S02", name: "Priya Sharma", email: "priya@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 90, weakSubjects: [], status: "Stable" },
  { id: "S03", name: "Amit Kalita", email: "amit@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 35, weakSubjects: ["Digital VLSI"], status: "At Risk" },
  { id: "S04", name: "Sneha Menon", email: "sneha@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 82, weakSubjects: [], status: "Stable" },
  { id: "S05", name: "Vikram Bora", email: "vikram@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 55, weakSubjects: ["CMOS Fab"], status: "Warning" },
  { id: "S06", name: "Neha Saikia", email: "neha@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 48, weakSubjects: ["Verilog Timing"], status: "At Risk" },
  { id: "S07", name: "Rohan Baruah", email: "rohan@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 76, weakSubjects: [], status: "Stable" },
  { id: "S08", name: "Anjali Thakuria", email: "anjali@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 88, weakSubjects: [], status: "Stable" },
  { id: "S09", name: "Karan Varma", email: "karan@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 40, weakSubjects: ["Parasitics"], status: "At Risk" },
  { id: "S10", name: "Pooja Nath", email: "pooja@eduoracle.com", targetExam: "ISRO Scientist 'SC'", healthScore: 94, weakSubjects: [], status: "Stable" },
];

export default function ClassRosterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterOptions = ["All", "Stable", "Warning", "At Risk"];

  // Combined Search and Status Filter logic
  const filteredStudents = mockRoster.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = activeFilter === "All" || student.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Class Roster
          </h1>
          <p className="text-neutral-400 mt-2">ECE-401 Advanced Systems • {mockRoster.length} Enrolled Students</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full md:w-auto flex items-center justify-between gap-3 border transition-all text-sm backdrop-blur-md px-5 py-2.5 rounded-xl font-medium ${
              activeFilter !== "All" 
                ? "bg-blue-600/20 border-blue-500/50 text-blue-400" 
                : "bg-neutral-900/50 border-white/10 hover:bg-white/5 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> 
              {activeFilter === "All" ? "Filter by Status" : activeFilter}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsFilterOpen(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                >
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveFilter(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${
                        activeFilter === option 
                          ? "bg-blue-600/20 text-blue-400 font-bold" 
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {option}
                      {activeFilter === option && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* --- SEARCH BAR --- */}
      <div className="relative group z-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-neutral-500 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900/40 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 backdrop-blur-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-600 shadow-inner"
        />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-neutral-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.02] text-neutral-500 uppercase text-[10px] tracking-[0.2em] border-b border-white/5">
                <th className="p-5 font-bold">Student Profile</th>
                <th className="p-5 font-bold">Target Goal</th>
                <th className="p-5 font-bold">AI Flagged Weakness</th>
                <th className="p-5 font-bold">Predictive Health</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <AnimatePresence mode="popLayout">
                {filteredStudents.length === 0 ? (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    key="empty"
                  >
                    <td colSpan={5} className="p-16 text-center text-neutral-500">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p className="text-lg font-medium text-white mb-1">No matches found</p>
                      <p>No students match your current search and filter criteria.</p>
                      {(searchQuery || activeFilter !== "All") && (
                        <button 
                          onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                          className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ) : (
                  filteredStudents.map((student, i) => (
                    <motion.tr 
                      key={student.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className="transition-colors hover:bg-white/[0.02] group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${
                            student.status === 'At Risk' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                            student.status === 'Warning' ? 'bg-gradient-to-br from-orange-500 to-yellow-600' :
                            'bg-gradient-to-br from-blue-500 to-indigo-600'
                          }`}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{student.name}</div>
                            <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" /> {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-5 text-neutral-300">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg w-max border border-white/5">
                          <Target className="w-3.5 h-3.5 text-blue-400" />
                          {student.targetExam}
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex flex-wrap gap-2">
                          {student.weakSubjects.length > 0 ? (
                            student.weakSubjects.map((sub, idx) => (
                              <span key={idx} className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
                                <BookOpen className="w-3 h-3" /> {sub}
                              </span>
                            ))
                          ) : (
                            <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3" /> Stable Trajectory
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-4 w-48">
                          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${student.healthScore}%` }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                              className={`h-full rounded-full ${
                                student.healthScore >= 80 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                                student.healthScore >= 55 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 
                                'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                              }`}
                            />
                          </div>
                          <span className={`font-black w-8 text-right ${
                            student.healthScore >= 80 ? 'text-green-400' : 
                            student.healthScore >= 55 ? 'text-orange-400' : 
                            'text-red-400'
                          }`}>
                            {student.healthScore}
                          </span>
                        </div>
                      </td>

                      <td className="p-5 text-right">
                        <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}