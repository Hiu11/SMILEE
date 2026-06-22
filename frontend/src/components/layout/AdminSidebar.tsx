"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";
import { clearSession } from "@/lib/auth";

const sidebarLinks = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { name: "Lịch hẹn", href: "/admin/appointments", icon: CalendarDays },
  { name: "Bệnh nhân", href: "/admin/patients", icon: Users },
  { name: "Bác sĩ", href: "/admin/doctors", icon: Stethoscope },
  { name: "Tài khoản", href: "/admin/accounts", icon: Users },
  { name: "Dịch vụ", href: "/admin/services", icon: ClipboardList },
  { name: "Hồ sơ bệnh án", href: "/admin/records", icon: FileText },
  { name: "Điều trị", href: "/admin/treatments", icon: Syringe },
  { name: "Hóa đơn", href: "/admin/invoices", icon: BadgeDollarSign },
  { name: "Kho thuốc & vật tư", href: "/admin/inventory", icon: Package },
  { name: "Hỗ trợ", href: "/admin/support", icon: LifeBuoy },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:flex">
      <div className="flex h-20 items-center border-b border-slate-200 px-4 dark:border-slate-800">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative h-16 w-56 overflow-hidden">
          <Link href="/" className="block h-full w-full">
            <Image src="/pic/logo_smilee.png" alt="SMILEE" fill className="object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-200 scale-[1.3] origin-left" priority />
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Quản lý chung</p>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400"
                      : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  <link.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                  {link.name}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <button
          onClick={() => {
            clearSession();
            window.location.href = "/";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
