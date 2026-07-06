import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/40 p-10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 p-4 shadow-lg shadow-blue-500/30">
            <Search className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-100">
            Không tìm thấy trang
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            Có vẻ như chiếc răng này đã bị nhổ, hoặc đường dẫn bạn truy cập không hề tồn tại trên hệ thống nha khoa SMILEE.
          </p>
          
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Home className="h-4 w-4" />
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
