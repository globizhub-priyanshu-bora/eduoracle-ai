import React from 'react';
import { 
  BrainCircuit, 
  Map, 
  GitMerge, 
  Activity, 
  ShieldAlert, 
  Repeat, 
  ChevronRight, 
  Sparkles, 
  LineChart,
  Network,
  Users,
  Lock,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-violet-500/30 overflow-hidden">
      
      {/* Advanced Ambient Background */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[80%] h-[20%] bg-emerald-500/5 rounded-[100%] blur-[100px] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span>EduOracle <span className="text-slate-400 font-medium">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          </div>
          <button className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95">
            Request Demo
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-medium mb-8 shadow-2xl backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          EduOracle Enterprise v2.0 is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] max-w-5xl">
          Don't Predict Grades. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
            Shape the Outcome.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          The first predictive educational ecosystem. We analyze concept dependencies and cognitive mapping to eliminate learning gaps before they become academic failures.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20">
          <button className="flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-100 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Deploy Platform <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all">
            Explore Architecture
          </button>
        </div>

        {/* HERO UI MOCKUP (Show, Don't Tell) */}
        <div className="w-full max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#0a0f24] border border-slate-800 rounded-2xl p-6 shadow-2xl text-left flex flex-col md:flex-row gap-6">
            {/* Mock Dashboard: Risk Radar */}
            <div className="flex-1 bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-slate-300">AI Risk Radar</span>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex items-end gap-4 mb-2">
                <span className="text-3xl font-bold">Physics</span>
                <span className="text-sm text-red-400 flex items-center mb-1"><TrendingDown className="w-3 h-3 mr-1"/> Downward Trajectory</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">Probability of failure in upcoming board exam: <span className="text-red-400 font-bold">78%</span></p>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-3/4"></div>
              </div>
            </div>
            
            {/* Mock Dashboard: Academic GPS */}
            <div className="flex-1 bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-slate-300">Academic GPS Intervention</span>
                <Map className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded bg-blue-500/10 border border-blue-500/20">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs text-blue-100">Rerouting study plan...</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-slate-800/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-xs text-slate-300">Assigning concept: <span className="font-semibold text-white">Kinematics</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="py-10 border-y border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500 font-medium tracking-widest uppercase mb-6">Designed for scale across high-performance institutions</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
            {/* Placeholders for real logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Users className="w-6 h-6"/> EduGroup</div>
            <div className="flex items-center gap-2 font-bold text-xl"><LineChart className="w-6 h-6"/> Apex Analytics</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Lock className="w-6 h-6"/> SecureEd ERP</div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section id="intelligence" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Enterprise Intelligence Engines</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Predictive models designed to scale from a single classroom to a national school district.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "AI Learning DNA", icon: <BrainCircuit className="w-6 h-6 text-violet-400"/>, desc: "A deep cognitive blueprint mapping exactly how individual students absorb and apply complex information over time." },
            { title: "Academic GPS", icon: <Map className="w-6 h-6 text-blue-400"/>, desc: "Dynamic study navigation that recalculates daily learning routes instantly when knowledge gaps are detected." },
            { title: "Digital Twin Exams", icon: <Repeat className="w-6 h-6 text-emerald-400"/>, desc: "Probabilistic simulation environments testing student readiness against thousands of generated future papers." },
            { title: "Concept Dependency", icon: <GitMerge className="w-6 h-6 text-pink-400"/>, desc: "Visual, AI-generated graphs mapping precisely which foundational concepts are missing for advanced topics." },
            { title: "Academic Risk Radar", icon: <ShieldAlert className="w-6 h-6 text-red-400"/>, desc: "Early-warning detection systems alerting educators to downward trajectories before they manifest as failure." },
            { title: "Forgetting Curve AI", icon: <Activity className="w-6 h-6 text-amber-400"/>, desc: "Automated spaced-repetition models optimizing study time based on individual memory decay algorithms." }
          ].map((feature, idx) => (
            <div key={idx} className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-600 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-violet-500/10 transition-colors duration-500"></div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 group-hover:border-violet-500/30 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="solutions" className="py-24 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto bg-slate-900/50 border border-slate-800 rounded-[3rem] p-12 lg:p-20 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Transform Your Institution?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Partner with EduOracle AI to deploy predictive learning models in your classrooms. See the Academic GPS and Concept Dependency Engine in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-transform hover:scale-105 inline-flex items-center justify-center gap-2">
              Schedule Consultation <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-slate-800 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-colors inline-flex items-center justify-center gap-2">
              Read API Docs
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 bg-[#020617] mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-300">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <BrainCircuit className="w-3 h-3 text-white" />
            </div>
            <span>EduOracle AI</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduOracle AI Technologies.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}