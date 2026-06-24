"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, CalendarDays, Mail, Phone, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const doctors = [
  { name: "BS. Nguyễn Tuấn", specialty: "Cấy ghép Implant", experience: "15 năm", image: "/pic/dentist1.png", phone: "0901 234 567", email: "tuan.nguyen@smilee.vn", rating: 4.9, patients: "2,400+" },
  { name: "BS. Lê Thu Trang", specialty: "Chỉnh nha & Niềng răng", experience: "10 năm", image: "/pic/dentist2.png", phone: "0902 345 678", email: "trang.le@smilee.vn", rating: 5.0, patients: "1,800+" },
  { name: "BS. Trần Mạnh Hùng", specialty: "Nha khoa tổng quát", experience: "8 năm", image: "/pic/dentist3.png", phone: "0903 456 789", email: "hung.tran@smilee.vn", rating: 4.8, patients: "3,200+" },
];

export default function DoctorsPage() {
  return (
    <div className="bg-linear-to-b from-slate-50 to-white pt-28 dark:from-slate-950 dark:to-slate-950">

      {/* ── HEADER ── */}
      <section className="container mx-auto px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal direction="left">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
              Đội ngũ nha sĩ
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Chuyên môn vững —{" "}
              <span className="gradient-text">theo sát từng kế hoạch điều trị.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
              Mỗi bác sĩ tại SMILEE phụ trách một nhóm chuyên môn rõ ràng, phối hợp cùng lễ tân và hồ sơ điện tử để lịch khám luôn nhất quán.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-8 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1">
                <Link href="/booking">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Đặt lịch với nha sĩ
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-8 transition hover:-translate-y-1">
                <Link href="/services">Xem dịch vụ</Link>
              </Button>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[["50+", "Chuyên gia"], ["10k+", "Khách hàng"], ["15+", "Năm KN"], ["99%", "Hài lòng"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-4xl font-black gradient-text">{n}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DOCTOR CARDS ── */}
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <Stagger className="grid gap-8 md:grid-cols-3">
          {doctors.map((doctor, i) => (
            <StaggerItem key={doctor.email} whileHover={{ y: -10 }}>
              <article className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-blue-500/12 dark:border-slate-800 dark:bg-slate-900">
                {/* Image bg gradient */}
                <div className="relative h-52 overflow-hidden bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-slate-900">
                  <div className="absolute inset-0 dot-grid opacity-30" />
                  <Float delay={i * 0.4} className="relative h-full w-full">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-contain object-bottom drop-shadow-xl transition duration-500 group-hover:scale-105"
                    />
                  </Float>
                </div>

                <div className="p-6">
                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(doctor.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{doctor.rating}</span>
                    <span className="text-xs text-slate-400">({doctor.patients} bệnh nhân)</span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{doctor.name}</h2>
                  <p className="mt-1.5 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400">
                    <Stethoscope className="h-4 w-4" />
                    {doctor.specialty}
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700 dark:bg-blue-900/30 dark:text-cyan-300">
                      <Award className="h-3.5 w-3.5" />
                      {doctor.experience}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Phone className="h-3.5 w-3.5 text-blue-500" /> {doctor.phone}
                    </p>
                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Mail className="h-3.5 w-3.5 text-blue-500" /> {doctor.email}
                    </p>
                  </div>

                  <Button asChild className="mt-5 w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-sm hover:opacity-90">
                    <Link href="/booking">Đặt lịch khám</Link>
                  </Button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── CTA DARK ── */}
      <section className="bg-slate-950 py-20">
        <Reveal className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white">Chưa biết chọn bác sĩ nào?</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">Đặt lịch tư vấn tổng quát — lễ tân sẽ sắp xếp bác sĩ phù hợp với tình trạng của bạn.</p>
          <Button asChild className="mt-8 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-10 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1">
            <Link href="/booking">
              <CalendarDays className="mr-2 h-4 w-4" />
              Đặt lịch ngay
            </Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
