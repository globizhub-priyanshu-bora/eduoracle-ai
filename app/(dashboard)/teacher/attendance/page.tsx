"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckSquare, Calendar, Search, Check, 
  X, Clock, Save, Sparkles, AlertCircle 
} from "lucide-react";

// The 10 ECE students from your cohort
const mockStudents = [
  { id: "S01", name: "Rahul Das", email: "rahul@eduoracle.com", avatarColor: "from-blue-500 to-indigo-600" },
  { id: "S02", name: "Priya Sharma", email: "priya@eduoracle.com", avatarColor: "from-purple-500 to-pink-600" },
  { id: "S03", name: "Amit Kalita", email: "amit@eduoracle.com", avatarColor: "from-red-500 to-orange-600" },
  { id: "S04", name: "Sneha Menon", email: "sneha@eduoracle.com", avatarColor: "from-green-500 to-emerald-600" },
  { id: "S05", name: "Vikram Bora", email: "vikram@eduoracle.com", avatarColor: "from-orange-500 to-yellow-600" },
  { id: "S06", name: "Neha Saikia", email: "neha@eduoracle.com", avatarColor: "from-red-500 to-orange-600" },
  { id: "S07", name: "Rohan Baruah", email: "rohan@eduoracle.com", avatarColor: "from-blue-500 to-cyan-600" },
  { id: "S08", name: "Anjali Thakuria", email: "anjali@eduoracle.com", avatarColor: "from-purple-500 to-indigo-600" },
  { id: "S09", name: "Karan Varma", email: "karan@eduoracle.com", avatarColor: "from-red-500 to-orange-600" },
  { id: "S10", name: "Pooja Nath", email: "pooja@eduoracle.com", avatarColor: "from-green-500 to-teal-600" },
];

type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize all students as unmarked
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    mockStudents.reduce((acc, student) => ({ ...acc, [student.id]: "unmarked" }), {})
  );

  // Stats calculation
  const stats = {
    present: Object.values(attendance).filter(s => s === "present").length,
    absent: Object.values(attendance).filter(s => s === "absent").length,
    late: Object.values(attendance).filter(s => s === "late").length,
    unmarked: Object.values(attendance).filter(s => s === "unmarked").length,
  };

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAll = (status: AttendanceStatus) => {
    const newAttendance: Record<string, AttendanceStatus> = {};
    mockStudents.forEach(s => { newAttendance[s.id] = status; });
    setAttendance(newAttendance);
  };

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate database write
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  // Get current date formatted
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto space-y-8 pb-32">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            Class Attendance
          </h1>
          <div className="flex items-center gap-2 mt-2 text-neutral-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{today} • ECE-401</span>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto bg-neutral-900/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => handleMarkAll("present")}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold bg-white/5 hover:bg-green-500/20 hover:text-green-400 text-neutral-300 transition-colors"
          >
            Mark All Present
          </button>
          <button 
            onClick={() => handleMarkAll("unmarked")}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      {/* --- AI BEHAVIORAL INSIGHT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-md"
      >
        <div className="p-2 bg-blue-500/20 rounded-full mt-0.5">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-100 flex items-center gap-2">
            AI Attendance Insight
          </h3>
          <p className="text-sm text-blue-200/70 mt-1 leading-relaxed">
            <strong className="text-white">Amit Kalita</strong> and <strong className="text-white">Karan Varma</strong> have a 75% probability of being late today based on historical Friday patterns. Their "At Risk" academic status correlates highly with this absenteeism.
          </p>
        </div>
      </motion.div>

      {/* --- STATS & SEARCH --- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex flex-col px-5 py-2.5 bg-neutral-900/50 border border-white/5 rounded-xl min-w-[100px]">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Present</span>
            <span className="text-xl font-black text-green-400">{stats.present}</span>
          </div>
          <div className="flex flex-col px-5 py-2.5 bg-neutral-900/50 border border-white/5 rounded-xl min-w-[100px]">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Late</span>
            <span className="text-xl font-black text-yellow-400">{stats.late}</span>
          </div>
          <div className="flex flex-col px-5 py-2.5 bg-neutral-900/50 border border-white/5 rounded-xl min-w-[100px]">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Absent</span>
            <span className="text-xl font-black text-red-400">{stats.absent}</span>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Find student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/40 border border-white/10 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm shadow-inner"
          />
        </div>
      </div>

      {/* --- ATTENDANCE LIST --- */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredStudents.map((student, i) => {
            const status = attendance[student.id];
            
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border backdrop-blur-md transition-all ${
                  status === "present" ? "bg-green-500/5 border-green-500/20" :
                  status === "absent" ? "bg-red-500/5 border-red-500/20" :
                  status === "late" ? "bg-yellow-500/5 border-yellow-500/20" :
                  "bg-neutral-900/40 border-white/5 hover:bg-white/[0.02]"
                }`}
              >
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner bg-gradient-to-br ${student.avatarColor}`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{student.name}</div>
                    <div className="text-xs text-neutral-500">{student.id} • {student.email}</div>
                  </div>
                  {(student.name === "Amit Kalita" || student.name === "Karan Varma") && (
                     <AlertCircle className="w-4 h-4 text-orange-500 ml-2 animate-pulse" title="AI Flagged" />
                  )}
                </div>

                {/* Custom Segmented Control */}
                <div className="flex bg-neutral-950 p-1 rounded-xl border border-white/10 shrink-0">
                  <button
                    onClick={() => handleStatusChange(student.id, "present")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      status === "present" ? "bg-green-500/20 text-green-400 shadow-[inset_0_0_8px_rgba(34,197,94,0.3)]" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Present
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "late")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      status === "late" ? "bg-yellow-500/20 text-yellow-400 shadow-[inset_0_0_8px_rgba(234,179,8,0.3)]" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "absent")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      status === "absent" ? "bg-red-500/20 text-red-400 shadow-[inset_0_0_8px_rgba(239,68,68,0.3)]" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" /> Absent
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --- FLOATING SAVE BAR --- */}
      <AnimatePresence>
        {stats.unmarked < mockStudents.length && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-0 right-0 md:left-64 flex justify-center z-50 px-4"
          >
            <div className="bg-neutral-900 border border-white/10 shadow-2xl rounded-2xl p-2 flex items-center gap-4 backdrop-blur-xl">
              <div className="px-4 text-sm font-medium text-neutral-300 hidden sm:block">
                <span className="text-white font-bold">{mockStudents.length - stats.unmarked}</span> / {mockStudents.length} marked
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
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                ) : isSuccess ? (
                  <><Check className="w-4 h-4" /> Recorded!</>
                ) : (
                  <><Save className="w-4 h-4" /> Submit Register</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}