"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, ExternalLink, LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AUTH_KEYS, clearSession } from "@/lib/auth";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";
import { getSidebarLinks } from "@/components/layout/AdminSidebar";

const roleLabel: Record<string, string> = {
  ADMIN: "Quản trị viên",
  RECEPTIONIST: "Lễ tân",
  DOCTOR: "Bác sĩ",
  CUSTOMER: "Khách hàng",
};

export function AdminHeader() {
  const pathname = usePathname();
  const userName = useLocalStorageValue(AUTH_KEYS.name) ?? "Nhân sự SMILEE";
  const role = useLocalStorageValue(AUTH_KEYS.role);
  const links = getSidebarLinks(role);

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 sm:px-8"
    >
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Mở menu quản trị" title="Menu quản trị">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto bg-white px-4 dark:bg-slate-950">
            <SheetTitle className="pt-2 text-left text-lg font-extrabold">SMILEE Workspace</SheetTitle>
            <nav className="mt-6 space-y-1">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => {
                clearSession();
                window.location.href = "/";
              }}
              className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
          </SheetContent>
        </Sheet>
        <motion.div whileHover={{ scale: 1.02 }} className="relative hidden w-72 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân, lịch hẹn..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-slate-800 dark:bg-slate-900"
          />
        </motion.div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="outline" className="hidden h-10 rounded-full sm:inline-flex" asChild>
          <Link href="/">
            <ExternalLink className="mr-2 h-4 w-4" />
            Trang web
          </Link>
        </Button>
        <motion.div whileHover={{ rotate: -8, scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <Link href="/admin/support" className="relative block rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Thông báo" title="Thông báo">
            <Bell className="h-5 w-5" />
            <motion.span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-950"
              animate={{ scale: [1, 1.55, 1], opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </motion.div>
        <div className="mx-1 h-8 w-px bg-slate-200 dark:bg-slate-800 sm:mx-2" />
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.08, rotate: 4 }} whileTap={{ scale: 0.96 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-cyan-500 font-bold text-white shadow-md">
            {getInitials(userName)}
          </motion.div>
          <div className="hidden text-sm sm:block">
            <p className="font-bold leading-none text-slate-900 dark:text-white">{userName}</p>
            <p className="mt-1 text-xs text-slate-500">{roleLabel[role ?? ""] ?? "Nhân sự"}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
