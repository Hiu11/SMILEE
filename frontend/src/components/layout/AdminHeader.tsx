"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, ExternalLink, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const [userName, setUserName] = useState("Quản trị viên");

  useEffect(() => {
    const savedName = localStorage.getItem("currentUser");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

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
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Tổng quan" title="Tổng quan" asChild>
          <Link href="/admin">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
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
            <p className="mt-1 text-xs text-slate-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
