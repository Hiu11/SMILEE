"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetOtpPage() {
  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Xác thực OTP</h1>
        <p className="font-medium text-slate-500">Nhập mã gồm 6 số đã được gửi tới email của bạn.</p>
      </div>
      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="otp" className="font-bold text-slate-700 dark:text-slate-300">Mã OTP</Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="otp" name="otp" inputMode="numeric" maxLength={6} required placeholder="000000" className="h-12 rounded-xl bg-slate-50 pl-10 text-center text-lg font-black tracking-[0.35em] dark:bg-slate-950" />
          </div>
        </div>
        <Button asChild className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">
          <Link href="/reset-new">Xác nhận</Link>
        </Button>
        <Button asChild variant="ghost" className="h-11 w-full rounded-xl">
          <Link href="/reset">Gửi lại mã</Link>
        </Button>
      </form>
    </>
  );
}
