"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUp, Search, Wand2, FileText, X, ArrowLeft, Loader2, BrainCircuit, Target, Sparkles 
} from "lucide-react";
import Link from "next/link";
import { predictExamFromFilesAction } from "@/actions/student.actions";

export default function ExamOraclePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Limit to 3 files max
      if (files.length + newFiles.length > 3) {
        alert("You can only upload a maximum of 3 question papers.");
        return;
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, idx) => idx !== indexToRemove));
  };

  const handlePredict = async () => {
    if (files.length === 0) return;
    setIsAnalyzing(true);
    setPrediction(null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await predictExamFromFilesAction(formData);
      if (res.success && res.data) {
        setPrediction(res.data);
      } else {
        alert("Failed to analyze files. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 lg:p-10 font-sans overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 relative z-10">
        <Link href="/student" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-blue-400" /> Exam Oracle
        </h1>
        <p className="text-neutral-400 mt-2">Upload up to 3 past question papers. Our AI will analyze the patterns and predict your next exam.</p>
      </motion.header>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: UPLOAD ZONE */}
          {!isAnalyzing && !prediction && (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              
              {/* Dropzone */}
              <div className="bg-black/40 border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-3xl p-12 text-center transition-colors relative group">
                <input 
                  type="file" 
                  multiple 
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                  disabled={files.length >= 3}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileUp className="w-10 h-10 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Drop Past Papers Here</h3>
                    <p className="text-neutral-400 mt-1">Supports PDF & Images (Max 3 files)</p>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Files Ready for Analysis ({files.length}/3)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {files.map((f, idx) => (
                      <div key={idx} className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                          <span className="text-sm text-neutral-300 truncate">{f.name}</span>
                        </div>
                        <button onClick={() => removeFile(idx)} className="text-neutral-500 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handlePredict}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                  >
                    <Search className="w-5 h-5" /> Run Predictive Analysis
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STATE 2: LOADING */}
          {isAnalyzing && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32 text-center">
              <div className="relative mb-8">
                <Loader2 className="w-20 h-20 text-blue-500 animate-spin" />
                <BrainCircuit className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Synthesizing Exam Patterns...</h2>
              <p className="text-neutral-400 max-w-md">The Oracle is cross-referencing topics, extracting historical weightages, and calculating mathematical probabilities for your next paper.</p>
            </motion.div>
          )}

          {/* STATE 3: RESULTS */}
          {prediction && !isAnalyzing && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-blue-500/10">
                  <Wand2 className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-4 h-4" /> Oracle Insight
                  </div>
                  <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">
                    "{prediction.analysisSummary}"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" /> Highly Probable Questions
                </h3>
                <div className="space-y-4">
                  {prediction.predictedQuestions.map((pq: any, idx: number) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{pq.topic}</span>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          pq.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          pq.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {pq.difficulty}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-medium text-white mb-4 leading-relaxed">{pq.question}</h4>
                      
                      <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-sm text-neutral-400">
                        <strong className="text-purple-400 mr-2">Why this question?</strong>
                        {pq.rationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { setPrediction(null); setFiles([]); }} 
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all"
              >
                Scan Different Papers
              </button>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}