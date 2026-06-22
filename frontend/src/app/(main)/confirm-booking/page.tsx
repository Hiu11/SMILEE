import Link from "next/link";
import { CheckCircle2, CalendarDays, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmBookingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 dark:bg-slate-950">
      <section className="container mx-auto flex min-h-[calc(100vh-7rem)] items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">Yêu cầu đặt lịch đã được ghi nhận</h1>
          <p className="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Lễ tân SMILEE sẽ kiểm tra khung giờ, phân bác sĩ phù hợp và liên hệ xác nhận với bạn trong thời gian sớm nhất.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/manage">
                <ClipboardList className="mr-2 h-5 w-5" />
                Xem lịch hẹn
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-xl">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5" />
                Đặt lịch khác
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
