"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { apiPost } from "@/lib/api";
import { saveSession, AuthRole } from "@/lib/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const data = await apiPost<{ access_token: string, user: { role: AuthRole, fullName?: string } }>('/auth/login', { email, password });
      
      saveSession({ token: data.access_token, user: data.user });
      
      if (['ADMIN', 'RECEPTIONIST', 'DOCTOR'].includes(data.user?.role)) {
        setMessage('Đăng nhập thành công! Đang chuyển hướng vào hệ thống...');
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        setMessage('Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 md:mb-10 text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Đăng nhập
        </h1>
        <p className="text-slate-500 font-medium">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-600 dark:text-cyan-400 font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-bold">
            Email
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="Nhập Email" 
              className="pl-10 h-12 lg:h-14 rounded-2xl border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 font-medium transition-all shadow-inner"
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-bold">
              Mật khẩu
            </Label>
            <Link href="/reset" className="text-sm text-blue-600 dark:text-cyan-400 font-bold hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              id="password" 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Nhập mật khẩu" 
              className="pl-10 pr-12 h-12 lg:h-14 rounded-2xl border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 font-medium transition-all shadow-inner"
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" className="border-slate-300 dark:border-slate-700" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 dark:text-slate-400"
          >
            Ghi nhớ đăng nhập
          </label>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}
        {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">{message}</p>}

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-12 lg:h-14 text-base lg:text-lg font-bold rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-1 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center justify-center">
            {loading ? "Đang xử lý..." : "Đăng nhập"}
            {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </span>
        </Button>
      </form>
    </>
  );
}
