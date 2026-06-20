"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data based on the original HTML structure
const timeSlots = [
  { time: "09:00", appointments: [] },
  { 
    time: "09:30", 
    appointments: [
      { id: 1, name: "Nguyễn Trọng Hiếu", service: "Nhổ răng khôn", status: "completed", doctor: "BS. Tuấn" },
      { id: 2, name: "Trần Mai Linh", service: "Tẩy trắng răng", status: "pending", doctor: "BS. Trang" }
    ] 
  },
  { 
    time: "10:00", 
    appointments: [
      { id: 3, name: "Lê Văn Quang", service: "Khám tổng quát", status: "pending", doctor: "BS. Hùng" }
    ] 
  },
  { 
    time: "10:30", 
    appointments: [
      { id: 4, name: "Hoàng Trọng Hiếu", service: "Tái khám niềng răng", status: "cancelled", doctor: "BS. Trang" }
    ] 
  },
  { 
    time: "11:00", 
    appointments: [
      { id: 5, name: "Phạm Thảo Lê", service: "Bọc răng sứ", status: "pending", doctor: "BS. Tuấn" }
    ] 
  },
  { 
    time: "11:30", 
    appointments: [
      { id: 6, name: "Đinh Hoàng Nhật", service: "Cạo vôi răng", status: "pending", doctor: "BS. Hùng" }
    ] 
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed': return { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800', icon: CheckCircle2, label: 'Hoàn thành' };
    case 'cancelled': return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800', icon: XCircle, label: 'Đã hủy' };
    default: return { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800', icon: AlertCircle, label: 'Chưa đến' };
  }
};

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState("Hôm nay, 17 Thg 10 2025");

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quản Lý Lịch Hẹn</h1>
          <p className="text-slate-500 mt-1 font-medium">Theo dõi và sắp xếp lịch khám cho bệnh nhân.</p>
        </div>
        <Button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md shadow-blue-500/20 rounded-xl h-11 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Thêm lịch hẹn
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-950">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Tìm kiếm bệnh nhân..." 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 dark:border-slate-800">
              <Filter className="w-4 h-4 mr-2" /> Lọc
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-full md:w-auto">
            <Button variant="ghost" className="h-9 px-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-cyan-400 font-bold">
              Theo Ngày
            </Button>
            <Button variant="ghost" className="h-9 px-4 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white">
              Theo Tuần
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Schedule Board */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Date Selector Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shrink-0">
          <div className="flex items-center gap-3 text-blue-600 dark:text-cyan-400 font-bold mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Chọn ngày xem</span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tháng / Năm</label>
              <select title="Chọn tháng năm" aria-label="Chọn tháng năm" className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tháng 10, 2025</option>
                <option>Tháng 11, 2025</option>
                <option>Tháng 12, 2025</option>
              </select>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
                <div key={d} className="text-xs font-bold text-slate-400 py-2">{d}</div>
              ))}
              {Array.from({length: 31}).map((_, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                    i + 1 === 17 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Area */}
        <div className="flex-1 p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Lịch trình: {selectedDate}
            </h2>
          </div>

          <div className="flex gap-6 min-w-max pb-4">
            {timeSlots.map((slot, index) => (
              <motion.div 
                key={slot.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-72 shrink-0 flex flex-col"
              >
                {/* Time Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-950 pb-4 z-10 border-b-2 border-slate-100 dark:border-slate-800 mb-4">
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 tracking-tighter">
                    {slot.time}
                  </span>
                </div>

                {/* Appointments in this timeslot */}
                <div className="space-y-4 flex-1">
                  {slot.appointments.length === 0 ? (
                    <div className="h-full border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center min-h-[100px]">
                      <span className="text-sm text-slate-400 font-medium">Trống</span>
                    </div>
                  ) : (
                    slot.appointments.map(apt => {
                      const status = getStatusConfig(apt.status);
                      return (
                        <div key={apt.id} className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${status.border}`}>
                          {/* Decorative Side Line */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${status.bg}`} />
                          
                          <div className="flex justify-between items-start mb-3 ml-2">
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-base">{apt.name}</h4>
                              <p className="text-sm text-slate-500 font-medium">{apt.service}</p>
                            </div>
                            <button title="Tùy chọn" aria-label="Tùy chọn" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 ml-2">
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                              {apt.doctor}
                            </span>
                            <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                              <status.icon className="w-3.5 h-3.5" />
                              {status.label}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
