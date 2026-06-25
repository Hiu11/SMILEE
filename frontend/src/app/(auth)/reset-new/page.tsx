"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("reset_email");
    const otp = sessionStorage.getItem("reset_otp");
    if (!email || !otp) {
      router.replace("/reset");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirmPassword") ?? "");

    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    const email = sessionStorage.getItem("reset_email") ?? "";
    const otp = sessionStorage.getItem("reset_otp") ?? "";

    setLoading(true);
    try {
      await apiPost("/auth/reset-password", { email, otp, newPassword: password });
      // Clear stored data
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_otp");
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể đặt lại mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Đặt lại mật khẩu thành công!</h2>
        <p className="mt-2 text-slate-500">Đang chuyển hướng đến trang đăng nhập...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Tạo mật khẩu mới</h1>
        <p className="font-medium text-slate-500">Chọn mật khẩu mới để hoàn tất khôi phục tài khoản.</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="password" className="font-bold text-slate-700 dark:text-slate-300">Mật khẩu mới</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="password" name="password" type="password" required placeholder="Tối thiểu 6 ký tự" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="font-bold text-slate-700 dark:text-slate-300">Nhập lại mật khẩu</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Nhập lại mật khẩu" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}

        <Button disabled={loading} className="h-12 lg:h-14 w-full rounded-xl bg-blue-600 text-base lg:text-lg font-bold text-white hover:bg-blue-700">
          {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </Button>
      </form>
    </>
  );
}
