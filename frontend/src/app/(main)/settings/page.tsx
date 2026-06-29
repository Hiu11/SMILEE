"use client";

import { CheckCircle2, Globe2, Settings, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { LanguageToggle, useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/MotionPrimitives";

export default function CustomerSettingsPage() {
  const { locale } = useLanguage();
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pt-24 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm backdrop-blur dark:border-blue-900/50 dark:bg-slate-900/70 dark:text-cyan-300">
              <Settings className="h-4 w-4" />
              Cài đặt khách hàng
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl dark:text-white">Cài đặt</h1>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-500 dark:text-slate-400">
              Tuỳ chỉnh trải nghiệm sử dụng SMILEE của bạn.
            </p>
          </div>

          <Card className="overflow-hidden rounded-3xl border-slate-200/70 bg-white/85 shadow-xl shadow-blue-950/5 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/85">
            <CardContent className="space-y-6 p-6 md:p-8">
              <section className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-cyan-400">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Ngôn ngữ hiển thị</h2>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                      Chọn ngôn ngữ áp dụng cho website, menu và khu vực khách hàng.
                    </p>
                  </div>
                </div>
                <LanguageToggle />
              </section>

              <section className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400">
                    <UserCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Tài khoản</h2>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                      Ngôn ngữ hiện tại: <span className="font-black text-blue-600 dark:text-cyan-400">{locale === "vi" ? "Tiếng Việt" : "English"}</span>
                    </p>
                  </div>
                </div>
                <Button className="h-11 rounded-xl bg-blue-600 px-6 font-bold text-white hover:bg-blue-700" onClick={() => setSaved(true)}>
                  Lưu cài đặt
                </Button>
              </section>

              {saved ? (
                <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-bold text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Đã lưu cài đặt.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
