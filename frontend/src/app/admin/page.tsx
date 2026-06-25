"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, CircleDollarSign, RefreshCw, Stethoscope, Users, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGet, formatCurrency, formatDate } from "@/lib/api";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type DashboardAppointment = {
  id: string;
  date: string;
  status: string;
  customer?: { fullName?: string };
  doctor?: { fullName?: string };
  services?: { service?: { name?: string } }[];
};

type DashboardData = {
  patients: number;
  appointments: number;
  revenue: number;
  doctors: number;
  upcoming: DashboardAppointment[];
};

const emptyDashboard: DashboardData = {
  patients: 0,
  appointments: 0,
  revenue: 0,
  doctors: 0,
  upcoming: [],
};

const statusLabel: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>(emptyDashboard);
  const [loading, setLoading] = useState(true);

  const handleRefresh = async () => {
    setLoading(true);
    const data = await apiGet<DashboardData>("/dashboard", emptyDashboard);
    setDashboard(data);
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchDashboard = async () => {
      const data = await apiGet<DashboardData>("/dashboard", emptyDashboard);
      if (!ignore) {
        setDashboard(data);
        setLoading(false);
      }
    };
    fetchDashboard();
    return () => { ignore = true; };
  }, []);

  const stats = useMemo(
    () => [
      { title: "Tổng bệnh nhân", value: dashboard.patients.toLocaleString("vi-VN"), icon: Users, color: "text-blue-600 dark:text-cyan-400", bg: "bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-cyan-900/20", href: "/admin/patients" },
      { title: "Tổng lịch hẹn", value: dashboard.appointments.toLocaleString("vi-VN"), icon: CalendarDays, color: "text-amber-600 dark:text-amber-400", bg: "bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-orange-900/20", href: "/admin/appointments" },
      { title: "Tổng doanh thu", value: formatCurrency(dashboard.revenue), icon: CircleDollarSign, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-teal-900/20", href: "/admin/invoices" },
      { title: "Bác sĩ", value: dashboard.doctors.toLocaleString("vi-VN"), icon: Stethoscope, color: "text-violet-600 dark:text-violet-400", bg: "bg-linear-to-br from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-purple-900/20", href: "/admin/doctors" },
    ],
    [dashboard],
  );

  return (
    <div className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-5 md:p-6 lg:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-md mb-3">
            <Activity className="h-3.5 w-3.5" />
            Live Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">Tổng quan phòng khám</h1>
          <p className="mt-2 text-sm font-medium text-slate-300">Báo cáo hoạt động theo thời gian thực từ cơ sở dữ liệu SMILEE.</p>
        </div>
        <div className="relative z-10">
          <Button onClick={handleRefresh} disabled={loading} variant="outline" className="h-10 md:h-11 lg:h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-4 md:px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới dữ liệu
          </Button>
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.title} whileHover={{ y: -6, scale: 1.02 }}>
            <Link href={stat.href} className="block h-full">
              <div className="group h-full rounded-3xl border border-slate-200/60 bg-white/80 p-5 md:p-6 shadow-sm backdrop-blur-md transition-all hover:border-blue-300 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/60 dark:hover:border-cyan-800/50 relative overflow-hidden">
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} shadow-inner`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 dark:text-slate-600" />
                </div>
                <h3 className="relative z-10 mb-1 text-sm font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">{stat.title}</h3>
                <p className="relative z-10 text-3xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-slate-900 group-hover:to-blue-600 dark:group-hover:from-white dark:group-hover:to-cyan-400 transition-all">
                  {loading ? "..." : stat.value}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Reveal direction="up" className="xl:col-span-2 h-full">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/60 overflow-hidden">
            <div className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 md:px-6 md:py-5 dark:border-slate-800/50 dark:bg-slate-900/50">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Lịch khám sắp tới</h2>
              <Link href="/admin/appointments" className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 transition-colors">
                Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-4">
                {dashboard.upcoming.length ? (
                  dashboard.upcoming.map((apt) => {
                    const serviceNames = apt.services?.map((item) => item.service?.name).filter(Boolean).join(", ") || "Chưa chọn dịch vụ";
                    const isConfirmed = apt.status === 'CONFIRMED';
                    
                    return (
                      <div key={apt.id} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className={`flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 flex-col items-center justify-center rounded-xl border shadow-sm transition-colors ${isConfirmed ? 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50' : 'bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700'}`}>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Lịch</span>
                            <span className={`text-[10px] font-black uppercase text-center leading-tight mt-0.5 px-1 ${isConfirmed ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300'}`}>
                              {statusLabel[apt.status] ?? apt.status}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="truncate text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{apt.customer?.fullName ?? "Khách hàng"}</h4>
                            <p className="mt-1 truncate text-xs font-bold text-slate-500">{serviceNames}</p>
                            <p className="mt-0.5 flex items-center gap-1 truncate text-xs font-semibold text-slate-400">
                              <CalendarDays className="h-3 w-3" />
                              {formatDate(apt.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="hidden items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:flex">
                            <Stethoscope className="h-3.5 w-3.5" />
                            {apt.doctor?.fullName ?? "Chưa phân bác sĩ"}
                          </span>
                          <Button asChild variant="outline" size="sm" className="h-9 rounded-xl border-slate-200 px-4 text-xs font-bold shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                            <Link href="/admin/appointments">
                              Xử lý
                              <ChevronRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/30">
                    <CalendarDays className="mb-3 h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-bold text-slate-500">Chưa có lịch hẹn nào sắp tới.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2} className="h-full">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/60 bg-linear-to-br from-white/80 to-slate-50/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:from-slate-900/80 dark:to-slate-950/80 overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4 md:px-6 md:py-5 dark:border-slate-800/50 dark:bg-slate-900/50">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Trạng thái hệ thống</h2>
            </div>
            <div className="p-5 md:p-6 flex-1">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <div className="h-2.5 w-2.5 rounded-full bg-current animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kết nối Backend</h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                      Dashboard đang lấy dữ liệu live từ cơ sở dữ liệu. Mọi thay đổi sẽ được phản hồi tức thì.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dữ liệu</h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                      Chuyển sang các tab quản trị chuyên sâu để thêm/sửa/xóa hồ sơ bệnh nhân, lịch hẹn, và dịch vụ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
