import React from "react";
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
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-violet-500/30 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <BrainCircuit className="w-6 h-6 text-violet-500" />
            <span>
              EduOracle <span className="text-violet-500">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#platform" className="hover:text-white transition-colors">
              Platform Capabilities
            </a>
            <a
              href="#intelligence"
              className="hover:text-white transition-colors"
            >
              Core Intelligence
            </a>
            <a href="#solutions" className="hover:text-white transition-colors">
              For Institutions
            </a>
          </div>
          <button className="bg-white text-slate-950 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
            Request Demo
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>The Next Generation of Learning Analytics</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight max-w-4xl">
          From Data to Destiny. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
            AI that Shapes Academic Success.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
          Transform reactive education into proactive intervention. EduOracle AI
          uses predictive modeling and cognitive mapping to eliminate learning
          gaps before they impact outcomes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]">
            Explore Platform <Map className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all">
            View Case Studies <LineChart className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* PROPRIETARY INTELLIGENCE (Enterprise Features) */}
      <section
        id="intelligence"
        className="py-24 px-6 max-w-7xl mx-auto z-10 relative"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Enterprise-Grade AI Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Advanced predictive engines designed to scale across school
            districts, coaching networks, and personalized learning
            environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "AI Learning DNA",
              icon: <BrainCircuit className="w-6 h-6 text-violet-400" />,
              desc: "A comprehensive cognitive blueprint that maps how individual students absorb, retain, and apply complex information.",
            },
            {
              title: "Academic GPS",
              icon: <Map className="w-6 h-6 text-blue-400" />,
              desc: "Dynamic, turn-by-turn study navigation that recalculates learning routes instantly when knowledge gaps are detected.",
            },
            {
              title: "Digital Twin Simulation",
              icon: <Repeat className="w-6 h-6 text-emerald-400" />,
              desc: "Probabilistic exam simulation environments to test student readiness against thousands of potential future papers.",
            },
            {
              title: "Concept Dependency Graph",
              icon: <GitMerge className="w-6 h-6 text-pink-400" />,
              desc: "Visual, AI-generated mapping that identifies exactly which foundational concepts a student needs to master next.",
            },
            {
              title: "Academic Risk Radar",
              icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
              desc: "An early-warning detection system for educators and parents, flagging downward trajectories before they manifest as failure.",
            },
            {
              title: "Forgetting Curve Engine",
              icon: <Activity className="w-6 h-6 text-amber-400" />,
              desc: "Automated spaced-repetition algorithms that optimize study time based on individual cognitive decay models.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE ECOSYSTEM (Bento Grid) */}
      <section
        id="platform"
        className="py-24 px-6 max-w-7xl mx-auto z-10 relative border-t border-white/5"
      >
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            A Unified Educational Ecosystem
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Bridging the gap between student effort, parental visibility, and
            institutional performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Card */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-violet-900/20 to-slate-900 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full" />
            <LineChart className="w-10 h-10 text-violet-400 mb-6" />
            <h3 className="text-2xl font-bold mb-3">
              Institutional Intelligence Dashboard
            </h3>
            <p className="text-slate-400 max-w-md mb-8">
              Seamlessly integrate with existing School ERPs to unlock real-time
              insights into micro-skill mastery, classroom effort vs. result
              ratios, and overall academic health.
            </p>
            <ul className="space-y-3">
              {[
                "Secure ERP Data Aggregation",
                "Cohort Performance Analytics",
                "Concept Difficulty Index Mapping",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Small Cards */}
          <div className="flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex-1">
              <BrainCircuit className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Always-On Assistance</h3>
              <p className="text-slate-400 text-sm">
                Deploy sophisticated AI Tutors for students and intelligent
                workflow assistants for educators.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex-1">
              <Network className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">
                Collaborative Engagement
              </h3>
              <p className="text-slate-400 text-sm">
                Foster a culture of consistent learning through structured peer
                networks and dynamic progression systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="solutions" className="py-24 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-tr from-violet-600/20 via-blue-600/20 to-slate-900 border border-violet-500/20 rounded-[3rem] p-12 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Partner with EduOracle AI to deploy predictive learning models in
            your classrooms. Schedule a technical consultation to see the
            Academic GPS and Concept Dependency Engine in action.
          </p>
          <button className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-transform hover:scale-105 inline-flex items-center gap-2">
            Schedule a Consultation <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950/50 mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-300">
            <BrainCircuit className="w-5 h-5 text-violet-500" />
            <span>EduOracle AI</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduOracle AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              API Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
