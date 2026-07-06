"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bell, Building2, CheckCircle2, Clock, Database, Languages, Mail, RotateCcw, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLocalStorageValue } from "@/hooks/useLocalStorageValue";
import { LOCALE_STORAGE_KEY, useLanguage } from "@/lib/i18n";
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

type Locale = "vi" | "en";
type NoticeType = "saved" | "reset" | "";

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

const copy = {
  vi: {
    languageLabel: "Ngôn ngữ",
    languageName: "Tiếng Việt",
    systemConfig: "Cấu hình hệ thống",
    title: "Cài đặt",
    description: "Cấu hình thông tin phòng khám, lịch vận hành và tùy chọn hệ thống.",
    resetButton: "Mặc định",
    saveButton: "Lưu cài đặt",
    savedNotice: "Đã lưu cài đặt trên trình duyệt này.",
    resetNotice: "Đã khôi phục cài đặt mặc định.",
    clinicInfoTitle: "Thông tin phòng khám",
    clinicInfoDescription: "Hiển thị cho khách hàng và nội bộ.",
    clinicName: "Tên phòng khám",
    address: "Địa chỉ",
    hotline: "Hotline",
    email: "Email",
    scheduleTitle: "Lịch vận hành",
    scheduleDescription: "Khung giờ và bước lịch hẹn.",
    openTime: "Mở cửa",
    closeTime: "Đóng cửa",
    slotLength: "Mỗi slot",
    minutes: "phút",
    notificationsTitle: "Thông báo & đặt lịch",
    notificationsDescription: "Bật tắt các luồng vận hành nhanh.",
    options: {
      autoConfirm: "Tự động xác nhận yêu cầu đặt lịch",
      emailNotify: "Gửi thông báo qua email",
      smsNotify: "Gửi thông báo qua SMS",
      maintenanceMode: "Bật chế độ bảo trì hệ thống",
    },
    systemInfoTitle: "Thông tin hệ thống",
    systemInfoDescription: "Thông tin đọc từ cấu hình dự án.",
    backendApi: "API backend",
    database: "Database",
    databaseValue: "PostgreSQL qua Prisma",
    systemEmail: "Email hệ thống",
    systemEmailValue: "Cấu hình trong backend/.env",
    lastSaved: "Lần lưu gần nhất",
    justUpdated: "Vừa cập nhật",
    unchanged: "Chưa thay đổi",
  },
  en: {
    languageLabel: "Language",
    languageName: "English",
    systemConfig: "System configuration",
    title: "Settings",
    description: "Configure clinic information, operating hours, and system options.",
    resetButton: "Default",
    saveButton: "Save settings",
    savedNotice: "Settings saved on this browser.",
    resetNotice: "Default settings have been restored.",
    clinicInfoTitle: "Clinic information",
    clinicInfoDescription: "Displayed to customers and internal teams.",
    clinicName: "Clinic name",
    address: "Address",
    hotline: "Hotline",
    email: "Email",
    scheduleTitle: "Operating schedule",
    scheduleDescription: "Business hours and appointment slot length.",
    openTime: "Open",
    closeTime: "Close",
    slotLength: "Slot length",
    minutes: "minutes",
    notificationsTitle: "Notifications & booking",
    notificationsDescription: "Toggle fast operational flows.",
    options: {
      autoConfirm: "Automatically confirm booking requests",
      emailNotify: "Send email notifications",
      smsNotify: "Send SMS notifications",
      maintenanceMode: "Enable system maintenance mode",
    },
    systemInfoTitle: "System information",
    systemInfoDescription: "Information read from project configuration.",
    backendApi: "Backend API",
    database: "Database",
    databaseValue: "PostgreSQL via Prisma",
    systemEmail: "System email",
    systemEmailValue: "Configured in backend/.env",
    lastSaved: "Last saved",
    justUpdated: "Just updated",
    unchanged: "No changes yet",
  },
} satisfies Record<Locale, Record<string, unknown>>;

const languageOptions: Array<{ value: Locale; label: string }> = [
  { value: "vi", label: "VI" },
  { value: "en", label: "EN" },
];

const notificationOptions: Array<keyof Pick<Settings, "autoConfirm" | "emailNotify" | "smsNotify" | "maintenanceMode">> = [
  "autoConfirm",
  "emailNotify",
  "smsNotify",
  "maintenanceMode",
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function SettingsPage() {
  const savedSettings = useLocalStorageValue(storageKey);
  const { locale } = useLanguage();
  const initialSettings = useMemo(() => {
    if (!savedSettings) return defaultSettings;

    try {
      return { ...defaultSettings, ...(JSON.parse(savedSettings) as Partial<Settings>) };
    } catch {
      return defaultSettings;
    }
  }, [savedSettings]);
  return <SettingsForm key={`${savedSettings ?? "default"}-${locale}`} initialLocale={locale} initialSettings={initialSettings} />;
}

function SettingsForm({ initialLocale, initialSettings }: { initialLocale: Locale; initialSettings: Settings }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [notice, setNotice] = useState<NoticeType>("");
  const t = copy[locale];

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setNotice("");
  };

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event("smilee:local-storage-change"));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setNotice("saved");
  };

  const reset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(storageKey);
    setNotice("reset");
  };

  return (
    <form onSubmit={submit} className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-5 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 shadow-xl shadow-slate-900/10 sm:flex-row sm:items-center sm:p-8 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-rose-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-bold text-rose-300 backdrop-blur-md">
            <Shield className="h-3.5 w-3.5" />
            {t.systemConfig as string}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{t.title as string}</h1>
          <p className="mt-2 max-w-xl text-sm font-medium text-slate-300">{t.description as string}</p>
        </div>

        <div className="relative z-10 flex flex-col gap-3 sm:items-end">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-1 text-white backdrop-blur-sm">
            <Languages className="ml-2 h-4 w-4 text-rose-200" />
            <span className="sr-only">{t.languageLabel as string}</span>
            {languageOptions.map((option) => (
              <button
                data-active={locale === option.value ? "true" : "false"}
                className={`h-9 rounded-lg px-3 text-xs font-black transition ${locale === option.value ? "bg-white text-slate-950 shadow-sm" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
                key={option.value}
                onClick={() => changeLocale(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-5" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.resetButton as string}
            </Button>
            <Button className="h-12 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 px-6 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 transition-all font-bold">
              <Save className="mr-2 h-5 w-5" />
              {t.saveButton as string}
            </Button>
          </div>
        </div>
      </Reveal>

      {notice ? (
        <Reveal direction="up" className="rounded-2xl border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 px-5 py-4 shadow-sm dark:border-green-900/50 dark:from-green-950/40 dark:to-emerald-900/20 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">{notice === "saved" ? (t.savedNotice as string) : (t.resetNotice as string)}</p>
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
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{t.clinicInfoTitle as string}</h2>
                  <p className="text-sm font-medium text-slate-500">{t.clinicInfoDescription as string}</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.clinicName as string}</span>
                  <Input value={settings.clinicName} onChange={(event) => update("clinicName", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.address as string}</span>
                  <Input value={settings.address} onChange={(event) => update("address", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.hotline as string}</span>
                  <Input value={settings.phone} onChange={(event) => update("phone", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.email as string}</span>
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
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{t.scheduleTitle as string}</h2>
                  <p className="text-sm font-medium text-slate-500">{t.scheduleDescription as string}</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.openTime as string}</span>
                  <Input type="time" value={settings.openTime} onChange={(event) => update("openTime", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.closeTime as string}</span>
                  <Input type="time" value={settings.closeTime} onChange={(event) => update("closeTime", event.target.value)} className="h-12 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:bg-slate-950/50" />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{t.slotLength as string}</span>
                  <select value={settings.appointmentSlot} onChange={(event) => update("appointmentSlot", event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium transition focus:ring-2 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950/50">
                    <option value="15">15 {t.minutes as string}</option>
                    <option value="30">30 {t.minutes as string}</option>
                    <option value="45">45 {t.minutes as string}</option>
                    <option value="60">60 {t.minutes as string}</option>
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
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{t.notificationsTitle as string}</h2>
                  <p className="text-sm font-medium text-slate-500">{t.notificationsDescription as string}</p>
                </div>
              </div>
              <div className="space-y-4">
                {notificationOptions.map((key) => (
                  <label key={key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-800/50 dark:bg-slate-900/30 dark:hover:bg-slate-800/80">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{(t.options as Record<string, string>)[key]}</span>
                    <Checkbox checked={settings[key]} onCheckedChange={(checked) => update(key, Boolean(checked))} />
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
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{t.systemInfoTitle as string}</h2>
                  <p className="text-sm font-medium text-slate-500">{t.systemInfoDescription as string}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoTile icon={Shield} title={t.backendApi as string} value={apiUrl} />
                <InfoTile icon={Database} title={t.database as string} value={t.databaseValue as string} />
                <InfoTile icon={Mail} title={t.systemEmail as string} value={t.systemEmailValue as string} />
                <InfoTile icon={Clock} title={t.lastSaved as string} value={notice ? (t.justUpdated as string) : (t.unchanged as string)} />
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
