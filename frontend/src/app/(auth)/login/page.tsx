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
import { saveSession } from "@/lib/auth";

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
      const data = await apiPost<{ access_token: string, user: { role: string } }>('/auth/login', { email, password });
      
      saveSession({ token: data.access_token, user: data.user });
      
      if (data.user?.role === 'ADMIN') {
        setMessage('Đăng nhập thành công! Đang chuyển hướng vào Admin...');
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
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
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
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="Nhập Email" 
              className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-medium"
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
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              id="password" 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Nhập mật khẩu" 
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
          className="w-full h-14 text-lg font-bold rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 group"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
          {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </form>
    </>
  );
}
