"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope, Timer } from "lucide-react";
import { apiGet, formatCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
};

const fallbackServices: Service[] = [
  { id: "1", name: "Khám tổng quát", description: "Kiểm tra răng miệng định kỳ và tư vấn kế hoạch chăm sóc.", price: 250000, duration: 30 },
  { id: "2", name: "Tẩy trắng răng", description: "Công nghệ laser hiện đại, an toàn và hiệu quả nhanh.", price: 1200000, duration: 45 },
  { id: "3", name: "Cấy ghép Implant", description: "Phục hồi răng mất bền vững với phác đồ cá nhân hóa.", price: 18000000, duration: 90 },
  { id: "4", name: "Niềng răng", description: "Chỉnh nha mắc cài hoặc trong suốt cho nụ cười cân đối.", price: 30000000, duration: 60 },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    apiGet<Service[]>("/services", fallbackServices).then((data) => setServices(data.length ? data : fallbackServices));
  }, []);

  return (
    <div className="bg-white pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Dịch vụ nha khoa</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Chăm sóc toàn diện cho từng nụ cười.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Danh mục dịch vụ được đồng bộ từ backend, giúp khách hàng xem thông tin và admin cập nhật giá ngay trong hệ thống.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.id} whileHover={{ y: -10, scale: 1.015 }}>
              <article className="group h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:rotate-6 group-hover:scale-110 dark:bg-blue-900/40 dark:text-cyan-400">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{service.name}</h2>
                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-400">{service.description ?? "Dịch vụ nha khoa chuyên sâu tại SMILEE."}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-bold dark:border-slate-800">
                  <span className="text-blue-700 dark:text-cyan-400">{formatCurrency(service.price)}</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Timer className="h-4 w-4" />
                    {service.duration} phút
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="scale" className="mt-12 grid gap-5 rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 md:grid-cols-3 md:p-8">
          {[
            [ShieldCheck, "Vô trùng nghiêm ngặt", "Quy trình kiểm soát nhiễm khuẩn theo tiêu chuẩn phòng khám hiện đại."],
            [Sparkles, "Thẩm mỹ tự nhiên", "Tư vấn giải pháp vừa đẹp, vừa giữ sức khỏe răng lâu dài."],
            [Stethoscope, "Theo dõi bằng hồ sơ", "Mỗi lần khám được ghi nhận để bác sĩ quản lý tiến trình điều trị."],
          ].map(([Icon, title, desc]) => (
            <div key={String(title)} className="rounded-2xl border border-white/10 p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/5">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-4 font-extrabold">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{String(desc)}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Button asChild className="h-12 rounded-full bg-blue-600 px-8 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1 hover:bg-blue-700">
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
