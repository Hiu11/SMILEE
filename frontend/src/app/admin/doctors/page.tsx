"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Star,
  Phone,
  Mail,
  Stethoscope,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const doctors = [
  { id: "NS001", name: "Nguyễn Tuấn", specialty: "Chuyên khoa Implant", experience: "15 năm", rating: 4.9, patients: 1245, phone: "0901 234 567", email: "tuan.nguyen@smilee.com", status: "active", avatarColor: "from-blue-500 to-cyan-500" },
  { id: "NS002", name: "Lê Thu Trang", specialty: "Chỉnh nha (Niềng răng)", experience: "10 năm", rating: 4.8, patients: 850, phone: "0902 345 678", email: "trang.le@smilee.com", status: "active", avatarColor: "from-purple-500 to-pink-500" },
  { id: "NS003", name: "Trần Mạnh Hùng", specialty: "Nha khoa tổng quát", experience: "8 năm", rating: 4.7, patients: 920, phone: "0903 456 789", email: "hung.tran@smilee.com", status: "on_leave", avatarColor: "from-amber-500 to-orange-500" },
  { id: "NS004", name: "Phạm Hoàng My", specialty: "Nha khoa trẻ em", experience: "5 năm", rating: 5.0, patients: 430, phone: "0904 567 890", email: "my.pham@smilee.com", status: "active", avatarColor: "from-emerald-500 to-teal-500" },
  { id: "NS005", name: "Hoàng Văn Quyết", specialty: "Phẫu thuật hàm mặt", experience: "12 năm", rating: 4.9, patients: 670, phone: "0905 678 901", email: "quyet.hoang@smilee.com", status: "active", avatarColor: "from-indigo-500 to-blue-500" },
  { id: "NS006", name: "Đỗ Thị Lan", specialty: "Thẩm mỹ răng sứ", experience: "7 năm", rating: 4.8, patients: 510, phone: "0906 789 012", email: "lan.do@smilee.com", status: "active", avatarColor: "from-rose-500 to-red-500" },
];

export default function DoctorsPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quản Lý Nha Sĩ</h1>
          <p className="text-slate-500 mt-1 font-medium">Theo dõi danh sách bác sĩ, lịch trực và hiệu suất công việc.</p>
        </div>
        <Button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md shadow-blue-500/20 rounded-xl h-11 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Thêm nha sĩ mới
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-950">
          <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Tìm kiếm theo Tên, Chuyên khoa..." 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 dark:border-slate-800">
              <Filter className="w-4 h-4 mr-2" /> Lọc danh sách
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-slate-50 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500">Tổng cộng:</span> 
            <span className="text-blue-600 dark:text-cyan-400">{doctors.length} Bác sĩ</span>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-white dark:bg-slate-950/50 relative">
              {/* Top Banner Color */}
              <div className={`h-24 bg-linear-to-r ${doctor.avatarColor} opacity-20 dark:opacity-30 absolute top-0 left-0 right-0`} />
              
              <CardContent className="p-6 relative pt-12">
                <div className="flex justify-between items-start mb-4">
                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-2xl bg-linear-to-tr ${doctor.avatarColor} flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/20 ring-4 ring-white dark:ring-slate-950`}>
                    {doctor.name.split(' ').pop()?.[0]}
                  </div>
                  
                  {/* Status & Menu */}
                  <div className="flex items-center gap-2">
                    {doctor.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Đang làm việc
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Đang nghỉ phép
                      </span>
                    )}
                    <button title="Tùy chọn" aria-label="Tùy chọn" className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    BS. {doctor.name}
                  </h3>
                  <p className="text-blue-600 dark:text-cyan-400 font-bold text-sm flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4" />
                    {doctor.specialty}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-slate-800/50 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-900 dark:text-white font-black text-lg">
                      {doctor.rating} <Star className="w-4 h-4 text-amber-500 fill-amber-500 -mt-0.5" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Đánh giá</p>
                  </div>
                  <div className="text-center border-x border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center justify-center gap-1 text-slate-900 dark:text-white font-black text-lg">
                      {doctor.experience.split(' ')[0]} <span className="text-sm font-bold text-slate-500">năm</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Kinh nghiệm</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-900 dark:text-white font-black text-lg">
                      {doctor.patients}+
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Ca khám</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    {doctor.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    {doctor.email}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full mt-6 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 dark:bg-slate-800 dark:hover:bg-cyan-950/30 dark:text-slate-300 dark:hover:text-cyan-400 font-bold rounded-xl h-11 border-none transition-all">
                  Xem hồ sơ chi tiết
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
