"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Về Chúng Tôi</h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">Trang Giới thiệu đang được xây dựng. Vui lòng quay lại sau!</p>
      </motion.div>
    </div>
  );
}
