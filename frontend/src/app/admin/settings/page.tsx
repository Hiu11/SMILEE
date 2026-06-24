"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bell, Building2, CheckCircle2, Clock, Database, Mail, RotateCcw, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Settings = {
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
  appointmentSlot: string;
  autoConfirm: boolean;
  emailNotify: boolean;
  smsNotify: boolean;
  maintenanceMode: boolean;
};

const storageKey = "smilee-admin-settings";

const defaultSettings: Settings = {
  clinicName: "SMILEE Dental Clinic",
  address: "123 Đường Công Nghệ, TP. Hồ Chí Minh",
  phone: "1900 6868 99",
  email: "contact@smilee.vn",
  openTime: "08:00",
  closeTime: "18:00",
  appointmentSlot: "30",
  autoConfirm: false,
  emailNotify: true,
  smsNotify: false,
  maintenanceMode: false,
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function SettingsPage() {
  const savedSettings = useLocalStorageValue(storageKey);
  const initialSettings = useMemo(() => {
    if (!savedSettings) return defaultSettings;

    try {
      return { ...defaultSettings, ...(JSON.parse(savedSettings) as Partial<Settings>) };
    } catch {
      return defaultSettings;
    }
  }, [savedSettings]);

  return <SettingsForm key={savedSettings ?? "default"} initialSettings={initialSettings} />;
}

function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [notice, setNotice] = useState("");

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setNotice("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setNotice("Đã lưu cài đặt trên trình duyệt này.");
  };

  const reset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(storageKey);
    setNotice("Đã khôi phục cài đặt mặc định.");
  };

  return (
    <form onSubmit={submit} className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-rose-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-bold text-rose-300 backdrop-blur-md mb-3">
            <Shield className="h-3.5 w-3.5" />
            Cấu hình hệ thống
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">Cài đặt</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">Cấu hình thông tin phòng khám, lịch vận hành và tùy chọn hệ thống.</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button type="button" variant="outline" className="h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-5" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Mặc định
          </Button>
          <Button className="h-12 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 px-6 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 transition-all font-bold">
            <Save className="mr-2 h-5 w-5" />
            Lưu cài đặt
          </Button>
        </div>
      </Reveal>

      {notice ? (
        <Reveal direction="up" className="rounded-2xl border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 px-5 py-4 shadow-sm dark:border-green-900/50 dark:from-green-950/40 dark:to-emerald-900/20 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">{notice}</p>
        </Reveal>
      ) : null}

      <Stagger className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <StaggerItem>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 text-indigo-700 shadow-inner dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-indigo-400">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Thông tin phòng khám</h2>
                  <p className="text-sm font-medium text-slate-500">Hiển thị cho khách hàng và nội bộ.</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Tên phòng khám</span>
                  <Input value={settings.clinicName} onChange={(event) => update("clinicName", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Địa chỉ</span>
                  <Input value={settings.address} onChange={(event) => update("address", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Hotline</span>
                  <Input value={settings.phone} onChange={(event) => update("phone", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Email</span>
                  <Input type="email" value={settings.email} onChange={(event) => update("email", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 text-orange-700 shadow-inner dark:from-amber-900/40 dark:to-orange-900/40 dark:text-orange-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Lịch vận hành</h2>
                  <p className="text-sm font-medium text-slate-500">Khung giờ và bước lịch hẹn.</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Mở cửa</span>
                  <Input type="time" value={settings.openTime} onChange={(event) => update("openTime", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Đóng cửa</span>
                  <Input type="time" value={settings.closeTime} onChange={(event) => update("closeTime", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Mỗi slot</span>
                  <select value={settings.appointmentSlot} onChange={(event) => update("appointmentSlot", event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950/50">
                    <option value="15">15 phút</option>
                    <option value="30">30 phút</option>
                    <option value="45">45 phút</option>
                    <option value="60">60 phút</option>
                  </select>
                </label>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </Stagger>

      <Stagger className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <StaggerItem>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-blue-100 text-blue-700 shadow-inner dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-400">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Thông báo & đặt lịch</h2>
                  <p className="text-sm font-medium text-slate-500">Bật tắt các luồng vận hành nhanh.</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["autoConfirm", "Tự động xác nhận yêu cầu đặt lịch"],
                  ["emailNotify", "Gửi thông báo qua email"],
                  ["smsNotify", "Gửi thông báo qua SMS"],
                  ["maintenanceMode", "Bật chế độ bảo trì hệ thống"],
                ].map(([key, label]) => (
                  <label key={key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-800/50 dark:bg-slate-900/30 dark:hover:bg-slate-800/80">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
                    <Checkbox checked={Boolean(settings[key as keyof Settings])} onCheckedChange={(checked) => update(key as keyof Settings, Boolean(checked) as never)} />
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 h-full">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-slate-100 to-gray-200 text-slate-700 shadow-inner dark:from-slate-800 dark:to-slate-700 dark:text-slate-300">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Thông tin hệ thống</h2>
                  <p className="text-sm font-medium text-slate-500">Thông tin đọc từ cấu hình dự án.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoTile icon={Shield} title="API backend" value={apiUrl} />
                <InfoTile icon={Database} title="Database" value="PostgreSQL qua Prisma" />
                <InfoTile icon={Mail} title="Email hệ thống" value="Cấu hình trong backend/.env" />
                <InfoTile icon={Clock} title="Lần lưu gần nhất" value={notice ? "Vừa cập nhật" : "Chưa thay đổi"} />
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </Stagger>
    </form>
  );
}

function InfoTile({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-colors hover:bg-slate-100/50 dark:border-slate-800/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/60">
      <Icon className="h-5 w-5 text-rose-500" />
      <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-slate-400">{title}</p>
      <p className="mt-1 wrap-break-word text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}
