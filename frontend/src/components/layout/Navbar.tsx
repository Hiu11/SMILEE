"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { name: "Giới thiệu", href: "/about" },
  { name: "Dịch vụ", href: "/services" },
  { name: "Nha sĩ", href: "/doctors" },
  { name: "Kiến thức", href: "/knowledge" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('currentUser');
    if (savedName) {
      setCurrentUser(savedName);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 shadow-sm border-b border-slate-200 dark:border-slate-800 transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-20 w-64 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image src="/pic/logo_smilee.png" alt="SMILEE Logo" fill className="object-contain dark:invert scale-[1.3] origin-left" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <Link href="/admin">
                <div className="flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                    {currentUser.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {currentUser.split(' ').pop()}
                  </span>
                </div>
              </Link>
            ) : (
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-cyan-400 dark:hover:bg-cyan-950/30" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
            <Button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 rounded-full px-6 transition-all hover:scale-105">
              Đặt lịch ngay
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/90 backdrop-blur-xl dark:bg-black/90">
                <SheetTitle className="sr-only">Menu Điều Hướng</SheetTitle>
                <div className="flex flex-col h-full pt-10">
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-4 pb-8">
                    {currentUser ? (
                      <Button variant="outline" className="w-full justify-center bg-slate-100 dark:bg-slate-900 border-none" asChild>
                        <Link href="/admin">Vào Dashboard Quản trị</Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full justify-center" asChild>
                        <Link href="/login">Đăng nhập</Link>
                      </Button>
                    )}
                    <Button className="w-full justify-center bg-linear-to-r from-blue-600 to-cyan-500 text-white">
                      Đặt lịch ngay
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
