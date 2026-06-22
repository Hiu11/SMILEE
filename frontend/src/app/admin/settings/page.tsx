"use client";

import { FormEvent, useEffect, useState } from "react";
import { Bell, Building2, CheckCircle2, Clock, Database, Mail, RotateCcw, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) });
    }
  }, []);

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
    <form onSubmit={submit} className="space-y-5 pb-2">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Cài đặt</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Cấu hình thông tin phòng khám, lịch vận hành và tùy chọn hệ thống.</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="h-10 rounded-xl" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Mặc định
          </Button>
          <Button className="h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Lưu cài đặt
          </Button>
        </div>
      </div>

      {notice ? (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          {notice}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Thông tin phòng khám</h2>
                <p className="text-sm font-medium text-slate-500">Hiển thị cho khách hàng và nội bộ.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Tên phòng khám</span>
                <Input value={settings.clinicName} onChange={(event) => update("clinicName", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Địa chỉ</span>
                <Input value={settings.address} onChange={(event) => update("address", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Hotline</span>
                <Input value={settings.phone} onChange={(event) => update("phone", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Email</span>
                <Input type="email" value={settings.email} onChange={(event) => update("email", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Lịch vận hành</h2>
                <p className="text-sm font-medium text-slate-500">Khung giờ và bước lịch hẹn.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Mở cửa</span>
                <Input type="time" value={settings.openTime} onChange={(event) => update("openTime", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Đóng cửa</span>
                <Input type="time" value={settings.closeTime} onChange={(event) => update("closeTime", event.target.value)} className="h-10 rounded-xl bg-slate-50 dark:bg-slate-900" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold uppercase text-slate-500">Mỗi slot</span>
                <select value={settings.appointmentSlot} onChange={(event) => update("appointmentSlot", event.target.value)} className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                  <option value="15">15 phút</option>
                  <option value="30">30 phút</option>
                  <option value="45">45 phút</option>
                  <option value="60">60 phút</option>
                </select>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Thông báo & đặt lịch</h2>
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
                <label key={key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
                  <Checkbox checked={Boolean(settings[key as keyof Settings])} onCheckedChange={(checked) => update(key as keyof Settings, Boolean(checked) as never)} />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Thông tin hệ thống</h2>
                <p className="text-sm font-medium text-slate-500">Thông tin đọc từ cấu hình dự án.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoTile icon={Shield} title="API backend" value={apiUrl} />
              <InfoTile icon={Database} title="Database" value="PostgreSQL qua Prisma" />
              <InfoTile icon={Mail} title="Email hệ thống" value="Cấu hình trong backend/.env" />
              <InfoTile icon={Clock} title="Lần lưu gần nhất" value={notice ? "Vừa cập nhật" : "Chưa thay đổi"} />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

function InfoTile({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
      <Icon className="h-4 w-4 text-blue-600" />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}
