"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, Mail, Phone, Plus, Search, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const doctors = [
  { id: "NS001", name: "Nguyễn Tuấn", specialty: "Chuyên khoa Implant", experience: "15 năm", rating: 4.9, patients: 1245, phone: "0901 234 567", email: "tuan.nguyen@smilee.com", status: "active", avatarColor: "from-blue-500 to-cyan-500" },
  { id: "NS002", name: "Lê Thu Trang", specialty: "Chỉnh nha", experience: "10 năm", rating: 4.8, patients: 850, phone: "0902 345 678", email: "trang.le@smilee.com", status: "active", avatarColor: "from-purple-500 to-pink-500" },
  { id: "NS003", name: "Trần Mạnh Hùng", specialty: "Nha khoa tổng quát", experience: "8 năm", rating: 4.7, patients: 920, phone: "0903 456 789", email: "hung.tran@smilee.com", status: "on_leave", avatarColor: "from-amber-500 to-orange-500" },
];

export default function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<(typeof doctors)[number] | null>(null);

  const filtered = useMemo(() => doctors.filter((doctor) => {
    const matchQuery = `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase());
    const matchStatus = status === "all" || doctor.status === status;
    return matchQuery && matchStatus;
  }), [query, status]);

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Quản lý nha sĩ</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Theo dõi bác sĩ, lịch trực và hiệu suất công việc.</p>
        </div>
        <Button asChild className="h-10 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700">
          <Link href="/admin/accounts">
            <Plus className="mr-2 h-4 w-4" />
            Thêm nha sĩ
          </Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardContent className="flex flex-col gap-3 p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, chuyên khoa..." className="h-10 rounded-xl bg-slate-50 pl-10 dark:bg-slate-900" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={status === "all" ? "default" : "outline"} className="h-10 rounded-xl px-3 text-sm" onClick={() => setStatus("all")}><Filter className="mr-2 h-4 w-4" />Tất cả</Button>
            <Button variant={status === "active" ? "default" : "outline"} className="h-10 rounded-xl px-3 text-sm" onClick={() => setStatus("active")}>Đang làm</Button>
            <Button variant={status === "on_leave" ? "default" : "outline"} className="h-10 rounded-xl px-3 text-sm" onClick={() => setStatus("on_leave")}>Nghỉ phép</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/50">
            <div className={`h-12 bg-linear-to-r ${doctor.avatarColor} opacity-25`} />
            <CardContent className="-mt-7 p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr ${doctor.avatarColor} text-xl font-black text-white shadow-md ring-4 ring-white dark:ring-slate-950`}>
                  {doctor.name.split(" ").pop()?.[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-extrabold text-slate-900 dark:text-white">BS. {doctor.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400">
                    <Stethoscope className="h-3.5 w-3.5" />
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              <div className="my-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center dark:border-slate-800">
                <div><p className="text-sm font-black">{doctor.rating} <Star className="inline h-3.5 w-3.5 fill-amber-500 text-amber-500" /></p><p className="text-[11px] font-bold text-slate-400">Đánh giá</p></div>
                <div><p className="text-sm font-black">{doctor.experience}</p><p className="text-[11px] font-bold text-slate-400">Kinh nghiệm</p></div>
                <div><p className="text-sm font-black">{doctor.patients}+</p><p className="text-[11px] font-bold text-slate-400">Ca khám</p></div>
              </div>

              <p className="truncate text-xs font-medium text-slate-600"><Phone className="mr-2 inline h-3.5 w-3.5" />{doctor.phone}</p>
              <p className="mt-1 truncate text-xs font-medium text-slate-600"><Mail className="mr-2 inline h-3.5 w-3.5" />{doctor.email}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="h-9 flex-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700" onClick={() => setSelected(doctor)}>Hồ sơ</Button>
                <Button asChild size="sm" variant="outline" className="h-9 rounded-lg">
                  <Link href={`mailto:${doctor.email}`}>Email</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected ? (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h2 className="font-extrabold text-slate-900 dark:text-white">Hồ sơ BS. {selected.name}</h2>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{selected.specialty}, {selected.experience}, đã xử lý {selected.patients}+ ca khám. Tạo tài khoản bác sĩ mới ở tab Tài khoản.</p>
        </div>
      ) : null}
    </div>
  );
}
