"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[100px] -z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Stethoscope className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Đội Ngũ Nha Sĩ</h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">Trang Nha sĩ đang được xây dựng. Vui lòng quay lại sau!</p>
      </motion.div>
    </div>
  );
}
