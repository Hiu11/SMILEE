"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const appointments = [
  { id: "SM-1024", date: "22/06/2026", time: "09:00", service: "Khám tổng quát", doctor: "BS. Tuấn", status: "confirmed" },
  { id: "SM-1025", date: "28/06/2026", time: "14:30", service: "Tẩy trắng răng", doctor: "BS. Trang", status: "pending" },
  { id: "SM-1018", date: "12/06/2026", time: "10:00", service: "Cạo vôi răng", doctor: "BS. Hùng", status: "completed" },
];

const statusConfig = {
  confirmed: { label: "Đã xác nhận", icon: CheckCircle2, className: "bg-green-100 text-green-700" },
  pending: { label: "Chờ xác nhận", icon: Clock, className: "bg-amber-100 text-amber-700" },
  completed: { label: "Đã hoàn thành", icon: CheckCircle2, className: "bg-blue-100 text-blue-700" },
  cancelled: { label: "Đã hủy", icon: XCircle, className: "bg-red-100 text-red-700" },
};

export default function ManagePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return appointments;
    return appointments.filter((item) => Object.values(item).join(" ").toLowerCase().includes(keyword));
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Quản lý lịch hẹn</h1>
            <p className="mt-2 font-medium text-slate-500">Theo dõi trạng thái lịch hẹn và thông tin bác sĩ phụ trách.</p>
          </div>
          <Button asChild className="h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/booking">Đặt lịch mới</Link>
          </Button>
        </div>

        <Card className="mt-8 border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-0">
            <div className="border-b border-slate-200 p-4 dark:border-slate-800">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo mã, dịch vụ, bác sĩ..." className="h-11 rounded-xl bg-slate-50 pl-10 dark:bg-slate-900" />
              </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => {
                const config = statusConfig[item.status as keyof typeof statusConfig];
                const Icon = config.icon;

                return (
                  <article key={item.id} className="grid gap-4 bg-white p-5 dark:bg-slate-950 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-cyan-400">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-slate-900 dark:text-white">{item.service}</h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {item.id} • {item.date} lúc {item.time} • {item.doctor}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${config.className}`}>
                      <Icon className="h-4 w-4" />
                      {config.label}
                    </span>
                  </article>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
