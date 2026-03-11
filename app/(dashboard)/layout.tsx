"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SidebarContent from "@/components/layout/SidebarContent";
import { BrainCircuit, Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-neutral-950 font-sans overflow-hidden text-white">
      {/* Desktop Sidebar (Auto-sizing) */}
      <aside className="hidden md:flex flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-950/50 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
        <div className="flex items-center">
          <BrainCircuit className="w-6 h-6 text-blue-500 mr-2" />
          <span className="font-bold text-white tracking-tight">EduGlobiz</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-white/5 rounded-xl border border-white/10 text-white active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay (Fixed X logic) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] z-[70] shadow-2xl"
            >
              {/* Minimalist Close for Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 -right-12 p-2 bg-blue-600 rounded-full text-white shadow-xl"
              >
                <X size={20} />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative h-full pt-16 md:pt-0 overflow-y-auto no-scrollbar">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full min-h-full">{children}</div>
      </main>
    </div>
  );
}
