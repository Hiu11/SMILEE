"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] -z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Kiến Thức Nha Khoa</h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">Trang Kiến thức đang được xây dựng. Vui lòng quay lại sau!</p>
      </motion.div>
    </div>
  );
}
