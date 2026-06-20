"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const [userName, setUserName] = useState("Quản trị viên");

  useEffect(() => {
    const savedName = localStorage.getItem('currentUser');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Lấy các chữ cái đầu của tên (ví dụ: "Cinema Sky" -> "CS")
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu" title="Mở menu">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative hidden sm:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm bệnh nhân, lịch hẹn..." 
            className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors" aria-label="Notifications" title="Thông báo">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
            {getInitials(userName)}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-bold text-slate-900 dark:text-white leading-none">{userName}</p>
            <p className="text-slate-500 mt-1 text-xs">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
