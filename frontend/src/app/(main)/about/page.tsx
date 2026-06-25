import Image from "next/image";
import Link from "next/link";
import { Award, CalendarDays, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const values = [
  [ShieldCheck, "An toàn", "Quy trình vô trùng và kiểm soát chất lượng theo từng bước điều trị.", "from-blue-500 to-cyan-400"],
  [Users, "Tận tâm", "Lễ tân, bác sĩ và quản trị cùng nhìn một nguồn dữ liệu thống nhất.", "from-violet-500 to-blue-500"],
  [Award, "Chuyên môn", "Điều trị theo phác đồ rõ ràng, lưu hồ sơ để theo dõi dài hạn.", "from-cyan-500 to-teal-400"],
  [HeartHandshake, "Minh bạch", "Dịch vụ, hóa đơn và lịch sử điều trị được quản lý trong hệ thống.", "from-amber-500 to-orange-400"],
];

const milestones = [
  { year: "2010", title: "Thành lập", desc: "SMILEE khai trương với đội ngũ 5 bác sĩ chuyên khoa nha." },
  { year: "2015", title: "Mở rộng", desc: "Mở thêm 3 chi nhánh, nâng tổng số bác sĩ lên 20+." },
  { year: "2020", title: "Số hóa", desc: "Ra mắt hệ thống quản lý phòng khám điện tử toàn diện." },
  { year: "2026", title: "Hôm nay", desc: "10,000+ khách hàng, 50+ chuyên gia, tiêu chuẩn quốc tế." },
];

export default function AboutPage() {
  return (
    <div className="bg-linear-to-b from-slate-50 to-white pt-24 dark:from-slate-950 dark:to-slate-950">

      {/* ── HERO ── */}
      <section className="container mx-auto grid gap-10 md:gap-12 lg:gap-14 px-4 py-10 md:py-14 lg:py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal direction="left">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
            Về SMILEE
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
            Phòng khám nha khoa hiện đại —{" "}
            <span className="gradient-text">vận hành bằng dữ liệu.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            SMILEE kết hợp chuyên môn nha khoa với hệ thống quản lý lịch hẹn, hồ sơ điều trị và hóa đơn để mỗi ca chăm sóc được theo dõi từ tiếp nhận đến tái khám.
          </p>

          {/* Stats */}
          <Stagger className="mt-10 grid grid-cols-3 gap-4">
            {[["10k+", "Khách hàng"], ["15+", "Năm KN"], ["50+", "Chuyên gia"]].map(([n, l]) => (
              <StaggerItem key={l} whileHover={{ y: -6 }}>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 md:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black gradient-text">{n}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{l}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8">
            <Button asChild className="h-11 md:h-12 lg:h-14 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-6 md:px-8 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-4 w-4" />
                Đặt lịch ngay
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal direction="right" className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-950/20 border border-white/20">
          <Float className="absolute right-5 top-5 z-10 rounded-2xl border border-white/60 bg-white/90 p-3 text-blue-600 shadow-xl backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/90 dark:text-cyan-400">
            <ShieldCheck className="h-6 w-6" />
          </Float>
          <Image src="/pic/dentist_team.png" alt="Đội ngũ bác sĩ SMILEE" fill className="object-cover transition-transform duration-1000 hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
        </Reveal>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-white py-12 md:py-16 lg:py-20 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Giá trị cốt lõi</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, title, desc, color]) => (
              <StaggerItem key={String(title)} whileHover={{ y: -8 }}>
                <article className="group h-full rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className={`mb-4 md:mb-5 inline-flex h-11 w-11 md:h-12 md:w-12 lg:h-13 lg:w-13 items-center justify-center rounded-2xl bg-linear-to-br ${String(color)} p-0.5 shadow-lg`}>
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{String(desc)}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="relative overflow-hidden bg-slate-950 py-12 md:py-16 lg:py-24">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[20%] top-[30%] h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] animate-float" />
          <div className="absolute right-[20%] top-[60%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] animate-float delay-1000" />
          <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Reveal className="mb-16 text-center">
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-4 backdrop-blur-md">
              Chặng đường
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-white">Hành trình phát triển</h2>
          </Reveal>
          
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-blue-500/50 via-cyan-400/50 to-transparent" />
            
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <Reveal key={m.year} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`group flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-1 flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20 text-left">
                        <div className="flex flex-col items-start">
                          <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-black text-cyan-400 border border-blue-400/20 group-hover:bg-cyan-500/30 transition-colors">
                            NĂM {m.year}
                          </span>
                          <h3 className="mt-4 text-xl font-black text-white group-hover:text-cyan-300 transition-colors">{m.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glowing Timeline Node */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-slate-950 bg-slate-900 shadow-[0_0_0_2px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] group-hover:border-slate-800">
                      <div className="h-4 w-4 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 transition-all duration-500 group-hover:scale-150 group-hover:from-cyan-400 group-hover:to-blue-500" />
                    </div>
                    
                    <div className="flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
