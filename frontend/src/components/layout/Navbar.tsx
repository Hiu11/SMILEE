"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AUTH_KEYS } from "@/lib/auth";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";

const navLinks = [
  { name: "Giới thiệu", href: "/about" },
  { name: "Dịch vụ", href: "/services" },
  { name: "Nha sĩ", href: "/doctors" },
  { name: "Kiến thức", href: "/knowledge" },
  { name: "Liên hệ", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const currentUser = useLocalStorageValue(AUTH_KEYS.name);
  const currentRole = useLocalStorageValue(AUTH_KEYS.role);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative h-20 w-60 overflow-hidden">
            <Link href="/" className="block h-full w-full">
              <Image src="/pic/logo_smilee.png" alt="SMILEE Logo" fill className="scale-[1.3] object-contain origin-left" priority />
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-bold transition-colors ${
                    active ? "text-blue-600 dark:text-cyan-400" : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400"
                  }`}
                >
                  {link.name}
                  {active ? (
                    <motion.span
                      layoutId="main-nav-indicator"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-600 dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {currentRole === "ADMIN" ? (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Quản trị
                </Link>
              </Button>
            ) : null}
            {currentUser ? (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/pro5">{currentUser.split(" ").pop()}</Link>
              </Button>
            ) : (
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 hover:text-blue-700" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
            <Button className="rounded-full bg-blue-600 px-6 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700" asChild>
              <Link href="/booking">
                <CalendarDays className="mr-2 h-4 w-4" />
                Đặt lịch
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Mở menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white dark:bg-slate-950">
                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                <div className="flex h-full flex-col gap-4 pt-10">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="border-b border-slate-100 py-3 text-lg font-bold text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-auto space-y-3 pb-6">
                    {currentRole === "ADMIN" ? (
                      <Button variant="outline" className="w-full rounded-xl" asChild>
                        <Link href="/admin">Quản trị</Link>
                      </Button>
                    ) : null}
                    <Button variant="outline" className="w-full rounded-xl" asChild>
                      <Link href={currentUser ? "/pro5" : "/login"}>{currentUser ? "Hồ sơ cá nhân" : "Đăng nhập"}</Link>
                    </Button>
                    <Button className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700" asChild>
                      <Link href="/booking">Đặt lịch</Link>
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
