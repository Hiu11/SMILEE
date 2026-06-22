"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPage() {
  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Quên mật khẩu</h1>
        <p className="font-medium text-slate-500">Nhập email để nhận mã OTP khôi phục tài khoản.</p>
      </div>
      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold text-slate-700 dark:text-slate-300">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="email" name="email" type="email" required placeholder="Nhập Email" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>
        <Button asChild className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">
          <Link href="/reset-otp">Gửi mã OTP</Link>
        </Button>
        <p className="text-center text-sm font-semibold text-slate-500">
          Đã nhớ mật khẩu? <Link href="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </>
  );
}
