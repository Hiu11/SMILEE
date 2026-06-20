"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  CalendarDays, 
  TrendingUp, 
  CircleDollarSign,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Tổng Bệnh Nhân", value: "1,245", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Lịch Khám Hôm Nay", value: "48", change: "+5", icon: CalendarDays, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Doanh Thu Tháng", value: "320M", change: "+15%", icon: CircleDollarSign, color: "text-green-600", bg: "bg-green-100" },
  { title: "Khách Mới Tăng", value: "12%", change: "+2%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tổng Quan</h1>
        <p className="text-slate-500 mt-1 font-medium">Báo cáo hoạt động phòng khám hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-opacity-20`}>
                    <stat.icon className={`w-6 h-6 ${stat.color} dark:${stat.color.replace('600', '400')}`} />
                  </div>
                  <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.title}</h3>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-extrabold">Lịch Khám Sắp Tới</CardTitle>
              <button className="text-blue-600 font-semibold text-sm hover:underline">Xem tất cả</button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-500 uppercase">Th 4</span>
                        <span className="text-lg font-black text-blue-600">12</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">Trần Văn A</h4>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">09:00 AM • Bọc răng sứ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-flex px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400">
                        BS. Tuấn
                      </span>
                      <button title="Tùy chọn" aria-label="Tùy chọn" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg font-extrabold">Bác sĩ nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-2">
                {[
                  { name: "BS. Nguyễn Tuấn", role: "Trưởng khoa", patients: 124 },
                  { name: "BS. Lê Trang", role: "Chỉnh nha", patients: 98 },
                  { name: "BS. Trần Hùng", role: "Implant", patients: 85 },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                      {doc.name.split(' ').pop()?.[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{doc.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{doc.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{doc.patients}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Ca Khám</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
