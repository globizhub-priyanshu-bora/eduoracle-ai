"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  LayoutDashboard,
  Map,
  Camera,
  Users,
  AlertTriangle,
  Settings,
  LogOut,
  Book,
  ChartNoAxesCombinedIcon,
  UserPlus,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  FileSpreadsheet,
  PieChart,
  MessageSquare,
  CalendarDays,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from "lucide-react";

export default function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isTeacher = pathname?.includes("/teacher");

  const studentNav = [
    { name: "Diagnostic Overview", href: "/student", icon: LayoutDashboard },
    { name: "Academic GPS", href: "/student/gps", icon: Map },
    { name: "Doubt Tutor (Vision)", href: "/student/tutor", icon: Camera },
    { name: "My Exams", href: "/student/exams", icon: Book },
    { name: "CGPA Predictor", href: "/student/predictor", icon: GraduationCap },
    {
      name: "Career Goals",
      href: "/student/career-goals",
      icon: ChartNoAxesCombinedIcon,
    },
  ];

  const teacherNav = [
    { name: "Risk Radar (AI)", href: "/teacher", icon: AlertTriangle },
    { name: "Performance Insights", href: "/teacher/insights", icon: PieChart },
    { name: "Student Doubts", href: "/teacher/doubts", icon: HelpCircle },
    { name: "Class Roster", href: "/teacher/roster", icon: Users },
    { name: "Add Student", href: "/teacher/add-student", icon: UserPlus },
    { name: "Attendance", href: "/teacher/attendance", icon: CheckSquare },
    { name: "Exam Scores", href: "/teacher/exam-scores", icon: ClipboardList },
    {
      name: "Assignments",
      href: "/teacher/assignments",
      icon: FileSpreadsheet,
    },
    { name: "Final Results", href: "/teacher/results", icon: GraduationCap },
    {
      name: "Intervention Hub",
      href: "/teacher/interventions",
      icon: MessageSquare,
    },
    { name: "Schedule", href: "/teacher/schedule", icon: CalendarDays },
  ];

  const navItems = isTeacher ? teacherNav : studentNav;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col h-full bg-neutral-950/90 backdrop-blur-2xl border-r border-white/5 text-neutral-400 relative z-50"
      style={{ overflow: "visible" }} // Crucial so tooltips and toggle button don't get cut off
    >
      {/* Desktop Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-3 top-10 z-50 bg-blue-600 text-white rounded-full p-1 border border-white/10 hover:scale-110 transition-transform shadow-lg shadow-blue-500/20"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Header */}
      <div
        className={`h-20 flex items-center ${isCollapsed ? "justify-center" : "px-6"} border-b border-white/5`}
      >
        <div className="relative shrink-0">
          <BrainCircuit className="w-7 h-7 text-blue-500" />
          <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full" />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="ml-3 overflow-hidden whitespace-nowrap"
          >
            <span className="font-bold text-lg text-white tracking-tight block">
              EduGlobiz AI
            </span>
            <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase -mt-1 block">
              {isTeacher ? "Educator" : "Student"}
            </span>
          </motion.div>
        )}
      </div>

      {/* Navigation Links - Brutally killing the scrollbar here */}
      <nav className="flex-1 px-3 space-y-1.5 mt-6 overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center group relative rounded-xl transition-colors ${
                isCollapsed ? "justify-center py-3.5" : "gap-3 px-4 py-3"
              } ${
                isActive
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 hover:text-neutral-200"
              }`}
            >
              {/* Active Accent Pill */}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              )}

              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive
                    ? isTeacher
                      ? "text-purple-400"
                      : "text-blue-400"
                    : "text-neutral-500 group-hover:text-neutral-300"
                }`}
              />

              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide truncate">
                  {item.name}
                </span>
              )}

              {/* Tooltip for Collapsed Mode */}
              {isCollapsed && (
                <div className="absolute left-16 bg-neutral-900 border border-white/10 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-medium shadow-xl">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/5 bg-white/[0.01]">
        <button
          className={`w-full flex items-center text-sm font-medium hover:bg-white/5 text-neutral-500 hover:text-white group rounded-xl transition-colors ${isCollapsed ? "justify-center py-3.5" : "gap-3 px-4 py-3"}`}
        >
          <Settings
            className={`w-5 h-5 shrink-0 group-hover:rotate-90 transition-transform duration-500`}
          />
          {!isCollapsed && <span className="truncate">Settings</span>}
        </button>
        <button
          onClick={() => router.push("/login")}
          className={`w-full flex items-center mt-1 text-sm font-medium hover:bg-red-500/10 text-neutral-500 hover:text-red-400 rounded-xl transition-colors ${isCollapsed ? "justify-center py-3.5" : "gap-3 px-4 py-3"}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="truncate">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
}
