import Link from "next/link";
import { CheckCircle2, CalendarDays, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmBookingPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 pt-20 md:pt-24 lg:pt-28 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-green-400/10 blur-3xl dark:bg-green-600/10 animate-float" />
        <div className="absolute right-[10%] top-[40%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-600/10 animate-float delay-1000" />
        <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
      </div>

      <section className="container relative mx-auto flex min-h-[calc(100vh-7rem)] items-center px-4 py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/40 bg-white/70 p-6 md:p-10 lg:p-14 text-center shadow-2xl shadow-green-900/5 backdrop-blur-xl transition-all hover:shadow-green-900/10 dark:border-white/10 dark:bg-slate-900/60">
          <div className="mx-auto flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl md:rounded-[2rem] bg-linear-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30">
            <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12" />
          </div>
          <h1 className="mt-8 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Yêu cầu đặt lịch <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-500">đã được ghi nhận</span></h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Lễ tân SMILEE sẽ kiểm tra khung giờ, phân bác sĩ phù hợp và liên hệ xác nhận với bạn trong thời gian sớm nhất.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Button asChild className="h-12 lg:h-14 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-base lg:text-lg font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-blue-500/50 group relative overflow-hidden">
              <Link href="/pro5">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center justify-center">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Xem lịch hẹn
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 lg:h-14 rounded-2xl border-slate-200/60 bg-white/50 text-base lg:text-lg font-bold shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800/60 dark:bg-slate-950/50 dark:hover:bg-slate-900 group">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5 group-hover:text-blue-500 transition-colors" />
                Đặt lịch khác
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
