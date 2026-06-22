"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetNewPage() {
  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Tạo mật khẩu mới</h1>
        <p className="font-medium text-slate-500">Chọn mật khẩu mới để hoàn tất khôi phục tài khoản.</p>
      </div>
      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="password" className="font-bold text-slate-700 dark:text-slate-300">Mật khẩu mới</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="password" name="password" type="password" required placeholder="Nhập mật khẩu mới" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="font-bold text-slate-700 dark:text-slate-300">Nhập lại mật khẩu</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Nhập lại mật khẩu" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>
        <Button asChild className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">
          <Link href="/login">Cập nhật mật khẩu</Link>
        </Button>
      </form>
    </>
  );
}
