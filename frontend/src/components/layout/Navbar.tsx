"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { CalendarDays, ChevronRight, LayoutDashboard, LogOut, Menu, Settings, UserCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_KEYS, clearSession } from "@/lib/auth";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";
import { LanguageToggle } from "@/lib/i18n";

const navLinks = [
  { name: "Giới thiệu", href: "/about" },
  { name: "Dịch vụ", href: "/services" },
  { name: "Nha sĩ", href: "/doctors" },
  { name: "Kiến thức", href: "/knowledge" },
  { name: "Liên hệ", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useLocalStorageValue(AUTH_KEYS.name);
  const currentRole = useLocalStorageValue(AUTH_KEYS.role);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearSession();
    setMobileOpen(false);
    router.push("/login");
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 18));

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      >
        <div className={`absolute inset-0 -z-10 transition-all duration-500 ${
          scrolled
            ? "border-b border-slate-200/60 bg-white/85 shadow-lg shadow-blue-900/6 backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/85"
            : "border-b border-white/10 bg-white/30 backdrop-blur-md dark:bg-slate-950/30"
        }`} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/" className="relative block h-16 w-44">
                <Image src="/pic/logo_smilee_ai_transparent.png" alt="SMILEE Logo" fill className="object-contain object-left" priority />
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 text-sm font-bold tracking-wide transition-colors ${
                      active
                        ? "text-blue-600 dark:text-cyan-400"
                        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-3 md:flex">
              <LanguageToggle compact />
              {["ADMIN", "RECEPTIONIST", "DOCTOR"].includes(currentRole as string) && (
                <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300" asChild>
                  <Link href="/admin">
                    <LayoutDashboard className="mr-1.5 h-4 w-4" />
                    Quản trị
                  </Link>
                </Button>
              )}
              {currentUser ? (
                <>
                  <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300" asChild>
                    <Link href="/pro5">
                      <UserCircle2 className="mr-1.5 h-4 w-4" />
                      {currentUser.split(" ").pop()}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300" asChild>
                    <Link href="/settings">
                      <Settings className="mr-1.5 h-4 w-4" />
                      Cài đặt
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <LogOut className="mr-1.5 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
              )}

              <Button
                className="h-10 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 hover:shadow-lg"
                asChild
              >
                <Link href="/booking">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  Đặt lịch
                  <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 md:hidden"
              aria-label="Mở menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 flex h-full w-[300px] flex-col bg-white p-6 shadow-2xl dark:bg-slate-950"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-black text-slate-900 dark:text-white">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Đóng menu" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              <div className="mb-3 px-4">
                <LanguageToggle />
              </div>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-cyan-400"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              {["ADMIN", "RECEPTIONIST", "DOCTOR"].includes(currentRole as string) && (
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href="/admin" onClick={() => setMobileOpen(false)}>Quản trị</Link>
                </Button>
              )}
              {currentUser ? (
                <>
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    <Link href="/pro5" onClick={() => setMobileOpen(false)}>Hồ sơ cá nhân</Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    <Link href="/settings" onClick={() => setMobileOpen(false)}>Cài đặt</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Đăng nhập</Link>
                </Button>
              )}
              <Button className="w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white hover:opacity-90" asChild>
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Đặt lịch ngay
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
