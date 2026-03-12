"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  Briefcase, 
  Link as LinkIcon, 
  MessageSquare,
  CheckCircle2,
  Code2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Full Stack Developer",
    portfolio: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Construct the email subject
    const subject = encodeURIComponent(`🚀 New Contributor Application: ${formData.name} (${formData.role})`);
    
    // 2. Construct the email body with proper line breaks
    const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}
Role/Expertise: ${formData.role}
Portfolio/GitHub: ${formData.portfolio}

Message from Applicant:
${formData.message}

-----------------------------------
Sent via EduOracle AI Contact Form
`);

    // 3. Trigger the mailto link to open the user's default email client
    window.location.href = `mailto:admin@globizhub.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Left Side: Copy & Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit text-sm md:text-base mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wider uppercase mb-6">
              <Code2 className="w-4 h-4" /> Open Source & Freelance
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Build the future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Cognitive AI.
              </span>
            </h1>
          </div>
          
          <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
            We are actively looking for passionate developers, AI engineers, and UI/UX designers to contribute to EduOracle. Drop your details below and our team at <strong className="text-white">Globizhub</strong> will reach out.
          </p>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neutral-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Remote Roles</span>
            <span className="flex items-center gap-2 sm:ml-4"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Project-based Payouts</span>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" /> Primary Expertise
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                >
                  <option>Full Stack Developer</option>
                  <option>Frontend / UI Engineer</option>
                  <option>AI / Python Engineer</option>
                  <option>UI/UX Designer</option>
                  <option>Technical Content Writer</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5" /> GitHub / Portfolio
                </label>
                <input
                  type="url"
                  required
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> How can you contribute?
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                placeholder="I am highly skilled in Next.js and Go, and I'd love to help build out..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              Open Email Client
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}