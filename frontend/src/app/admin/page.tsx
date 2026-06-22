"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, CircleDollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Tổng bệnh nhân", value: "1,245", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-100", href: "/admin/patients" },
  { title: "Lịch hôm nay", value: "48", change: "+5", icon: CalendarDays, color: "text-amber-600", bg: "bg-amber-100", href: "/admin/appointments" },
  { title: "Doanh thu tháng", value: "320M", change: "+15%", icon: CircleDollarSign, color: "text-green-600", bg: "bg-green-100", href: "/admin/invoices" },
  { title: "Khách mới", value: "12%", change: "+2%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", href: "/admin/accounts" },
];

const upcoming = [
  { name: "Trần Văn A", time: "09:00", service: "Bọc răng sứ", doctor: "BS. Tuấn" },
  { name: "Mai Linh", time: "09:30", service: "Tẩy trắng răng", doctor: "BS. Trang" },
  { name: "Lê Quang", time: "10:00", service: "Khám tổng quát", doctor: "BS. Hùng" },
  { name: "Phạm Thảo", time: "10:30", service: "Cạo vôi răng", doctor: "BS. Tuấn" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-5 pb-2">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Tổng quan</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Báo cáo hoạt động phòng khám hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} transition={{ delay: index * 0.08 }}>
            <Link href={stat.href}>
              <Card className="border-slate-200 shadow-sm transition hover:shadow-md dark:border-slate-800">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="mb-1 text-xs font-semibold text-slate-500">{stat.title}</h3>
                  <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="border-slate-200 shadow-sm dark:border-slate-800 xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between px-4 pb-2 pt-4">
            <CardTitle className="text-base font-extrabold">Lịch khám sắp tới</CardTitle>
            <Link href="/admin/appointments" className="text-xs font-semibold text-blue-600 hover:underline">Xem tất cả</Link>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="mt-2 space-y-3">
              {upcoming.map((apt) => (
                <div key={`${apt.time}-${apt.name}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Giờ</span>
                      <span className="text-xs font-black text-blue-600">{apt.time}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">{apt.name}</h4>
                      <p className="mt-0.5 truncate text-xs font-medium text-slate-500">{apt.service}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400 sm:inline-flex">{apt.doctor}</span>
                    <Button asChild variant="outline" size="sm" className="h-8 rounded-full px-3 text-xs">
                      <Link href="/admin/appointments">
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                        Xử lý
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full border-slate-200 shadow-sm dark:border-slate-800">
          <CardHeader className="px-4 pb-2 pt-4">
            <CardTitle className="text-base font-extrabold">Bác sĩ nổi bật</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="mt-2 space-y-3">
              {[
                { name: "BS. Nguyễn Tuấn", role: "Trưởng khoa", patients: 124 },
                { name: "BS. Lê Trang", role: "Chỉnh nha", patients: 98 },
                { name: "BS. Trần Hùng", role: "Implant", patients: 85 },
              ].map((doc) => (
                <Link key={doc.name} href="/admin/doctors" className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50 dark:hover:bg-slate-900">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-md">
                    {doc.name.split(" ").pop()?.[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{doc.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white">{doc.patients}</p>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Ca khám</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
