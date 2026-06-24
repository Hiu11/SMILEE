"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock, Stethoscope } from "lucide-react";
import { apiGet, apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Service = { id: string; name: string; price: number; duration: number };
type User = { id: string; fullName: string; role: string };

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    apiGet<Service[]>("/services", []).then(setServices);
    apiGet<User[]>("/users?role=DOCTOR", []).then(setDoctors);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    const form = new FormData(event.currentTarget);
    const date = String(form.get("date") ?? "");
    const time = String(form.get("time") ?? "");
    const serviceId = String(form.get("serviceId") ?? "");
    const doctorId = String(form.get("doctorId") ?? "");

    try {
      await apiPost("/bookings", {
        fullName: form.get("fullName"),
        phone: form.get("phone"),
        email: form.get("email") || undefined,
        date: new Date(`${date}T${time}`).toISOString(),
        doctorId: doctorId || undefined,
        serviceIds: serviceId ? [serviceId] : [],
        notes: form.get("notes"),
      });

      setMessage("Đã tạo lịch hẹn thành công. Lễ tân sẽ liên hệ xác nhận sớm.");
      event.currentTarget.reset();
      router.push("/confirm-booking");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể tạo lịch hẹn.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 pt-28 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[20%] h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10 animate-float" />
        <div className="absolute right-[5%] top-[40%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-600/10 animate-float delay-1000" />
        <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
      </div>

      <section className="container relative mx-auto grid min-h-[calc(100vh-5rem)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal direction="left" className="flex flex-col justify-center">
          <Float className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/50 bg-white/60 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-md dark:border-blue-900/50 dark:bg-slate-900/60 dark:text-cyan-400">
            <CalendarDays className="h-4 w-4" />
            Đặt lịch khám
          </Float>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Chọn thời gian phù hợp, SMILEE lo phần còn lại.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Đặt lịch trực tiếp vào hệ thống phòng khám. Lịch hẹn sẽ xuất hiện ở trang quản trị với trạng thái chờ xác nhận để lễ tân xử lý nhanh chóng.
          </p>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [Stethoscope, "Bác sĩ chuyên khoa"],
              [Clock, "Xác nhận nhanh"],
              [CheckCircle2, "Theo dõi trên admin"],
            ].map(([Icon, text]) => (
              <StaggerItem key={String(text)} whileHover={{ y: -6, scale: 1.02 }}>
                <div className="h-full rounded-2xl border border-slate-200/60 bg-white/60 p-5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-200">
                  <Icon className="mb-3 h-7 w-7 text-blue-600 dark:text-cyan-400" />
                  {String(text)}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal direction="right">
          <form onSubmit={submit} className="self-center rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-2xl shadow-blue-900/5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Thông tin đặt lịch</h2>
              <p className="mt-2 text-sm text-slate-500">Vui lòng điền đầy đủ thông tin để SMILEE phục vụ bạn tốt nhất.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Họ tên <span className="text-red-500">*</span></span>
                <Input name="fullName" required className="h-12 rounded-xl bg-slate-50/50 transition focus:scale-[1.01] dark:bg-slate-950/50" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Điện thoại <span className="text-red-500">*</span></span>
                <Input name="phone" required className="h-12 rounded-xl bg-slate-50/50 transition focus:scale-[1.01] dark:bg-slate-950/50" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Email</span>
                <Input name="email" type="email" className="h-12 rounded-xl bg-slate-50/50 transition focus:scale-[1.01] dark:bg-slate-950/50" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Ngày khám <span className="text-red-500">*</span></span>
                <Input name="date" type="date" required className="h-12 rounded-xl bg-slate-50/50 transition focus:scale-[1.01] dark:bg-slate-950/50" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Giờ khám <span className="text-red-500">*</span></span>
                <Input name="time" type="time" required className="h-12 rounded-xl bg-slate-50/50 transition focus:scale-[1.01] dark:bg-slate-950/50" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Dịch vụ</span>
                <select name="serviceId" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm font-medium transition focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950/50">
                  <option value="">Tư vấn tổng quát</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Bác sĩ</span>
                <select name="doctorId" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm font-medium transition focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950/50">
                  <option value="">Để phòng khám sắp xếp</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>{doctor.fullName}</option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Ghi chú</span>
                <textarea name="notes" className="min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm font-medium outline-none transition focus:scale-[1.01] focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950/50" />
              </label>
            </div>
            {message ? (
              <div className="mt-6 rounded-xl bg-green-50 p-4 dark:bg-green-900/30">
                <p className="text-sm font-bold text-green-700 dark:text-green-400">{message}</p>
              </div>
            ) : null}
            <Button disabled={saving} className="mt-8 h-14 w-full rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-blue-500/40">
              {saving ? "Đang tạo lịch hẹn..." : "Tạo lịch hẹn ngay"}
            </Button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
