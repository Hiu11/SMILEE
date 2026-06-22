"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/lib/api";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const fullname = formData.get('fullname') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    try {
      const role = email === 'cinesky.cinema11@gmail.com' ? 'ADMIN' : 'CUSTOMER';

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName: fullname,
          phone,
          role
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Đăng ký thất bại');
      }

      setRegisteredEmail(email);
      setShowOtp(true);
      alert('Đăng ký thành công! Vui lòng kiểm tra email để nhận mã OTP.');

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Đã xảy ra lỗi không xác định');
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registeredEmail,
          otp,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Xác thực OTP thất bại');
      }

      alert('Xác thực OTP thành công! Vui lòng đăng nhập để tiếp tục.');
      router.push('/login');

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Đã xảy ra lỗi không xác định');
      }
    }
  };

  if (showOtp) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto mt-20">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
          Xác thực Email
        </h1>
        <p className="text-slate-500 font-medium text-center">
          Chúng tôi đã gửi một mã OTP gồm 6 số đến email <strong>{registeredEmail}</strong>. Vui lòng kiểm tra hộp thư (và mục Spam).
        </p>
        <form className="w-full space-y-6" onSubmit={handleVerifyOtp}>
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-slate-700 dark:text-slate-300 font-bold">Mã OTP</Label>
            <Input 
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập 6 số OTP"
              className="text-center text-2xl tracking-widest h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-visible:ring-blue-500 font-bold"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-bold rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 group"
          >
            Xác nhận
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
          <Label htmlFor="fullname" className="text-slate-700 dark:text-slate-300 font-bold">
            Họ và tên
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              id="fullname" 
              name="fullname"
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

        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 group"
        >
          Đăng ký
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </>
  );
}
