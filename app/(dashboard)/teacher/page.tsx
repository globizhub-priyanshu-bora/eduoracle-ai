"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Target, Users } from "lucide-react";
import { mockTeacherRadar } from "@/lib/fallbacks/mockData";

export default function TeacherDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulating the "4-Second Magic Trick" from the PRD
  const triggerIntervention = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Mock API Intercept: 1-Click Intervention Strategy Generated for 3 Silent Strugglers.");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 font-sans">
      {/* Header */}
      <header className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Educator Command Center</h1>
          <p className="text-neutral-400 mt-1">Class: CS-401 Advanced Systems (ISRO Prep)</p>
        </div>
        
        {/* The 1-Click Intervention Button */}
        <button 
          onClick={triggerIntervention}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-5 py-3 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          {isGenerating ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Generating Strategy...</>
          ) : (
            <><Target className="w-5 h-5" /> 1-Click Intervention Plan</>
          )}
        </button>
      </header>

      {/* Heatmap Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold">Future Failure Heatmap</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-950 px-3 py-1.5 rounded-full border border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span>3 Silent Strugglers Detected</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Current Grade</th>
                <th className="p-4 font-medium">AI Predicted Finals</th>
                <th className="p-4 font-medium">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockTeacherRadar.map((student) => (
                <tr 
                  key={student.id} 
                  className={`transition-colors hover:bg-gray-800/30 ${student.silentStruggler ? 'bg-red-950/10' : ''}`}
                >
                  <td className="p-4 font-medium flex items-center gap-3">
                    {student.name}
                    {student.silentStruggler && (
                      <span className="flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        <AlertTriangle className="w-3 h-3" /> Silent Struggler
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">{student.currentGrade}</td>
                  <td className={`p-4 font-bold ${student.predictedOutcome === 'Fail' ? 'text-red-400' : 'text-green-400'}`}>
                    {student.predictedOutcome}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                      ${student.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                        student.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                        student.riskLevel === 'Severe' ? 'bg-red-900/40 text-red-500 border border-red-700/50' :
                        'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                    >
                      {student.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}