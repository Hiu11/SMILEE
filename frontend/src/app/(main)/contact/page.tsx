"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const contactItems = [
  { icon: MapPin, label: "Địa chỉ", value: "123 Đường Công Nghệ, TP. Hồ Chí Minh" },
  { icon: Phone, label: "Hotline", value: "1900 6868 99" },
  { icon: Mail, label: "Email", value: "contact@smilee.vn" },
];

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);
    try {
      await apiPost("/messages", Object.fromEntries(form.entries()));
      setStatus("Tin nhắn đã được gửi. SMILEE sẽ phản hồi sớm.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể gửi tin nhắn.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 pt-28 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10 animate-float" />
        <div className="absolute right-[5%] top-[50%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-600/10 animate-float delay-1000" />
        <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-20" />
      </div>

      <section className="container relative mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal direction="left" className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 p-6 md:p-8 lg:p-10 text-white shadow-2xl shadow-blue-900/20">
              <div className="pointer-events-none absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-extrabold text-cyan-200 backdrop-blur-md">
                  <MessageCircle className="h-4 w-4" />
                  Liên hệ SMILEE
                </div>
                <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Cần tư vấn? Gửi thông tin, SMILEE phản hồi ngay.
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300">
                  Tin nhắn của bạn sẽ được lưu vào hệ thống hỗ trợ trong admin để lễ tân theo dõi, phản hồi và chuyển đúng bộ phận phụ trách.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="h-12 lg:h-14 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-8 text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-blue-500/50 text-base font-bold">
                    <Link href="/booking">
                      <CalendarDays className="mr-2 h-5 w-5" />
                      Đặt lịch khám
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 lg:h-14 rounded-2xl border-white/20 bg-white/5 px-8 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white text-base font-bold">
                    <Link href="/services">
                      Xem dịch vụ
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <Stagger className="grid gap-4">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <StaggerItem key={label} whileHover={{ x: 6 }}>
                  <div className="group flex items-start gap-5 rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/60 dark:hover:border-slate-700">
                    <div className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/40 dark:text-cyan-400 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-900">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">{label}</p>
                      <p className="mt-1 text-base font-bold text-slate-800 dark:text-slate-200">{value}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={submit} className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 md:p-8 lg:p-10 shadow-2xl shadow-blue-950/5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80">
              <div className="mb-6 md:mb-8">
                <p className="text-sm font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Biểu mẫu tư vấn</p>
                <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Thông tin liên hệ</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2 group">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500 group-focus-within:text-blue-500 transition-colors">Họ tên <span className="text-red-500">*</span></span>
                  <Input name="fullName" required className="h-12 lg:h-14 rounded-2xl bg-white/50 border-slate-200/60 shadow-inner transition-all focus:scale-[1.01] focus:ring-2 focus:ring-blue-500/50 dark:bg-slate-950/50 dark:border-slate-800/60" />
                </label>
                <label className="group">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500 group-focus-within:text-blue-500 transition-colors">Email</span>
                  <Input name="email" type="email" className="h-12 lg:h-14 rounded-2xl bg-white/50 border-slate-200/60 shadow-inner transition-all focus:scale-[1.01] focus:ring-2 focus:ring-blue-500/50 dark:bg-slate-950/50 dark:border-slate-800/60" />
                </label>
                <label className="group">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500 group-focus-within:text-blue-500 transition-colors">Điện thoại <span className="text-red-500">*</span></span>
                  <Input name="phone" required className="h-12 lg:h-14 rounded-2xl bg-white/50 border-slate-200/60 shadow-inner transition-all focus:scale-[1.01] focus:ring-2 focus:ring-blue-500/50 dark:bg-slate-950/50 dark:border-slate-800/60" />
                </label>
                <label className="sm:col-span-2 group">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500 group-focus-within:text-blue-500 transition-colors">Chủ đề</span>
                  <Input name="subject" placeholder="Tư vấn dịch vụ, lịch khám, chi phí..." className="h-12 lg:h-14 rounded-2xl bg-white/50 border-slate-200/60 shadow-inner transition-all focus:scale-[1.01] focus:ring-2 focus:ring-blue-500/50 dark:bg-slate-950/50 dark:border-slate-800/60" />
                </label>
                <label className="sm:col-span-2 group">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500 group-focus-within:text-blue-500 transition-colors">Nội dung <span className="text-red-500">*</span></span>
                  <textarea name="message" required className="min-h-36 w-full rounded-2xl border border-slate-200/60 bg-white/50 px-4 py-3 text-sm font-medium outline-none transition-all shadow-inner focus:scale-[1.01] focus:ring-2 focus:ring-blue-500/50 dark:border-slate-800/60 dark:bg-slate-950/50" />
                </label>
              </div>

              {status ? (
                <div className="mt-6 rounded-xl bg-green-50 p-4 dark:bg-green-900/30">
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">{status}</p>
                </div>
              ) : null}
              
              <Button disabled={isSubmitting} className="mt-8 h-12 lg:h-14 w-full rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-base lg:text-lg font-bold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
