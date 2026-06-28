"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Award, CalendarDays, CheckCircle2, Clock, HeartHandshake,
  PhoneCall, Shield, Sparkles, Star, Stethoscope, Users, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const services = [
  { icon: Sparkles, title: "Tẩy trắng răng", desc: "Công nghệ laser hiện đại, làm sáng răng an toàn, kiểm soát ê buốt hoàn toàn.", color: "from-blue-500 to-cyan-400" },
  { icon: Stethoscope, title: "Niềng răng", desc: "Chỉnh nha mắc cài hoặc trong suốt theo phác đồ cá nhân hóa.", color: "from-violet-500 to-blue-500" },
  { icon: Award, title: "Cấy ghép Implant", desc: "Phục hồi răng mất bền vững, an toàn với công nghệ tiên tiến nhất.", color: "from-cyan-500 to-teal-400" },
  { icon: Shield, title: "Bọc răng sứ", desc: "Phục hồi thẩm mỹ, màu răng tự nhiên và độ bền cao cấp.", color: "from-blue-600 to-indigo-500" },
  { icon: HeartHandshake, title: "Nha khoa trẻ em", desc: "Chăm sóc nhẹ nhàng, tạo thói quen tốt và môi trường thân thiện cho bé.", color: "from-pink-500 to-rose-400" },
  { icon: Zap, title: "Nhổ răng khôn", desc: "Tiểu phẫu theo quy trình vô trùng nghiêm ngặt, phục hồi nhanh.", color: "from-amber-500 to-orange-400" },
];

const stats = [
  { value: "10,000+", label: "Khách hàng tin tưởng" },
  { value: "15+", label: "Năm kinh nghiệm" },
  { value: "50+", label: "Chuyên gia nha khoa" },
  { value: "99%", label: "Hài lòng sau điều trị" },
];

const testimonials = [
  { name: "Nguyễn Minh Anh", role: "Khách hàng niềng răng", rating: 5, text: "SMILEE đã thay đổi hoàn toàn nụ cười của tôi! Đội ngũ bác sĩ tận tâm và chuyên nghiệp từ đầu đến cuối.", avatar: "MA" },
  { name: "Trần Thị Hương", role: "Khách hàng Implant", rating: 5, text: "Quy trình cấy ghép Implant cực kỳ chuyên nghiệp. Tôi gần như không cảm thấy đau và phục hồi rất nhanh.", avatar: "TH" },
  { name: "Lê Văn Đức", role: "Khách hàng tẩy trắng", rating: 5, text: "Kết quả tẩy trắng vượt ngoài mong đợi. Chỉ một buổi mà răng trắng sáng hẳn, rất tự nhiên!", avatar: "LĐ" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroBgY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="flex w-full flex-col overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 pt-20 md:pt-24 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
        {/* Animated background blobs */}
        <motion.div style={{ y: heroBgY }} className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[15%] h-80 w-80 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/15 animate-float" />
          <div className="absolute right-[12%] top-[25%] h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl dark:bg-cyan-500/12 animate-float delay-1000" />
          <div className="absolute bottom-[20%] left-[35%] h-48 w-48 rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-500/10 animate-float delay-2000" />
        </motion.div>

        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40 dark:opacity-20" />

        <div className="container relative mx-auto grid gap-8 md:gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex max-w-2xl flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/50 bg-white/60 px-4 py-2 text-sm font-bold text-blue-800 shadow-sm backdrop-blur-xl dark:border-blue-500/30 dark:bg-slate-900/50 dark:text-cyan-300"
            >
              {/* Subtle animated glowing border */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-linear-to-r from-blue-400/20 to-cyan-400/20 blur-sm dark:from-blue-500/20 dark:to-cyan-500/20" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              SMILEE Dental Clinic — Chuẩn Quốc Tế
            </motion.div>

            <h1 className="max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.12] tracking-tight text-slate-900 dark:text-white xl:text-6xl">
              Nụ cười{" "}
              <span className="gradient-text">hoàn hảo</span>
              <br />bắt đầu từ đây.
            </h1>

            <p className="mt-5 md:mt-6 max-w-xl text-base md:text-lg leading-relaxed md:leading-8 text-slate-600 dark:text-slate-300">
              SMILEE kết hợp chuyên môn nha khoa đỉnh cao với công nghệ quản lý hiện đại — đặt lịch, hồ sơ điều trị và chăm sóc sau khám trong một hệ thống thống nhất.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="group h-12 md:h-14 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-8 text-base font-bold text-white shadow-lg shadow-blue-500/35 transition-all hover:shadow-blue-500/50 hover:-translate-y-1 hover:scale-105">
                <Link href="/booking">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Đặt lịch khám ngay
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 md:h-14 rounded-full border-2 border-slate-200 bg-white/70 px-8 text-base font-bold backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/70">
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-5 w-5 text-blue-600 dark:text-cyan-400" />
                  Tư vấn miễn phí
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {[
                [CheckCircle2, "Vô trùng tuyệt đối"],
                [Star, "Đánh giá 5.0"],
                [Clock, "Xác nhận trong 1h"],
              ].map(([Icon, text]) => (
                <div key={String(text)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <Icon className="h-4 w-4 text-blue-500 dark:text-cyan-400" />
                  {String(text)}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[380px] md:h-[520px] w-full max-w-lg">
              {/* Glow ring */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-blue-400/20 to-cyan-400/15 blur-3xl" />

              {/* Main image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src="/pic/banner_home.png"
                  alt="SMILEE dentist"
                  fill
                  className="z-10 object-contain drop-shadow-[0_30px_60px_rgba(37,99,235,0.22)]"
                  priority
                />
              </motion.div>

              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute left-0 top-[22%] z-20 hidden rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Tiêu chuẩn</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">An toàn tuyệt đối</p>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-[20%] right-0 z-20 hidden rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Đánh giá</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">5.0 / 5.0 ★</p>
                </div>
              </motion.div>

              {/* Floating card 3 */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[8%] top-[10%] z-20 hidden rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-2 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/50"
              >
                <Users className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                <p className="text-sm font-black text-slate-900 dark:text-white">10,000+ khách</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Cuộn xuống</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-8 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center pt-1">
            <div className="h-2 w-1 rounded-full bg-blue-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="relative bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 py-10 md:py-16 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900">
        <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
        <Stagger className="container mx-auto grid grid-cols-2 gap-4 md:gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-4 md:p-6 text-center backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/10">
                <p className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">{stat.value}</p>
                <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider text-blue-100">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-12 md:py-16 lg:py-24 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 md:mb-12 lg:mb-14 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">Dịch vụ nổi bật</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Giải pháp chăm sóc <span className="gradient-text">toàn diện</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400">Đội ngũ chuyên gia với hơn 15 năm kinh nghiệm, ứng dụng công nghệ tiên tiến nhất.</p>
          </Reveal>

          <Stagger className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc, color }) => (
              <StaggerItem key={title} whileHover={{ y: -8 }}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white/50 p-5 md:p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 dark:border-slate-800/60 dark:bg-slate-900/50">
                  {/* Gradient hover bg */}
                  <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-20`} />

                  <div className={`relative mb-4 md:mb-5 flex h-11 w-11 md:h-13 md:w-13 items-center justify-center rounded-2xl bg-linear-to-br ${color} p-0.5 shadow-lg`}>
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-cyan-400" />
                    </div>
                  </div>

                  <h3 className="relative text-xl font-extrabold text-slate-900 dark:text-white">{title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{desc}</p>
                  <Link href="/services" className="relative mt-5 inline-flex items-center text-sm font-extrabold text-blue-600 transition hover:translate-x-1 dark:text-cyan-400">
                    Xem chi tiết
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── WHY SMILEE ── */}
      <section className="relative overflow-hidden bg-slate-950 py-12 md:py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-15" />
        </div>

        <div className="container relative mx-auto grid gap-10 md:gap-12 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal direction="left">
            <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Tại sao chọn SMILEE</p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white">
              Trải nghiệm nha khoa{" "}
              <span className="gradient-text">khác biệt hoàn toàn</span>
            </h2>
            <p className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed md:leading-8 text-slate-400">
              Từ bước đặt lịch đến theo dõi tái khám, mọi thứ đều được số hóa và minh bạch hoàn toàn.
            </p>

            <div className="mt-8 md:mt-10 space-y-4 md:space-y-6">
              {[
                [Shield, "Vô trùng nghiêm ngặt", "Quy trình kiểm soát nhiễm khuẩn rõ ràng, đạt tiêu chuẩn quốc tế cho từng ca khám."],
                [Sparkles, "Thẩm mỹ tự nhiên", "Tư vấn chuyên sâu theo tình trạng răng thật và mong muốn thực tế của từng khách hàng."],
                [Stethoscope, "Hồ sơ điện tử toàn diện", "Mỗi lần khám được lưu trữ để bác sĩ theo dõi tiến trình điều trị xuyên suốt."],
                [Zap, "Xác nhận lịch hẹn nhanh", "Hệ thống thông báo tức thì, lễ tân xử lý và xác nhận lịch khám trong vòng 1 giờ."],
              ].map(([Icon, title, desc]) => (
                <div key={String(title)} className="flex gap-4 md:gap-5">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-cyan-400">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm md:text-base">{String(title)}</h3>
                    <p className="mt-1 md:mt-1.5 text-xs md:text-sm leading-relaxed md:leading-6 text-slate-400">{String(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl">
              <Image src="/pic/article_about.png" alt="SMILEE clinic" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {[["10k+", "Khách hàng"], ["99%", "Hài lòng"]].map(([n, l]) => (
                  <div key={l} className="flex-1 rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                    <p className="text-2xl font-black text-white">{n}</p>
                    <p className="text-xs text-white/70">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-linear-to-b from-slate-50 to-white py-12 md:py-16 lg:py-24 dark:from-slate-900/50 dark:to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 md:mb-12 lg:mb-14 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">Khách hàng nói gì</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Hàng nghìn nụ cười <span className="gradient-text">hạnh phúc</span>
            </h2>
          </Reveal>

          <Stagger className="grid gap-4 md:gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} whileHover={{ y: -6 }}>
                <div className="glass-card h-full rounded-2xl p-6 dark:glass-dark">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">&quot;{t.text}&quot;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-sm font-black text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-cyan-500 py-12 md:py-16 lg:py-24 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900">
        <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/8 blur-3xl" />

        <Reveal className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white/90 backdrop-blur">
            Sẵn sàng chưa?
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white">
            Bắt đầu hành trình nụ cười hoàn hảo ngay hôm nay.
          </h2>
          <p className="mx-auto mt-4 md:mt-6 max-w-xl text-base md:text-lg text-blue-100">
            Đặt lịch khám trực tuyến hoàn toàn miễn phí. Đội ngũ SMILEE sẽ liên hệ xác nhận trong vòng 1 giờ.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col justify-center gap-3 md:gap-4 sm:flex-row">
            <Button asChild className="h-12 md:h-14 rounded-full bg-white px-10 text-base font-bold text-blue-600 shadow-xl shadow-blue-800/30 transition-all hover:-translate-y-1 hover:bg-slate-50 hover:scale-105">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5" />
                Đặt lịch trực tuyến
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 md:h-14 rounded-full border-white/30 bg-white/10 px-10 text-base font-bold text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/20 hover:text-white">
              <Link href="/services">
                Xem bảng giá dịch vụ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
