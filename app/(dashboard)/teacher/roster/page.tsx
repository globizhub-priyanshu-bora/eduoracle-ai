"use client";

import { useState } from "react";
import { 
  Search, Filter, Plus, MoreVertical, Users, 
  BookOpen, Activity, Mail, GraduationCap
} from "lucide-react";

// Mock data strictly matching your Prisma User -> StudentProfile schema
const mockRoster = [
  { id: "S01", name: "Rahul Sharma", email: "rahul.s@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 88, weakSubjects: ["Virtual Memory"] },
  { id: "S02", name: "Priya Patel", email: "priya.p@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 92, weakSubjects: [] },
  { id: "S03", name: "Amit Singh", email: "amit.s@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 45, weakSubjects: ["OS Kernel Space", "Paging"] },
  { id: "S04", name: "Sneha Menon", email: "sneha.m@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 85, weakSubjects: ["Graph Theory"] },
  { id: "S05", name: "Vikram Das", email: "vikram.d@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 55, weakSubjects: ["Concurrency", "Deadlocks"] },
  { id: "S06", name: "Kavita Iyer", email: "kavita.i@gcu.edu", targetExam: "ISRO Scientist 'SC'", healthScore: 42, weakSubjects: ["Multithreading"] },
];

export default function ClassRosterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(mockRoster);

  // Client-side search filtering
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 md:p-10 font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Class Roster
          </h1>
          <p className="text-sm md:text-base text-neutral-400 mt-1">CS-401 Advanced Systems • {students.length} Enrolled Students</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] text-sm">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </header>

      {/* --- SEARCH & UTILITY BAR --- */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-neutral-500" />
        </div>
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-950 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
                <th className="p-4 font-medium">Student Info</th>
                <th className="p-4 font-medium">Target Exam</th>
                <th className="p-4 font-medium">Weak Subjects (Schema Array)</th>
                <th className="p-4 font-medium">Academic Health</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">
                    No students found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-gray-800/30 group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{student.name}</div>
                          <div className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-300">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-neutral-500" />
                        {student.targetExam}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {student.weakSubjects.length > 0 ? (
                          student.weakSubjects.map((sub, idx) => (
                            <span key={idx} className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
                              <BookOpen className="w-3 h-3" /> {sub}
                            </span>
                          ))
                        ) : (
                          <span className="text-neutral-500 text-xs italic">Optimal state</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden min-w-[80px]">
                          <div 
                            className={`h-full rounded-full ${student.healthScore >= 80 ? 'bg-green-500' : student.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${student.healthScore}%` }}
                          />
                        </div>
                        <span className={`font-bold ${student.healthScore >= 80 ? 'text-green-400' : student.healthScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {student.healthScore}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}