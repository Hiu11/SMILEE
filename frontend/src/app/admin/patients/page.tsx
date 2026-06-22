"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, FileText, Filter, Phone, Plus, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const patients = [
  { id: "BN001", name: "Nguyễn Trọng Hiếu", gender: "Nam", dob: "15/04/1995", phone: "0987 654 321", lastVisit: "17/10/2025", totalVisits: 5, status: "active" },
  { id: "BN002", name: "Trần Mai Linh", gender: "Nữ", dob: "22/08/1998", phone: "0912 345 678", lastVisit: "10/10/2025", totalVisits: 2, status: "active" },
  { id: "BN003", name: "Lê Văn Quang", gender: "Nam", dob: "05/12/1985", phone: "0909 888 777", lastVisit: "Chưa khám", totalVisits: 0, status: "new" },
  { id: "BN004", name: "Phạm Thảo Lê", gender: "Nữ", dob: "30/01/2000", phone: "0933 444 555", lastVisit: "15/09/2025", totalVisits: 8, status: "active" },
  { id: "BN005", name: "Đinh Hoàng Nhật", gender: "Nam", dob: "11/11/1990", phone: "0966 222 333", lastVisit: "01/01/2025", totalVisits: 1, status: "inactive" },
];

const statusLabel: Record<string, string> = {
  active: "Đang điều trị",
  new: "Mới",
  inactive: "Đã nghỉ",
};

export default function PatientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<(typeof patients)[number] | null>(null);

  const filtered = useMemo(() => {
    return patients.filter((patient) => {
      const matchQuery = `${patient.id} ${patient.name} ${patient.phone}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === "all" || patient.status === status;
      return matchQuery && matchStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Quản lý bệnh nhân</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Hồ sơ bệnh án, lịch sử điều trị và thông tin liên hệ.</p>
        </div>
        <Button asChild className="h-10 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700">
          <Link href="/admin/accounts">
            <Plus className="mr-2 h-5 w-5" />
            Thêm bệnh nhân mới
          </Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardContent className="flex flex-col gap-3 p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, SĐT hoặc mã BN..." className="h-9 rounded-lg bg-slate-50 pl-10 dark:bg-slate-900" />
          </div>
          <div className="flex gap-2">
            {[
              ["all", "Tất cả"],
              ["active", "Đang điều trị"],
              ["new", "Mới"],
              ["inactive", "Đã nghỉ"],
            ].map(([value, label]) => (
              <Button key={value} type="button" variant={status === value ? "default" : "outline"} className="h-9 rounded-lg px-3 text-xs" onClick={() => setStatus(value)}>
                <Filter className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                {["Mã BN", "Họ & tên", "Liên hệ", "Khám lần cuối", "Lượt khám", "Trạng thái", "Thao tác"].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((patient) => (
                <tr key={patient.id} className="bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3"><span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-bold dark:bg-slate-800">{patient.id}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700"><UserRound className="h-4 w-4" /></div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{patient.name}</p>
                        <p className="text-xs font-medium text-slate-500">{patient.gender} • {patient.dob}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-600"><Phone className="mr-2 inline h-4 w-4 text-slate-400" />{patient.phone}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-600"><Calendar className="mr-2 inline h-4 w-4 text-slate-400" />{patient.lastVisit}</td>
                  <td className="px-4 py-3 text-center text-sm font-black">{patient.totalVisits}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{statusLabel[patient.status]}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Link href="/admin/records" title="Xem hồ sơ"><FileText className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 rounded-lg px-2 text-xs" onClick={() => setSelected(patient)}>Chi tiết</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
          <p>Hiển thị {filtered.length} trong số {patients.length} bệnh nhân</p>
          <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setQuery("")}>Xóa lọc</Button>
        </div>
      </Card>

      {selected ? (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h2 className="font-extrabold text-slate-900 dark:text-white">Chi tiết bệnh nhân: {selected.name}</h2>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">Mã {selected.id}, {selected.totalVisits} lượt khám, lần gần nhất {selected.lastVisit}. Dùng tab Hồ sơ bệnh án để xem hoặc tạo hồ sơ điều trị.</p>
        </div>
      ) : null}
    </div>
  );
}
