"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Stethoscope, Timer, Zap } from "lucide-react";
import { apiGet, formatCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Service = { id: string; name: string; description?: string; price: number; duration: number };

const fallbackServices: Service[] = [
  { id: "1", name: "Khám tổng quát", description: "Kiểm tra răng miệng định kỳ và tư vấn kế hoạch chăm sóc cá nhân.", price: 250000, duration: 30 },
  { id: "2", name: "Tẩy trắng răng", description: "Công nghệ laser hiện đại, làm sáng răng an toàn và hiệu quả nhanh chóng.", price: 1200000, duration: 45 },
  { id: "3", name: "Cấy ghép Implant", description: "Phục hồi răng mất bền vững với phác đồ cá nhân hóa từ chuyên gia.", price: 18000000, duration: 90 },
  { id: "4", name: "Niềng răng", description: "Chỉnh nha mắc cài hoặc trong suốt cho nụ cười cân đối và tự nhiên.", price: 30000000, duration: 60 },
  { id: "5", name: "Bọc răng sứ", description: "Phục hồi thẩm mỹ với sứ cao cấp, màu sắc hài hòa tự nhiên.", price: 3500000, duration: 60 },
  { id: "6", name: "Nhổ răng khôn", description: "Tiểu phẫu quy trình vô trùng, phục hồi nhanh, giảm đau tối đa.", price: 800000, duration: 45 },
];

const iconMap = [Stethoscope, Sparkles, Zap, CheckCircle2, ShieldCheck, Zap];
const colorMap = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-blue-500",
  "from-cyan-500 to-teal-400",
  "from-blue-600 to-indigo-500",
  "from-pink-500 to-rose-400",
  "from-amber-500 to-orange-400",
];

const whyItems = [
  [ShieldCheck, "Vô trùng nghiêm ngặt", "Quy trình kiểm soát nhiễm khuẩn theo tiêu chuẩn phòng khám hiện đại."],
  [Sparkles, "Thẩm mỹ tự nhiên", "Tư vấn giải pháp vừa đẹp, vừa giữ sức khỏe răng lâu dài."],
  [Stethoscope, "Theo dõi bằng hồ sơ", "Mỗi lần khám được ghi nhận để bác sĩ quản lý tiến trình điều trị."],
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    apiGet<Service[]>("/services", fallbackServices).then((data) =>
      setServices(data.length ? data : fallbackServices)
    );
  }, []);

  return (
    <div className="bg-linear-to-b from-slate-50 to-white pt-20 md:pt-24 lg:pt-28 dark:from-slate-950 dark:to-slate-950">

      {/* ── HERO ── */}
      <section className="container mx-auto px-4 py-10 md:py-12 lg:py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
            Dịch vụ nha khoa
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Chăm sóc toàn diện cho{" "}
            <span className="gradient-text">từng nụ cười.</span>
          </h1>
          <p className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed md:leading-8 text-slate-500 dark:text-slate-400">
            Danh mục dịch vụ đa dạng — từ điều trị cơ bản đến thẩm mỹ nâng cao, mỗi ca điều trị đều được cá nhân hóa theo nhu cầu thực tế.
          </p>
        </Reveal>

        {/* Hero Image */}
        <Reveal delay={0.2} className="mt-10 md:mt-14 relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20">
          <div className="aspect-21/9 w-full relative">
            <Image 
              src="/pic/modern_clinic.png" 
              alt="SMILEE Modern Dental Clinic" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-8 sm:p-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black text-white">Không gian chuẩn Quốc Tế</h2>
                <p className="mt-2 text-slate-200 font-medium leading-relaxed">Trải nghiệm dịch vụ nha khoa trong không gian sang trọng, hiện đại và vô trùng tuyệt đối.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SERVICE CARDS ── */}
        <Stagger className="mt-10 md:mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[i % iconMap.length];
            const color = colorMap[i % colorMap.length];
            return (
              <StaggerItem key={service.id} whileHover={{ y: -8 }}>
                <Link href={`/services/${service.id}`} className="block h-full">
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 p-5 md:p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 dark:border-slate-800/60 dark:bg-slate-900/50">
                  {/* gradient hover bg */}
                  <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-20`} />

                  {/* Icon */}
                  <div className={`relative mb-5 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-linear-to-br ${color} p-0.5 shadow-lg`}>
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
                    </div>
                  </div>

                  <h2 className="relative text-xl font-extrabold text-slate-900 dark:text-white">{service.name}</h2>
                  <p className="relative mt-3 min-h-18 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {service.description ?? "Dịch vụ nha khoa chuyên sâu tại SMILEE."}
                  </p>

                  <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Chi phí từ</p>
                      <p className="mt-0.5 text-lg font-black text-blue-600 dark:text-cyan-400">{formatCurrency(service.price)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                      <Timer className="h-3.5 w-3.5" />
                      {service.duration} phút
                    </div>
                  </div>
                </article>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ── WHY SMILEE ── */}
      <section className="mt-8 bg-slate-950 py-12 md:py-16 lg:py-20">
        <Reveal direction="scale" className="container mx-auto grid gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {whyItems.map(([Icon, title, desc]) => (
            <div key={String(title)} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-all group-hover:bg-cyan-400/20" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-extrabold text-white">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{String(desc)}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 md:py-12 lg:py-16">
        <Reveal className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Sẵn sàng bắt đầu?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
            Đặt lịch tư vấn miễn phí — bác sĩ sẽ kiểm tra và đề xuất giải pháp phù hợp nhất.
          </p>
          <Button asChild className="mt-8 h-12 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-10 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1 hover:shadow-blue-500/40">
            <Link href="/booking">
              Đặt lịch tư vấn
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
