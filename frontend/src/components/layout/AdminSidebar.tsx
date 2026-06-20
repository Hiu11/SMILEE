"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Stethoscope, 
  Settings, 
  LogOut,
  Package
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { name: "Lịch hẹn", href: "/admin/appointments", icon: CalendarDays },
  { name: "Bệnh nhân", href: "/admin/patients", icon: Users },
  { name: "Bác sĩ", href: "/admin/doctors", icon: Stethoscope },
  { name: "Kho thuốc & Vật tư", href: "/admin/inventory", icon: Package },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 hidden md:flex flex-col shrink-0">
      <div className="h-20 flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="relative h-16 w-56 overflow-hidden">
          <Image src="/pic/logo_smilee.png" alt="SMILEE" fill className="object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-200 scale-[1.3] origin-left" priority />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Quản lý chung
        </p>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 font-bold" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white font-medium"
                }`}>
                  <link.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                  {link.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 pb-16 lg:pb-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => {
            localStorage.removeItem('currentUser');
            window.location.href = '/';
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
