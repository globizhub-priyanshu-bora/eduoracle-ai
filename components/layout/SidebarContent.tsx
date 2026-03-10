"use client";

import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";

export default function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacher = pathname?.includes("/teacher");

  const studentNav = [
    { name: "Diagnostic Overview", href: "/student", icon: LayoutDashboard },
    { name: "Academic GPS", href: "/student/gps", icon: Map },
    { name: "Doubt Tutor (Vision)", href: "/student/tutor", icon: Camera },
    { name: "My Exams", href: "/student/exams", icon: Book },
    { name: "Career Goals", href: "/student/career-goals", icon: ChartNoAxesCombinedIcon },
  ];

  const teacherNav = [
    // --- AI & ANALYTICS SECTION ---
    { name: "Risk Radar (AI)", href: "/teacher", icon: AlertTriangle },
    { name: "Performance Insights", href: "/teacher/insights", icon: PieChart },
    
    // --- CLASS MANAGEMENT SECTION ---
    { name: "Class Roster", href: "/teacher/roster", icon: Users },
    { name: "Add Student", href: "/teacher/add-student", icon: UserPlus },
    { name: "Attendance", href: "/teacher/attendance", icon: CheckSquare },
    
    // --- ACADEMICS SECTION ---
    { name: "Exam Scores", href: "/teacher/exam-scores", icon: ClipboardList },
    { name: "Assignments", href: "/teacher/assignments", icon: FileSpreadsheet },
    { name: "Final Results", href: "/teacher/results", icon: GraduationCap },
    
    // --- COMMUNICATION & SCHEDULE ---
    { name: "Intervention Hub", href: "/teacher/interventions", icon: MessageSquare },
    { name: "Schedule", href: "/teacher/schedule", icon: CalendarDays },
  ];

  const navItems = isTeacher ? teacherNav : studentNav;

  return (
    <div className="flex flex-col h-full bg-neutral-950/80 backdrop-blur-xl border-r border-white/10 text-neutral-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <BrainCircuit className="w-6 h-6 text-blue-400 mr-2" />
        <span className="font-bold text-lg text-white tracking-tight">
          EduOracle AI
        </span>
      </div>

      {/* Dynamic Role Badge */}
      <div className="px-6 py-4">
        <div
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 inline-block rounded-md border shadow-sm transition-all ${
            isTeacher
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
          }`}
        >
          {isTeacher ? "Educator Mode" : "Student Mode"}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar pb-6">
        {isTeacher && (
          <p className="px-3 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-3 mt-2">
            Control Center
          </p>
        )}
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
                isActive
                  ? "bg-white/10 text-white shadow-lg border border-white/10"
                  : "hover:bg-white/5 hover:text-white text-neutral-400"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive
                    ? isTeacher
                      ? "text-purple-400"
                      : "text-blue-400"
                    : "text-neutral-500 group-hover:text-neutral-300"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Demo Controls */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm font-medium hover:bg-white/5 text-neutral-500 hover:text-white group">
          <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          Settings
        </button>
        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm font-medium hover:bg-red-500/10 text-neutral-500 hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          Exit Demo
        </button>
      </div>
    </div>
  );
}
