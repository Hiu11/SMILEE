"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, CalendarDays, Mail, Phone, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const doctors = [
  {
    name: "BS. Nguyễn Tuấn",
    specialty: "Cấy ghép Implant",
    experience: "15 năm",
    image: "/pic/dentist1.png",
    phone: "0901 234 567",
    email: "tuan.nguyen@smilee.vn",
  },
  {
    name: "BS. Lê Thu Trang",
    specialty: "Chỉnh nha và niềng răng",
    experience: "10 năm",
    image: "/pic/dentist2.png",
    phone: "0902 345 678",
    email: "trang.le@smilee.vn",
  },
  {
    name: "BS. Trần Mạnh Hùng",
    specialty: "Nha khoa tổng quát",
    experience: "8 năm",
    image: "/pic/dentist3.png",
    phone: "0903 456 789",
    email: "hung.tran@smilee.vn",
  },
];

export default function DoctorsPage() {
  return (
    <div className="bg-white pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal direction="left">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Đội ngũ nha sĩ</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Chuyên môn vững, theo sát từng kế hoạch điều trị.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Mỗi bác sĩ tại SMILEE phụ trách một nhóm chuyên môn rõ ràng, phối hợp cùng lễ tân và hồ sơ điện tử để lịch khám, chẩn đoán và tái khám luôn nhất quán.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-blue-600 px-7 text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1 hover:bg-blue-700">
                <Link href="/booking">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Đặt lịch với nha sĩ
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-7 transition hover:-translate-y-1">
                <Link href="/services">Xem dịch vụ</Link>
              </Button>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {doctors.map((doctor, index) => (
              <StaggerItem key={doctor.email} whileHover={{ y: -10, scale: 1.015 }}>
                <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-900">
                  <Float delay={index * 0.35} className="relative mx-auto mt-5 h-44 w-44 sm:h-36 sm:w-full lg:h-48">
                    <Image src={doctor.image} alt={doctor.name} fill className="object-contain drop-shadow-xl transition duration-500 group-hover:scale-105" />
                  </Float>
                  <div className="p-5">
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{doctor.name}</h2>
                    <p className="mt-1 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400">
                      <Stethoscope className="h-4 w-4" />
                      {doctor.specialty}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-bold text-slate-500 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {doctor.experience}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        4.9
                      </span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {doctors.map((doctor) => (
            <StaggerItem key={doctor.phone} whileHover={{ y: -6, scale: 1.01 }}>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h3 className="font-extrabold text-slate-900 dark:text-white">{doctor.name}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">{doctor.specialty}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <Phone className="h-4 w-4 text-blue-600" />
                  {doctor.phone}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <Mail className="h-4 w-4 text-blue-600" />
                  {doctor.email}
                </p>
              </section>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
