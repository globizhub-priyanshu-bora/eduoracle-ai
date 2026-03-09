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
} from "lucide-react";

export default function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();

  // Instantly infer the role based on the URL for the demo environment
  const isTeacher = pathname?.includes("/teacher");

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
          className={`text-xs font-bold uppercase tracking-wider px-2 py-1 inline-block rounded-md ${
            isTeacher
              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}>
          {isTeacher ? "Educator Mode" : "Student Mode"}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? "bg-white/10 text-white shadow-sm border border-white/5"
                  : "hover:bg-white/5 hover:text-white"
              }`}>
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? isTeacher
                      ? "text-purple-400"
                      : "text-blue-400"
                    : "text-neutral-500"
                }`}
              />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer / Demo Controls */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium hover:bg-white/5 text-neutral-400 hover:text-white">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium hover:bg-red-500/10 text-neutral-400 hover:text-red-400 mt-1">
          <LogOut className="w-4 h-4" />
          Exit Demo
        </button>
      </div>
    </div>
  );
}
