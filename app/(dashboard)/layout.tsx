"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SidebarContent from "@/app/components/layout/SidebarContent";
import {
  BrainCircuit,
  LayoutDashboard,
  Map,
  Camera,
  Users,
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Instantly infer the role based on the URL for the demo environment
  const isTeacher = pathname.includes("/teacher");

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Role-Based Navigation Configuration
  const studentNav = [
    { name: "Diagnostic Overview", href: "/student", icon: LayoutDashboard },
    { name: "Academic GPS", href: "/student/gps", icon: Map },
    { name: "Doubt Tutor (Vision)", href: "/student/tutor", icon: Camera },
  ];

  const teacherNav = [
    { name: "Risk Radar", href: "/teacher", icon: AlertTriangle },
    { name: "Class Roster", href: "/teacher/roster", icon: Users },
  ];

  const navItems = isTeacher ? teacherNav : studentNav;


  return (
    <div className="flex h-screen bg-neutral-950 font-sans overflow-hidden">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:block w-64 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-4">
        <div className="flex items-center">
          <BrainCircuit className="w-6 h-6 text-blue-400 mr-2" />
          <span className="font-bold text-white tracking-tight">EduOracle</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-white/5 rounded-lg border border-white/10 text-white">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-sm z-50 shadow-2xl">
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-black/50 rounded-full border border-white/10 text-white hover:bg-white/10 backdrop-blur-md">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full pt-16 md:pt-0 overflow-y-auto">
        {/* Background ambient glow matching the login screen */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none fixed" />

        {/* Children (The specific page content) */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </main>
    </div>
  );
}
