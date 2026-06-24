"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, Clock, Filter, Plus, ReceiptText, RefreshCw, Search, XCircle, ChevronRight } from "lucide-react";
import { apiGet, apiPatch, formatCurrency, formatDate } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Appointment = {
  id: string;
  date: string;
  notes?: string;
  status: AppointmentStatus;
  customer?: { fullName?: string; phone?: string; email?: string };
  doctor?: { fullName?: string };
  services?: { service?: { name?: string } }[];
  invoice?: { id: string; totalAmount: number; status: string } | null;
};

const statusConfig = {
  PENDING: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100/50 dark:bg-amber-900/30", border: "border-amber-200 dark:border-amber-800/50", icon: AlertCircle, label: "Chờ xác nhận" },
  CONFIRMED: { color: "text-blue-600 dark:text-cyan-400", bg: "bg-blue-100/50 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800/50", icon: CheckCircle2, label: "Đã xác nhận" },
  COMPLETED: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100/50 dark:bg-emerald-900/30", border: "border-emerald-200 dark:border-emerald-800/50", icon: CheckCircle2, label: "Hoàn thành" },
  CANCELLED: { color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100/50 dark:bg-rose-900/30", border: "border-rose-200 dark:border-rose-800/50", icon: XCircle, label: "Đã hủy" },
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AppointmentStatus>("all");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const handleRefresh = async () => {
    setLoading(true);
    const data = await apiGet<Appointment[]>("/appointments", []);
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchAppointments = async () => {
      const data = await apiGet<Appointment[]>("/appointments", []);
      if (!ignore) {
        setAppointments(data);
        setLoading(false);
      }
    };
    fetchAppointments();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return appointments.filter((apt) => {
      const services = apt.services?.map((item) => item.service?.name).join(" ") ?? "";
      const matchQuery = !keyword || `${apt.customer?.fullName ?? ""} ${apt.customer?.phone ?? ""} ${apt.doctor?.fullName ?? ""} ${services} ${apt.notes ?? ""}`.toLowerCase().includes(keyword);
      const matchStatus = status === "all" || apt.status === status;
      return matchStatus && matchQuery;
    });
  }, [appointments, query, status]);

  const updateStatus = async (id: string, nextStatus: AppointmentStatus) => {
    setNotice("");
    const updated = await apiPatch<Appointment>(`/appointments/${id}`, { status: nextStatus });
    setAppointments((current) => current.map((apt) => (apt.id === id ? { ...apt, ...updated } : apt)));
    setNotice(
      nextStatus === "COMPLETED" && updated.invoice
        ? `Đã hoàn thành lịch hẹn và tạo hóa đơn ${formatCurrency(updated.invoice.totalAmount)}.`
        : `Đã cập nhật lịch hẹn sang trạng thái "${statusConfig[nextStatus].label}".`,
    );
  };

  return (
    <div className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md mb-3">
            <CalendarDays className="h-3.5 w-3.5" />
            Quản trị Lịch hẹn
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">Điều phối lịch khám</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">Theo dõi, xác nhận và cập nhật trạng thái lịch khám. Hóa đơn sẽ được tạo tự động khi hoàn thành lịch.</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button onClick={handleRefresh} disabled={loading} variant="outline" className="h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button asChild className="h-12 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-6 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all font-bold">
            <Link href="/booking">
              <Plus className="mr-2 h-5 w-5" />
              Tạo lịch hẹn
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <Card className="border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 rounded-3xl overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={query} 
                  onChange={(event) => setQuery(event.target.value)} 
                  placeholder="Tìm bệnh nhân, SĐT, dịch vụ..." 
                  className="h-12 rounded-xl bg-slate-50/50 pl-11 text-sm font-medium transition focus:scale-[1.01] focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" 
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "Tất cả"],
                  ["PENDING", "Chờ xác nhận"],
                  ["CONFIRMED", "Đã xác nhận"],
                  ["COMPLETED", "Hoàn thành"],
                  ["CANCELLED", "Đã hủy"],
                ].map(([value, label]) => (
                  <Button 
                    key={value} 
                    variant={status === value ? "default" : "outline"} 
                    className={`h-10 rounded-xl px-4 text-xs font-bold transition-all ${status === value ? 'bg-slate-800 dark:bg-white dark:text-slate-900 shadow-md' : 'dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-800'}`} 
                    onClick={() => setStatus(value as "all" | AppointmentStatus)}
                  >
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-slate-300">
              Kết quả: <span className="text-blue-600 dark:text-cyan-400 text-lg font-black">{filtered.length}</span>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {notice ? (
        <Reveal direction="up" className="rounded-2xl border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 px-5 py-4 shadow-sm dark:border-green-900/50 dark:from-green-950/40 dark:to-emerald-900/20 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">{notice}</p>
        </Reveal>
      ) : null}

      <Stagger className="grid gap-4">
        {filtered.map((apt) => {
          const config = statusConfig[apt.status];
          const Icon = config.icon;
          const services = apt.services?.map((item) => item.service?.name).filter(Boolean).join(", ") || "Chưa chọn dịch vụ";

          return (
            <StaggerItem key={apt.id}>
              <article className={`group relative overflow-hidden rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-xl dark:bg-slate-900/80 ${config.border} hover:border-blue-300 dark:hover:border-blue-800`}>
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${config.bg} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-sm ${config.bg} ${config.color} ${config.border}`}>
                        <Icon className="h-4 w-4" />
                        {config.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/50 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                        {formatDate(apt.date)}
                      </span>
                      {apt.invoice ? (
                        <Link href="/admin/invoices" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm transition-transform hover:scale-105 dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-400">
                          <ReceiptText className="h-4 w-4" />
                          Hóa đơn {formatCurrency(apt.invoice.totalAmount)}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : null}
                    </div>
                    
                    <div>
                      <h3 className="truncate text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{apt.customer?.fullName ?? "Khách hàng"}</h3>
                      <div className="mt-2 flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {services}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                          BS: <span className="font-bold">{apt.doctor?.fullName ?? "Chưa phân công"}</span>
                        </div>
                      </div>
                    </div>
                    
                    {apt.notes ? (
                      <div className="mt-1 max-w-2xl rounded-xl bg-slate-50/50 p-3 text-xs font-medium italic text-slate-500 dark:bg-slate-900/30">
                        &quot; {apt.notes} &quot;
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Button size="sm" variant="outline" className="h-10 rounded-xl px-4 text-xs font-bold shadow-sm hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-cyan-400" onClick={() => updateStatus(apt.id, "CONFIRMED")}>
                      <CheckCircle2 className="mr-1.5 h-4 w-4" />
                      Xác nhận
                    </Button>
                    <Button size="sm" className="h-10 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700" onClick={() => updateStatus(apt.id, "COMPLETED")}>
                      <Clock className="mr-1.5 h-4 w-4" />
                      Hoàn thành
                    </Button>
                    <Button size="sm" variant="outline" className="h-10 rounded-xl px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-900/30" onClick={() => updateStatus(apt.id, "CANCELLED")}>
                      <XCircle className="mr-1.5 h-4 w-4" />
                      Hủy hẹn
                    </Button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {!loading && filtered.length === 0 ? (
        <Reveal direction="up" className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">Không có lịch hẹn nào phù hợp</p>
          <p className="mt-1 text-sm font-medium text-slate-500">Thử thay đổi bộ lọc hoặc tạo một lịch hẹn mới.</p>
        </Reveal>
      ) : null}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <RefreshCw className="mb-4 h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu...</p>
        </div>
      ) : null}
    </div>
  );
}
