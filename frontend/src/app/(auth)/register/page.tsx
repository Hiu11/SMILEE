"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPost } from "@/lib/api";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim().toLowerCase();
    const password = String(form.get("password"));
    const fullName = String(form.get("fullName"));
    const phone = String(form.get("phone")).trim();

    // Save for resend
    setFormData({ email, password, fullName, phone });

    try {
      await apiPost("/auth/register", { email, password, fullName, phone });
      setRegisteredEmail(email);
      setShowOtp(true);
      setMessage("Đăng ký thành công! Vui lòng kiểm tra email để nhận mã OTP.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const otp = String(form.get("otp")).trim();

    try {
      await apiPost("/auth/verify-otp", { email: registeredEmail, otp });
      setMessage("Xác thực OTP thành công! Đang chuyển đến đăng nhập...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xác thực OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    setResending(true);
    try {
      // Re-trigger register endpoint with same details to update OTP
      await apiPost("/auth/register", formData);
      setMessage("Đã gửi lại mã OTP. Vui lòng kiểm tra hộp thư.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gửi lại OTP thất bại");
    } finally {
      setResending(false);
    }
  };

  if (showOtp) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto mt-10 lg:mt-20">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-2">
          <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
          Xác thực Email
        </h1>
        <p className="text-slate-500 font-medium text-center">
          Chúng tôi đã gửi một mã OTP gồm 6 số đến email <strong className="text-blue-600">{registeredEmail}</strong>. Vui lòng kiểm tra hộp thư (và mục Spam).
        </p>
        <form className="w-full space-y-6" onSubmit={handleVerifyOtp}>
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-slate-700 dark:text-slate-300 font-bold">Mã OTP</Label>
            <Input 
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              className="text-center text-2xl tracking-[0.35em] h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-black"
              required
            />
          </div>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}
          {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">{message}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all"
          >
            {loading ? "Đang xác nhận..." : "Xác nhận"}
            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            disabled={resending}
            onClick={handleResendOtp}
            className="h-11 w-full rounded-xl"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${resending ? "animate-spin" : ""}`} />
            {resending ? "Đang gửi lại..." : "Gửi lại mã"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          Đăng ký tài khoản
        </h1>
        <p className="text-slate-500 font-medium">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-600 dark:text-cyan-400 font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleRegister}>
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300 font-bold">
            Họ và tên
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              id="fullName" 
              name="fullName"
              type="text" 
              placeholder="Nhập họ và tên của bạn" 
              className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-medium"
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-bold">
              Số điện thoại
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="09xx xxx xxx" 
                className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-medium"
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-bold">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="example@gmail.com" 
                className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-medium"
                required 
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-bold">
            Mật khẩu
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              id="password" 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Tạo mật khẩu (ít nhất 6 ký tự)" 
              className="pl-10 pr-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-medium"
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all"
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
          {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
        </Button>
      </form>
    </>
  );
}
