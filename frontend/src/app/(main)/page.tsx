"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, CalendarDays, PhoneCall, Shield, Sparkles, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { title: "Niềng răng", desc: "Chỉnh nha mắc cài hoặc trong suốt theo phác đồ cá nhân." },
  { title: "Bọc răng sứ", desc: "Phục hồi thẩm mỹ, màu răng tự nhiên và bền chắc." },
  { title: "Cấy ghép Implant", desc: "Giải pháp phục hồi răng mất an toàn, lâu dài." },
  { title: "Tẩy trắng răng", desc: "Làm sáng răng bằng công nghệ hiện đại, kiểm soát ê buốt." },
  { title: "Nha khoa trẻ em", desc: "Chăm sóc nhẹ nhàng, tạo thói quen tốt cho bé." },
  { title: "Nhổ răng khôn", desc: "Thăm khám, chụp phim và tiểu phẫu theo quy trình vô trùng." },
];

export default function Home() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <section className="relative flex min-h-screen items-center bg-slate-50 pt-28 pb-16 dark:bg-slate-950">
        <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-cyan-400">
              <Star className="h-4 w-4 fill-current" />
              SMILEE Dental Clinic
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Giúp bạn tìm lại <span className="text-blue-600 dark:text-cyan-400">nụ cười rạng rỡ</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              SMILEE mang đến dịch vụ nha khoa tận tâm, hiện đại và an toàn, kết nối đặt lịch, hồ sơ điều trị và chăm sóc sau khám trong một hệ thống thống nhất.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700">
                <Link href="/booking">
                  Đặt lịch khám ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-full border-2 bg-white/70 px-8 text-base font-bold">
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-5 w-5 text-blue-600" />
                  Tư vấn miễn phí
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative flex min-h-[420px] items-center justify-center lg:min-h-[600px]"
          >
            <div className="relative flex aspect-square w-full max-w-xl items-center justify-center lg:aspect-auto lg:h-[600px]">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -0.35, 0.35, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <div className="absolute left-1/2 top-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-900/30" />
                <Image
                  src="/pic/banner_home.png"
                  alt="SMILEE dentist"
                  fill
                  className="z-10 object-contain drop-shadow-[0_24px_55px_rgba(37,99,235,0.16)] dark:drop-shadow-[0_24px_55px_rgba(0,0,0,0.45)]"
                  priority
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
                className="absolute left-0 top-[24%] z-20 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-blue-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:flex"
              >
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">An toàn tuyệt đối</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
                className="absolute bottom-[24%] right-0 z-20 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-blue-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:flex"
              >
                <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
                  <Star className="h-6 w-6 fill-current text-amber-500" />
                </div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">Đánh giá 5.0</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 7, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-[12%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white/90 text-blue-600 shadow-lg dark:border-blue-900 dark:bg-slate-900 dark:text-cyan-400"
                aria-hidden="true"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-[12%] left-[12%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white/90 text-blue-600 shadow-lg dark:border-blue-900 dark:bg-slate-900 dark:text-cyan-400"
                aria-hidden="true"
              >
                <CalendarDays className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Dịch vụ nổi bật</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white md:text-5xl">Giải pháp chăm sóc toàn diện</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-cyan-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{service.desc}</p>
                <Link href="/services" className="mt-5 inline-flex items-center text-sm font-extrabold text-blue-600 hover:text-blue-700 dark:text-cyan-400">
                  Tìm hiểu thêm
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
            <Image src="/pic/article_about.png" alt="SMILEE clinic" fill className="object-cover" />
          </div>
          <div className="self-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Tại sao chọn SMILEE</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white md:text-5xl">Trải nghiệm nha khoa khác biệt</h2>
            <div className="mt-8 space-y-6">
              {[
                [Shield, "An toàn & vô trùng", "Quy trình kiểm soát nhiễm khuẩn rõ ràng cho từng ca khám."],
                [Sparkles, "Thẩm mỹ tự nhiên", "Tư vấn theo tình trạng răng thật và mong muốn của khách hàng."],
                [Stethoscope, "Theo dõi bằng hồ sơ", "Mỗi lần khám được lưu để bác sĩ nắm tiến trình điều trị."],
              ].map(([Icon, title, desc]) => (
                <div key={String(title)} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white">{String(title)}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{String(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-20 dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">Sẵn sàng cho nụ cười mới?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">Đặt lịch khám hoặc xem bảng giá dịch vụ để chọn giải pháp phù hợp.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="h-14 rounded-full bg-white px-8 text-base font-bold text-blue-600 hover:bg-slate-50">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5" />
                Đặt lịch trực tuyến
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 rounded-full border-white/60 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 hover:text-white">
              <Link href="/services">Xem bảng giá</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
