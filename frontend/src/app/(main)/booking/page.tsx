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
  const router = useRouter();

  useEffect(() => {
    apiGet<Service[]>("/services", []).then(setServices);
    apiGet<User[]>("/users?role=DOCTOR", []).then(setDoctors);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      await apiPost("/messages", {
        fullName: form.get("fullName"),
        phone: form.get("phone"),
        email: form.get("email"),
        subject: "Yêu cầu đặt lịch khám",
        message: `Dịch vụ: ${form.get("serviceName")}. Bác sĩ: ${form.get("doctorName")}. Thời gian: ${form.get("date")} ${form.get("time")}. Ghi chú: ${form.get("notes")}`,
      });
      setMessage("Đã gửi yêu cầu đặt lịch. Lễ tân sẽ liên hệ xác nhận sớm.");
      event.currentTarget.reset();
      router.push("/confirm-booking");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể gửi yêu cầu đặt lịch.");
    }
  };

  return (
    <div className="bg-slate-50 pt-28 dark:bg-slate-950">
      <section className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal direction="left" className="flex flex-col justify-center">
          <Float className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-cyan-400">
            <CalendarDays className="h-4 w-4" />
            Đặt lịch khám
          </Float>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Chọn thời gian phù hợp, SMILEE lo phần còn lại.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Gửi yêu cầu đặt lịch nhanh cho lễ tân. Dữ liệu được lưu vào hệ thống hỗ trợ để phòng khám xác nhận, phân bác sĩ và tạo lịch hẹn chính thức.
          </p>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [Stethoscope, "Bác sĩ chuyên khoa"],
              [Clock, "Xác nhận nhanh"],
              [CheckCircle2, "Theo dõi trên admin"],
            ].map(([Icon, text]) => (
              <StaggerItem key={String(text)} whileHover={{ y: -6, scale: 1.02 }}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <Icon className="mb-3 h-6 w-6 text-blue-600" />
                  {String(text)}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal direction="right">
          <form onSubmit={submit} className="self-center rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Họ tên</span>
                <Input name="fullName" required className="h-11 rounded-xl transition focus:scale-[1.01]" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Điện thoại</span>
                <Input name="phone" required className="h-11 rounded-xl transition focus:scale-[1.01]" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Email</span>
                <Input name="email" type="email" className="h-11 rounded-xl transition focus:scale-[1.01]" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Ngày khám</span>
                <Input name="date" type="date" required className="h-11 rounded-xl transition focus:scale-[1.01]" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Giờ khám</span>
                <Input name="time" type="time" required className="h-11 rounded-xl transition focus:scale-[1.01]" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Dịch vụ</span>
                <select name="serviceName" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950">
                  <option>Tư vấn tổng quát</option>
                  {services.map((service) => (
                    <option key={service.id}>{service.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Bác sĩ</span>
                <select name="doctorName" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950">
                  <option>Để phòng khám sắp xếp</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id}>{doctor.fullName}</option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Ghi chú</span>
                <textarea name="notes" className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:scale-[1.01] focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950" />
              </label>
            </div>
            {message ? <p className="mt-4 text-sm font-bold text-blue-700 dark:text-cyan-400">{message}</p> : null}
            <Button className="mt-6 h-12 w-full rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-700">
              Gửi yêu cầu đặt lịch
            </Button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
