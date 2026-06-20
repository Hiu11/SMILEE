"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Phone,
  Calendar,
  UserCircle2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const patients = [
  { id: "BN001", name: "Nguyễn Trọng Hiếu", gender: "Nam", dob: "15/04/1995", phone: "0987 654 321", lastVisit: "17/10/2025", totalVisits: 5, status: "active" },
  { id: "BN002", name: "Trần Mai Linh", gender: "Nữ", dob: "22/08/1998", phone: "0912 345 678", lastVisit: "10/10/2025", totalVisits: 2, status: "active" },
  { id: "BN003", name: "Lê Văn Quang", gender: "Nam", dob: "05/12/1985", phone: "0909 888 777", lastVisit: "Chưa khám", totalVisits: 0, status: "new" },
  { id: "BN004", name: "Phạm Thảo Lê", gender: "Nữ", dob: "30/01/2000", phone: "0933 444 555", lastVisit: "15/09/2025", totalVisits: 8, status: "active" },
  { id: "BN005", name: "Đinh Hoàng Nhật", gender: "Nam", dob: "11/11/1990", phone: "0966 222 333", lastVisit: "01/01/2025", totalVisits: 1, status: "inactive" },
];

export default function PatientsPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quản Lý Bệnh Nhân</h1>
          <p className="text-slate-500 mt-1 font-medium">Hồ sơ bệnh án, lịch sử điều trị và thông tin liên hệ.</p>
        </div>
        <Button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md shadow-blue-500/20 rounded-xl h-11 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Thêm bệnh nhân mới
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-950">
          <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Tìm kiếm theo Tên, SĐT hoặc Mã BN..." 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 dark:border-slate-800">
              <Filter className="w-4 h-4 mr-2" /> Lọc danh sách
            </Button>
          </div>
          <div className="text-sm font-bold text-slate-500 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            Tổng cộng: <span className="text-blue-600 dark:text-cyan-400">1,245</span> BN
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Mã BN</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Họ & Tên</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Liên hệ</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Khám lần cuối</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Lượt khám</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Trạng thái</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-950">
              {patients.map((patient, index) => (
                <motion.tr 
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      {patient.id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-100 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 flex items-center justify-center text-blue-600 dark:text-cyan-400 font-bold shrink-0">
                        {patient.name.split(' ').pop()?.[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{patient.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                          <span>{patient.gender}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                          <span>{patient.dob}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {patient.lastVisit}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-center">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{patient.totalVisits}</span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-center">
                    {patient.status === 'active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Đang điều trị
                      </span>
                    )}
                    {patient.status === 'new' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-cyan-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Mới
                      </span>
                    )}
                    {patient.status === 'inactive' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Đã nghỉ
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-cyan-400 dark:hover:bg-cyan-950/30">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-sm text-slate-500 font-medium">
          <p>Hiển thị 1 đến 5 trong số 1,245 bệnh nhân</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg" disabled>Trước</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-lg bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-lg">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-lg">3</Button>
            <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg">Sau</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
