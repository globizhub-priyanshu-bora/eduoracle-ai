'use client';

import React, { useState } from 'react';

interface DigitalTwinProps {
  baseHealth: number;
  baseProbability: number;
  dnaType: string;
}

export default function DigitalTwin({ baseHealth, baseProbability, dnaType }: DigitalTwinProps) {
  const [studyHours, setStudyHours] = useState(2); // Default to 2 hours

  // The "Predictive Magic": dynamically calculate probability based on slider
  const calculatedProbability = Math.min(100, Math.max(0, baseProbability + ((studyHours - 2) * 5)));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-white space-y-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold">Predictive Digital Twin</h2>
        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/50 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          {dnaType}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Health Score (Static) */}
        <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400 text-sm mb-2">Academic Health</p>
          <p className="text-4xl font-bold text-blue-500">{baseHealth}/100</p>
        </div>

        {/* Probability Score (Dynamic) */}
        <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/5 transition-opacity duration-300"></div>
          <p className="text-gray-400 text-sm mb-2">Predicted Exam Probability</p>
          <p className={`text-4xl font-bold transition-colors duration-300 ${calculatedProbability >= 80 ? 'text-green-500' : calculatedProbability >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
            {calculatedProbability}%
          </p>
        </div>
      </div>

      {/* The Interactive Slider */}
      <div className="pt-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Simulate Daily Study Hours</span>
          <span className="font-bold text-white">{studyHours} hrs/day</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="8" 
          step="0.5" 
          value={studyHours}
          onChange={(e) => setStudyHours(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Adjusting hours recalculates your trajectory instantly.
        </p>
      </div>
    </div>
  );
}