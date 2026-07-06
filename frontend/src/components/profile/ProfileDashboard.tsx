"use client";

import { useMemo } from "react";
import Link from "next/link";
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
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_KEYS } from "@/lib/auth";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const appointments = [
  { id: "apt-1", service: "Khám tổng quát", date: "22/06/2026", time: "09:00", doctor: "BS. Tuấn", status: "Đã xác nhận" },
  { id: "apt-2", service: "Tẩy trắng răng", date: "28/06/2026", time: "14:30", doctor: "BS. Trang", status: "Chờ xác nhận" },
];

const treatmentRecords = [
  { id: "tr-1", title: "Cạo vôi răng định kỳ", date: "12/06/2026", note: "Nướu ổn định, hẹn tái khám sau 6 tháng." },
  { id: "tr-2", title: "Tư vấn niềng răng", date: "04/05/2026", note: "Đã chụp phim và lên kế hoạch điều trị sơ bộ." },
];

export function ProfileDashboard() {
  const name = useLocalStorageValue(AUTH_KEYS.name) ?? "Khách hàng SMILEE";
  const initials = useMemo(() => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }, [name]);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pt-20 md:pt-24 lg:pt-28 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10 animate-float" />
        <div className="absolute right-[5%] top-[30%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-600/10 animate-float delay-1000" />
        <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-20" />
      </div>

      <section className="container relative mx-auto px-4 py-8 md:py-10 lg:py-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 shadow-xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
            {/* Header / Banner */}
            <div className="relative grid gap-6 overflow-hidden bg-linear-to-r from-blue-600 to-cyan-500 p-5 md:p-8 lg:p-10 text-white lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="pointer-events-none absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay" />
              <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-white/10 to-transparent" />
              
              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                <Float>
                  <div className="flex h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-3xl md:text-4xl font-black shadow-inner backdrop-blur-md ring-1 ring-white/30">
                    {initials}
                  </div>
                </Float>
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                    <span className="text-cyan-50">Hồ sơ cá nhân</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black">{name}</h1>
                  <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-blue-50/90">
                    Theo dõi lịch hẹn, hồ sơ điều trị và thông tin liên hệ trong một trải nghiệm duy nhất.
                  </p>
                </div>
              </div>
              <div className="relative z-10">
                <Button asChild className="h-12 lg:h-14 rounded-2xl bg-white px-8 text-base lg:text-lg font-bold text-blue-700 shadow-xl shadow-black/10 transition-all hover:-translate-y-1 hover:bg-blue-50">
                  <Link href="/booking">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Đặt lịch mới
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:gap-8 p-5 md:p-8 lg:p-10 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
              {/* Sidebar Info */}
              <aside className="space-y-6">
                <section className="group rounded-3xl border border-slate-200/80 bg-white/80 p-5 md:p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-950/80">
                  <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                    <UserCircle2 className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
                    Thông tin liên hệ
                  </h2>
                  <div className="mt-6 space-y-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 transition group-hover:bg-blue-50/50 dark:bg-slate-900 dark:group-hover:bg-slate-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-cyan-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span className="font-bold">0900 000 000</span>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 transition group-hover:bg-blue-50/50 dark:bg-slate-900 dark:group-hover:bg-slate-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="font-bold">smilee.customer@email.com</span>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 transition group-hover:bg-blue-50/50 dark:bg-slate-900 dark:group-hover:bg-slate-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="font-bold">TP. Hồ Chí Minh</span>
                    </div>
                  </div>
                </section>

                <section className="relative overflow-hidden rounded-3xl border border-green-200/60 bg-linear-to-br from-green-50 to-emerald-50 p-5 md:p-6 text-green-900 shadow-sm dark:border-green-900/40 dark:from-green-950/40 dark:to-emerald-950/20 dark:text-green-100">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-500/10 blur-xl" />
                  <h2 className="relative z-10 flex items-center gap-2 text-lg font-black">
                    <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                    Tài khoản đã xác thực
                  </h2>
                  <p className="relative z-10 mt-3 text-sm font-medium leading-relaxed opacity-80">
                    Thông tin hồ sơ đã sẵn sàng để lễ tân và bác sĩ hỗ trợ nhanh chóng khi bạn đặt lịch.
                  </p>
                </section>
              </aside>

              {/* Main Content */}
              <main className="space-y-8">
                {/* Stats */}
                <Stagger className="grid gap-5 md:grid-cols-3">
                  {[
                    [CalendarDays, "2", "Lịch hẹn", "from-blue-50 to-blue-100/50", "text-blue-600"],
                    [FileText, "2", "Hồ sơ", "from-cyan-50 to-cyan-100/50", "text-cyan-600"],
                    [CheckCircle2, "1", "Hoàn thành", "from-emerald-50 to-emerald-100/50", "text-emerald-600"],
                  ].map(([Icon, value, label, bg, color]) => (
                    <StaggerItem key={String(label)} whileHover={{ y: -6 }}>
                      <section className={`relative overflow-hidden rounded-3xl border border-slate-200/60 bg-linear-to-br ${bg} p-5 md:p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/50`}>
                        <Icon className={`h-8 w-8 ${color} dark:brightness-150`} />
                        <p className="mt-5 text-4xl font-black text-slate-900 dark:text-white">{String(value)}</p>
                        <p className="mt-1 text-sm font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">{String(label)}</p>
                      </section>
                    </StaggerItem>
                  ))}
                </Stagger>

                {/* Appointments */}
                <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 md:p-6 lg:p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/80">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Lịch hẹn gần đây</h2>
                    <Button variant="ghost" className="hidden text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 sm:flex">
                      Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {appointments.map((item) => (
                      <article key={item.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{item.service}</h3>
                          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <Clock className="h-4 w-4" />
                            {item.date} lúc {item.time} • <span className="text-slate-700 dark:text-slate-300 font-bold">{item.doctor}</span>
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold shadow-sm ${item.status === 'Đã xác nhận' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                          {item.status === 'Đã xác nhận' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                          {item.status}
                        </span>
                      </article>
                    ))}
                  </div>
                </section>

                {/* Treatment Records */}
                <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 md:p-6 lg:p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/80">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Hồ sơ điều trị</h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    {treatmentRecords.map((item) => (
                      <article key={item.id} className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:border-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-blue-100/50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.date}
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">{item.note}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

