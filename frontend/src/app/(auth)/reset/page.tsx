"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send } from "lucide-react";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();

    try {
      const res = await apiPost<{ message: string }>("/auth/forgot-password", { email });
      // Store email for next step
      sessionStorage.setItem("reset_email", email);
      setMessage(res.message ?? "Mã OTP đã được gửi. Vui lòng kiểm tra email.");
      setTimeout(() => router.push("/reset-otp"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể gửi mã OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">Quên mật khẩu</h1>
        <p className="font-medium text-slate-500">Nhập email để nhận mã OTP khôi phục tài khoản.</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold text-slate-700 dark:text-slate-300">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input id="email" name="email" type="email" required placeholder="Nhập email của bạn" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium dark:bg-slate-950" />
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}
        {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">{message}</p>}

        <Button disabled={loading} className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white hover:bg-blue-700">
          <Send className="mr-2 h-5 w-5" />
          {loading ? "Đang gửi mã OTP..." : "Gửi mã OTP"}
        </Button>
      </form>
    </>
  );
}
