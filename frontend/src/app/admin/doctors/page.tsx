"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Plus, RefreshCw, Search, Stethoscope } from "lucide-react";
import { apiGet } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Doctor = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  isVerified?: boolean;
};

const colors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    setLoading(true);
    setDoctors(await apiGet<Doctor[]>("/users?role=DOCTOR", []));
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchDoctors = async () => {
      const data = await apiGet<Doctor[]>("/users?role=DOCTOR", []);
      if (!ignore) {
        setDoctors(data);
        setLoading(false);
      }
    };
    fetchDoctors();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return doctors;
    return doctors.filter((doctor) => `${doctor.fullName} ${doctor.email} ${doctor.phone ?? ""}`.toLowerCase().includes(keyword));
  }, [doctors, query]);

  return (
    <div className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md mb-3">
            <Stethoscope className="h-3.5 w-3.5" />
            Đội ngũ Y bác sĩ
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">Quản lý nha sĩ</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">Danh sách bác sĩ được lấy trực tiếp từ tài khoản role DOCTOR. Quản lý thông tin và hồ sơ liên hệ.</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button onClick={loadDoctors} disabled={loading} variant="outline" className="h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button asChild className="h-12 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-6 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all font-bold">
            <Link href="/admin/accounts">
              <Plus className="mr-2 h-5 w-5" />
              Thêm nha sĩ
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <Card className="border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 rounded-3xl overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, email hoặc số điện thoại..." className="h-12 rounded-xl bg-slate-50/50 pl-11 text-sm font-medium transition focus:scale-[1.01] focus:ring-2 focus:ring-emerald-500 dark:bg-slate-950/50" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-emerald-900/30 dark:bg-emerald-900/20 dark:text-slate-300">
              Bác sĩ: <span className="text-emerald-600 dark:text-emerald-400 text-lg font-black">{filtered.length}</span>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((doctor, index) => {
          const color = colors[index % colors.length];
          return (
            <StaggerItem key={doctor.id}>
              <Card className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80 hover:border-emerald-300 dark:hover:border-emerald-800">
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-r ${color} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className={`h-16 bg-linear-to-r ${color} opacity-20`} />
                <CardContent className="relative z-10 -mt-8 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-tr ${color} text-2xl font-black text-white shadow-lg ring-4 ring-white dark:ring-slate-950`}>
                      {doctor.fullName.split(" ").pop()?.[0] ?? "B"}
                    </div>
                    <div className="min-w-0 flex-1 mt-2">
                      <h3 className="truncate text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">BS. {doctor.fullName}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <Stethoscope className="h-3.5 w-3.5" />
                        Bác sĩ nha khoa
                      </p>
                    </div>
                  </div>

                  <div className="my-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-xs font-bold text-slate-600 dark:border-slate-800/50 dark:bg-slate-900/30 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${doctor.isVerified ? "bg-emerald-500" : "bg-slate-400"}`} />
                    Trạng thái: {doctor.isVerified ? <span className="text-emerald-600 dark:text-emerald-400">Đã xác thực</span> : <span>Chưa xác thực</span>}
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center gap-2 truncate text-xs font-semibold text-slate-600 dark:text-slate-400"><Phone className="h-3.5 w-3.5 text-slate-400" />{doctor.phone ?? "--"}</p>
                    <p className="flex items-center gap-2 truncate text-xs font-semibold text-slate-600 dark:text-slate-400"><Mail className="h-3.5 w-3.5 text-slate-400" />{doctor.email}</p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button size="sm" className="h-10 flex-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 font-bold shadow-sm" onClick={() => setSelected(doctor)}>Xem hồ sơ</Button>
                    <Button asChild size="sm" variant="outline" className="h-10 rounded-xl font-bold shadow-sm">
                      <Link href={`mailto:${doctor.email}`}>Email</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>

      {!loading && filtered.length === 0 ? (
        <Reveal direction="up" className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">Không có nha sĩ nào</p>
          <p className="mt-1 text-sm font-medium text-slate-500">Hãy tạo tài khoản DOCTOR ở tab Tài khoản.</p>
        </Reveal>
      ) : null}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <RefreshCw className="mb-4 h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu...</p>
        </div>
      ) : null}

      {selected ? (
        <Reveal direction="up" delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/50 bg-linear-to-r from-emerald-50 to-teal-50 p-6 shadow-lg shadow-emerald-900/5 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:to-teal-900/20 sm:p-8">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Thông tin chi tiết</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Hồ sơ BS. {selected.fullName}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2"><span className="font-bold text-slate-400 uppercase text-xs">Email:</span> {selected.email}</div>
                <div className="flex items-center gap-2"><span className="font-bold text-slate-400 uppercase text-xs">SĐT:</span> {selected.phone ?? "Chưa cập nhật"}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
