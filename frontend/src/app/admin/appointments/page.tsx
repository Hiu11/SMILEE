"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock, Filter, Plus, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Appointment = {
  id: number;
  date: number;
  time: string;
  name: string;
  service: string;
  status: "completed" | "pending" | "cancelled";
  doctor: string;
};

const initialAppointments: Appointment[] = [
  { id: 1, date: 17, time: "09:30", name: "Nguyễn Trọng Hiếu", service: "Nhổ răng khôn", status: "completed", doctor: "BS. Tuấn" },
  { id: 2, date: 17, time: "09:30", name: "Trần Mai Linh", service: "Tẩy trắng răng", status: "pending", doctor: "BS. Trang" },
  { id: 3, date: 17, time: "10:00", name: "Lê Văn Quang", service: "Khám tổng quát", status: "pending", doctor: "BS. Hùng" },
  { id: 4, date: 18, time: "10:30", name: "Hoàng Trọng Hiếu", service: "Tái khám niềng răng", status: "cancelled", doctor: "BS. Trang" },
  { id: 5, date: 19, time: "11:00", name: "Phạm Thảo Lê", service: "Bọc răng sứ", status: "pending", doctor: "BS. Tuấn" },
  { id: 6, date: 19, time: "11:30", name: "Đinh Hoàng Nhật", service: "Cạo vôi răng", status: "pending", doctor: "BS. Hùng" },
];

const statusConfig = {
  completed: { color: "text-green-600", bg: "bg-green-100", border: "border-green-200", icon: CheckCircle2, label: "Hoàn thành" },
  cancelled: { color: "text-red-600", bg: "bg-red-100", border: "border-red-200", icon: XCircle, label: "Đã hủy" },
  pending: { color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200", icon: AlertCircle, label: "Chờ xác nhận" },
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedDate, setSelectedDate] = useState(17);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Appointment["status"]>("all");
  const [view, setView] = useState<"day" | "week">("day");

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchDate = view === "week" || apt.date === selectedDate;
      const matchStatus = status === "all" || apt.status === status;
      const matchQuery = `${apt.name} ${apt.service} ${apt.doctor}`.toLowerCase().includes(query.toLowerCase());
      return matchDate && matchStatus && matchQuery;
    });
  }, [appointments, query, selectedDate, status, view]);

  const updateStatus = (id: number, nextStatus: Appointment["status"]) => {
    setAppointments((current) => current.map((apt) => (apt.id === id ? { ...apt, status: nextStatus } : apt)));
  };

  const times = Array.from(new Set(filtered.map((apt) => apt.time))).sort();

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Quản lý lịch hẹn</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Theo dõi và sắp xếp lịch khám cho bệnh nhân.</p>
        </div>
        <Button asChild className="h-10 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700">
          <Link href="/booking">
            <Plus className="mr-2 h-5 w-5" />
            Thêm lịch hẹn
          </Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardContent className="flex flex-col gap-3 p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm bệnh nhân, dịch vụ..." className="h-9 rounded-lg bg-slate-50 pl-10 dark:bg-slate-900" />
            </div>
            <Button variant={status === "all" ? "default" : "outline"} className="h-9 rounded-lg px-3 text-xs" onClick={() => setStatus(status === "all" ? "pending" : "all")}>
              <Filter className="mr-2 h-4 w-4" />
              {status === "all" ? "Tất cả" : "Chờ xác nhận"}
            </Button>
          </div>
          <div className="flex w-full gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-900 md:w-auto">
            <Button variant={view === "day" ? "default" : "ghost"} className="h-8 flex-1 rounded-lg px-3 text-xs md:flex-none" onClick={() => setView("day")}>Theo ngày</Button>
            <Button variant={view === "week" ? "default" : "ghost"} className="h-8 flex-1 rounded-lg px-3 text-xs md:flex-none" onClick={() => setView("week")}>Theo tuần</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex min-h-125 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 md:flex-row">
        <aside className="w-full shrink-0 border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 md:w-56 md:border-b-0 md:border-r">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-600">
            <CalendarIcon className="h-5 w-5" />
            Chọn ngày xem
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => <div key={day} className="py-2 text-xs font-bold text-slate-400">{day}</div>)}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              return (
                <button key={day} onClick={() => setSelectedDate(day)} className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold transition ${selectedDate === day ? "bg-blue-600 text-white shadow-md" : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"}`}>
                  {day}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 overflow-x-auto p-4">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
            <Clock className="h-5 w-5 text-blue-500" />
            {view === "day" ? `Lịch ngày ${selectedDate}/10/2025` : "Lịch trong tuần"}
          </h2>
          <div className="flex min-w-max gap-4 pb-4">
            {(times.length ? times : ["Trống"]).map((time) => (
              <section key={time} className="w-72 shrink-0">
                <div className="mb-3 border-b-2 border-slate-100 pb-3 text-xl font-black tracking-tight text-slate-300 dark:border-slate-800 dark:text-slate-700">{time}</div>
                <div className="space-y-3">
                  {filtered.filter((apt) => apt.time === time).map((apt) => {
                    const config = statusConfig[apt.status];
                    const Icon = config.icon;
                    return (
                      <article key={apt.id} className={`relative overflow-hidden rounded-xl border bg-white p-3 shadow-sm dark:bg-slate-900 ${config.border}`}>
                        <div className={`absolute inset-y-0 left-0 w-1.5 ${config.bg}`} />
                        <div className="ml-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">{apt.name}</h3>
                          <p className="text-sm font-medium text-slate-500">{apt.service}</p>
                          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">{apt.doctor}</span>
                            <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${config.bg} ${config.color}`}><Icon className="h-3.5 w-3.5" />{config.label}</span>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <Button size="sm" className="h-8 rounded-lg bg-green-600 text-xs text-white hover:bg-green-700" onClick={() => updateStatus(apt.id, "completed")}>Hoàn tất</Button>
                            <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs text-red-600" onClick={() => updateStatus(apt.id, "cancelled")}>Hủy</Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                  {!filtered.some((apt) => apt.time === time) ? <div className="flex min-h-28 items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 text-sm font-medium text-slate-400 dark:border-slate-800">Trống</div> : null}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
