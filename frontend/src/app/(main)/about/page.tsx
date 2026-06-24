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
      <section className="container mx-auto grid gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal direction="left">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
            Về SMILEE
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
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
                <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-3xl font-black gradient-text">{n}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{l}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8">
            <Button asChild className="h-12 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-8 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-4 w-4" />
                Đặt lịch ngay
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal direction="right" className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-2xl shadow-blue-950/15">
          <Float className="absolute right-5 top-5 z-10 rounded-2xl border border-white/60 bg-white/90 p-3 text-blue-600 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-cyan-400">
            <ShieldCheck className="h-6 w-6" />
          </Float>
          <Image src="/pic/article_about.png" alt="Đội ngũ SMILEE" fill className="object-cover transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
        </Reveal>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-white py-20 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl">Giá trị cốt lõi</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, title, desc, color]) => (
              <StaggerItem key={String(title)} whileHover={{ y: -8 }}>
                <article className="group h-full rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className={`mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br ${String(color)} p-0.5 shadow-lg`}>
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
      <section className="bg-slate-950 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-black text-white md:text-4xl">Hành trình phát triển</h2>
          </Reveal>
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-blue-500/50 via-cyan-500/30 to-transparent" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                      <div className="inline-block rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">{m.year}</p>
                        <h3 className="mt-1 font-extrabold text-white">{m.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-950">
                      <div className="h-3 w-3 rounded-full bg-linear-to-br from-blue-500 to-cyan-400" />
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
