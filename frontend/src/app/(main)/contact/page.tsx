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

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await apiPost("/messages", Object.fromEntries(form.entries()));
      setStatus("Tin nhắn đã được gửi. SMILEE sẽ phản hồi sớm.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Không thể gửi tin nhắn.");
    }
  };

  return (
    <div className="bg-slate-50 pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal direction="left" className="space-y-6">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-sm font-extrabold text-cyan-200">
                <MessageCircle className="h-4 w-4" />
                Liên hệ SMILEE
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                Cần tư vấn? Gửi thông tin, SMILEE phản hồi ngay.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Tin nhắn của bạn sẽ được lưu vào hệ thống hỗ trợ trong admin để lễ tân theo dõi, phản hồi và chuyển đúng bộ phận phụ trách.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-blue-600 px-6 text-white hover:bg-blue-500">
                  <Link href="/booking">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Đặt lịch khám
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/services">
                    Xem dịch vụ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Stagger className="grid gap-3">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <StaggerItem key={label} whileHover={{ x: 6 }}>
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">{label}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">{value}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="mb-6">
                <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-300">Biểu mẫu tư vấn</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">Thông tin liên hệ</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Họ tên</span>
                  <Input name="fullName" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </label>
                <label>
                  <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Email</span>
                  <Input name="email" type="email" className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </label>
                <label>
                  <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Điện thoại</span>
                  <Input name="phone" className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Chủ đề</span>
                  <Input name="subject" placeholder="Tư vấn dịch vụ, lịch khám, chi phí..." className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Nội dung</span>
                  <textarea name="message" required className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950" />
                </label>
              </div>

              {status ? <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 dark:bg-blue-950/40 dark:text-cyan-300">{status}</p> : null}
              <Button className="mt-6 h-12 w-full rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-700">
                Gửi tin nhắn
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
