"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileText, Phone, Plus, RefreshCw, Search, UserRound, ArrowRight } from "lucide-react";
import { apiGet, formatDate } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/motion/MotionPrimitives";

type Patient = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  isVerified?: boolean;
  createdAt?: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  const handleRefresh = async () => {
    setLoading(true);
    const data = await apiGet<Patient[]>("/users?role=CUSTOMER", []);
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const fetchPatients = async () => {
      const data = await apiGet<Patient[]>("/users?role=CUSTOMER", []);
      if (!ignore) {
        setPatients(data);
        setLoading(false);
      }
    };
    fetchPatients();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return patients;
    return patients.filter((patient) => `${patient.id} ${patient.fullName} ${patient.email} ${patient.phone ?? ""}`.toLowerCase().includes(keyword));
  }, [patients, query]);

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-4 md:gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-5 md:p-6 lg:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md mb-3">
            <UserRound className="h-3.5 w-3.5" />
            Quản trị Khách hàng
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">Hồ sơ bệnh nhân</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">Quản lý danh sách khách hàng và hồ sơ điều trị. Dữ liệu được lấy trực tiếp từ các tài khoản có vai trò CUSTOMER.</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button onClick={handleRefresh} disabled={loading} variant="outline" className="h-10 md:h-11 lg:h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-4 md:px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button asChild className="h-10 md:h-11 lg:h-12 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 md:px-6 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all font-bold">
            <Link href="/admin/accounts">
              <Plus className="mr-2 h-5 w-5" />
              Thêm bệnh nhân
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <Card className="overflow-hidden rounded-3xl border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
          <CardContent className="flex flex-col gap-3 md:gap-4 p-4 md:p-5 lg:p-6 md:flex-row md:items-center md:justify-between border-b border-slate-100 dark:border-slate-800/50">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                placeholder="Tìm theo tên, SĐT, email hoặc ID..." 
                className="h-10 md:h-11 lg:h-12 rounded-xl bg-slate-50/50 pl-11 text-sm font-medium transition focus:scale-[1.01] focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" 
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-slate-300">
              Tổng số lượng: <span className="text-blue-600 dark:text-cyan-400 text-lg font-black">{filtered.length}</span>
            </div>
          </CardContent>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-900/30">
                <tr>
                  {["Mã BN", "Họ & tên khách hàng", "Liên hệ", "Ngày tạo", "Trạng thái", "Thao tác"].map((head) => (
                    <th key={head} className="whitespace-nowrap px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-slate-400">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filtered.map((patient) => (
                  <tr key={patient.id} className="group bg-white transition-colors hover:bg-blue-50/30 dark:bg-slate-950/50 dark:hover:bg-slate-900/50">
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                        {patient.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-100 to-cyan-100 text-blue-700 shadow-inner dark:from-blue-900/40 dark:to-cyan-900/40 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{patient.fullName}</p>
                          <p className="mt-0.5 text-sm font-medium text-slate-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <Phone className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        {patient.phone ?? "--"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500">{formatDate(patient.createdAt)}</td>
                    <td className="px-6 py-4">
                      {patient.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Đã xác thực
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Chưa xác thực
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Button asChild variant="outline" size="sm" className="h-9 rounded-xl border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-cyan-400 dark:hover:bg-blue-900/40 shadow-sm font-bold">
                          <Link href="/admin/records" title="Xem hồ sơ">
                            <FileText className="mr-1.5 h-4 w-4" />
                            Hồ sơ
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" onClick={() => setSelected(patient)}>
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {!loading && filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white">Không tìm thấy bệnh nhân nào</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Thử thay đổi từ khóa tìm kiếm hoặc tạo tài khoản mới.</p>
            </div>
          ) : null}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <p className="text-sm font-bold text-slate-500">Đang tải danh sách bệnh nhân...</p>
            </div>
          ) : null}
        </Card>
      </Reveal>

      {selected ? (
        <Reveal direction="up" delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-linear-to-r from-blue-50 to-cyan-50 p-5 md:p-6 lg:p-8 shadow-lg shadow-blue-900/5 dark:border-blue-900/50 dark:from-blue-950/40 dark:to-cyan-900/20">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 mb-1">Thông tin chi tiết</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">{selected.fullName}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-400 uppercase text-xs">ID:</span> <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm">{selected.id}</span></div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-400 uppercase text-xs">Email:</span> {selected.email}</div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-400 uppercase text-xs">SĐT:</span> {selected.phone ?? "Chưa cập nhật"}</div>
                </div>
              </div>
              <Button asChild className="shrink-0 h-10 md:h-11 lg:h-12 rounded-xl bg-blue-600 px-5 md:px-6 font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                <Link href="/admin/records">
                  Chuyển sang Hồ sơ bệnh án
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
