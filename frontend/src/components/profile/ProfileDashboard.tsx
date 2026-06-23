"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_KEYS } from "@/lib/auth";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";

const appointments = [
  { service: "Khám tổng quát", date: "22/06/2026", time: "09:00", doctor: "BS. Tuấn", status: "Đã xác nhận" },
  { service: "Tẩy trắng răng", date: "28/06/2026", time: "14:30", doctor: "BS. Trang", status: "Chờ xác nhận" },
];

const treatmentRecords = [
  { title: "Cạo vôi răng định kỳ", date: "12/06/2026", note: "Nướu ổn định, hẹn tái khám sau 6 tháng." },
  { title: "Tư vấn niềng răng", date: "04/05/2026", note: "Đã chụp phim và lên kế hoạch điều trị sơ bộ." },
];

export function ProfileDashboard() {
  const name = useLocalStorageValue(AUTH_KEYS.name) ?? "Khách hàng SMILEE";
  const initials = useMemo(() => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }, [name]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-6 bg-blue-600 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <motion.div whileHover={{ scale: 1.04, rotate: 2 }} className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-3xl font-black shadow-inner ring-1 ring-white/25">
                {initials}
              </motion.div>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                  <Sparkles className="h-4 w-4" />
                  Hồ sơ cá nhân
                </div>
                <h1 className="text-3xl font-extrabold md:text-4xl">{name}</h1>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-blue-50">
                  Theo dõi lịch hẹn, hồ sơ điều trị và thông tin liên hệ trong một trang.
                </p>
              </div>
            </div>
            <Button asChild className="h-12 rounded-xl bg-white px-6 font-bold text-blue-700 hover:bg-blue-50">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5" />
                Đặt lịch mới
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[320px_1fr]">
            <aside className="space-y-4">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
                  <UserCircle2 className="h-5 w-5 text-blue-600" />
                  Thông tin
                </h2>
                <div className="mt-5 space-y-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-blue-600" /> 0900 000 000</p>
                  <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-blue-600" /> smilee.customer@email.com</p>
                  <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-blue-600" /> TP. Hồ Chí Minh</p>
                </div>
              </section>

              <section className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300">
                <h2 className="flex items-center gap-2 font-extrabold">
                  <ShieldCheck className="h-5 w-5" />
                  Tài khoản đã xác thực
                </h2>
                <p className="mt-2 text-sm font-medium leading-6">Thông tin hồ sơ đã sẵn sàng để lễ tân và bác sĩ hỗ trợ khi bạn đặt lịch.</p>
              </section>
            </aside>

            <main className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  [CalendarDays, "2", "Lịch hẹn"],
                  [FileText, "2", "Hồ sơ"],
                  [CheckCircle2, "1", "Hoàn thành"],
                ].map(([Icon, value, label]) => (
                  <motion.section key={String(label)} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <p className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{String(value)}</p>
                    <p className="text-sm font-bold text-slate-500">{String(label)}</p>
                  </motion.section>
                ))}
              </div>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="font-extrabold text-slate-900 dark:text-white">Lịch hẹn gần đây</h2>
                <div className="mt-4 space-y-3">
                  {appointments.map((item) => (
                    <article key={`${item.service}-${item.date}`} className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.service}</h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">{item.date} lúc {item.time} • {item.doctor}</p>
                      </div>
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                        <Clock className="h-4 w-4" />
                        {item.status}
                      </span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="font-extrabold text-slate-900 dark:text-white">Hồ sơ điều trị</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {treatmentRecords.map((item) => (
                    <article key={item.title} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                      <p className="text-xs font-bold uppercase text-blue-600">{item.date}</p>
                      <h3 className="mt-2 font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.note}</p>
                    </article>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
