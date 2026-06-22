"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20 sm:p-6 lg:p-8 relative">
      
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-semibold group z-20">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Về trang chủ
      </Link>

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Information & Branding */}
        <div className="relative hidden lg:flex flex-col justify-center items-center w-1/2 p-12 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-sm text-center flex flex-col items-center"
          >
            <div className="mb-10">
              <Link href="/" className="relative flex items-center justify-center h-24 w-72 transition-transform hover:scale-105">
                <Image 
                  src="/pic/logo_smilee.png" 
                  alt="SMILEE Logo" 
                  fill 
                  className="object-contain dark:invert" 
                  priority 
                />
              </Link>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4 tracking-tight uppercase">
              Trust Family
            </h2>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Nơi bắt đầu <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 animate-gradient-x">
                nụ cười hoàn hảo
              </span>
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Chào mừng bạn đến với SMILEE. Hãy đăng nhập hoặc đăng ký để trải nghiệm dịch vụ nha khoa hiện đại, tận tâm và tiện lợi nhất.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Form Content */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 bg-white dark:bg-slate-900">
          <div className="w-full max-w-md">
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="lg:hidden mb-10 flex justify-center">
              <Link href="/" className="relative flex items-center justify-center h-20 w-64 transition-transform hover:scale-105">
                <Image 
                  src="/pic/logo_smilee.png" 
                  alt="SMILEE Logo" 
                  fill 
                  className="object-contain dark:invert" 
                  priority 
                />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
