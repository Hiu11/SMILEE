"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BadgeDollarSign, CalendarDays, CheckCircle2, CreditCard, Filter, ReceiptText, RefreshCw, Search, Undo2 } from "lucide-react";
import { apiGet, apiPatch, formatCurrency, formatDate } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type InvoiceStatus = "UNPAID" | "PAID";

type Invoice = {
  id: string;
  totalAmount: number;
  status: InvoiceStatus;
  paymentMethod?: string;
  createdAt?: string;
  customer?: { fullName: string; phone?: string };
  appointment?: { id?: string; date?: string };
};

const statusLabel: Record<InvoiceStatus, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | InvoiceStatus>("all");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const loadInvoices = async () => {
    setLoading(true);
    setInvoices(await apiGet<Invoice[]>("/invoices", []));
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    const initFetch = async () => {
      const data = await apiGet<Invoice[]>("/invoices", []);
      if (!ignore) {
        setInvoices(data);
        setLoading(false);
      }
    };
    initFetch();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const matchStatus = status === "all" || invoice.status === status;
      const matchQuery =
        !keyword ||
        `${invoice.customer?.fullName ?? ""} ${invoice.customer?.phone ?? ""} ${invoice.paymentMethod ?? ""} ${invoice.status} ${invoice.id}`.toLowerCase().includes(keyword);
      return matchStatus && matchQuery;
    });
  }, [invoices, query, status]);

  const summary = useMemo(() => {
    return invoices.reduce(
      (total, invoice) => {
        total.revenue += invoice.status === "PAID" ? invoice.totalAmount : 0;
        total.debt += invoice.status === "UNPAID" ? invoice.totalAmount : 0;
        total.paid += invoice.status === "PAID" ? 1 : 0;
        total.unpaid += invoice.status === "UNPAID" ? 1 : 0;
        return total;
      },
      { revenue: 0, debt: 0, paid: 0, unpaid: 0 },
    );
  }, [invoices]);

  const updatePayment = async (invoice: Invoice, nextStatus: InvoiceStatus) => {
    setNotice("");
    const updated = await apiPatch<Invoice>(`/invoices/${invoice.id}`, {
      status: nextStatus,
      paymentMethod: nextStatus === "PAID" ? invoice.paymentMethod || "CASH" : "PENDING",
    });

    setInvoices((current) => current.map((item) => (item.id === invoice.id ? { ...item, ...updated } : item)));
    setNotice(nextStatus === "PAID" ? "Đã ghi nhận thanh toán hóa đơn." : "Đã chuyển hóa đơn về trạng thái chưa thanh toán.");
  };

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-4 md:gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-5 md:p-6 lg:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-violet-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-300 backdrop-blur-md mb-3">
            <ReceiptText className="h-3.5 w-3.5" />
            Tài chính & Thu chi
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">Quản lý hóa đơn</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">Theo dõi công nợ, doanh thu và trạng thái thanh toán từ lịch hẹn đã hoàn thành.</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button onClick={loadInvoices} disabled={loading} variant="outline" className="h-10 md:h-11 lg:h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-4 md:px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-5 md:p-6">
              <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 text-emerald-700 shadow-inner dark:from-green-900/40 dark:to-emerald-900/40 dark:text-emerald-400">
                <BadgeDollarSign className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Đã thu</p>
              <p className="mt-2 text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(summary.revenue)}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{summary.paid} hóa đơn đã thanh toán</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-5 md:p-6">
              <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 text-orange-700 shadow-inner dark:from-amber-900/40 dark:to-orange-900/40 dark:text-orange-400">
                <ReceiptText className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Công nợ</p>
              <p className="mt-2 text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(summary.debt)}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{summary.unpaid} hóa đơn chưa thanh toán</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-5 md:p-6">
              <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-purple-100 text-purple-700 shadow-inner dark:from-violet-900/40 dark:to-purple-900/40 dark:text-purple-400">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Tổng hóa đơn</p>
              <p className="mt-2 text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{invoices.length}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Tự động tạo từ lịch hoàn thành</p>
            </CardContent>
          </Card>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.2}>
        <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
          <CardContent className="flex flex-col gap-3 md:gap-4 p-4 md:p-5 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm khách hàng, SĐT, mã hóa đơn..." className="h-10 md:h-11 lg:h-12 rounded-xl bg-slate-50/50 pl-11 text-sm font-medium transition focus:scale-[1.01] focus:ring-2 focus:ring-violet-500 dark:bg-slate-950/50" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                ["all", "Tất cả"],
                ["UNPAID", "Chưa thanh toán"],
                ["PAID", "Đã thanh toán"],
              ].map(([value, label]) => (
                <Button 
                  key={value} 
                  variant={status === value ? "default" : "outline"} 
                  className={`h-10 rounded-xl px-4 text-xs font-bold transition-all ${status === value ? 'bg-slate-800 dark:bg-white dark:text-slate-900 shadow-md' : 'dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-800'}`} 
                  onClick={() => setStatus(value as "all" | InvoiceStatus)}
                >
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {notice ? (
        <Reveal direction="up" className="rounded-2xl border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 px-5 py-4 shadow-sm dark:border-green-900/50 dark:from-green-950/40 dark:to-emerald-900/20 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">{notice}</p>
        </Reveal>
      ) : null}

      <Stagger className="grid gap-4">
        {filtered.map((invoice) => (
          <StaggerItem key={invoice.id}>
            <article className={`group relative overflow-hidden rounded-3xl border bg-white/80 p-4 md:p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-xl dark:bg-slate-900/80 ${invoice.status === "PAID" ? "border-emerald-200/60 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700" : "border-amber-200/60 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700"}`}>
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity ${invoice.status === "PAID" ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-amber-100 dark:bg-amber-900/40"}`} />
              <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-sm ${invoice.status === "PAID" ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400" : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400"}`}>
                      {invoice.status === "PAID" ? <CheckCircle2 className="h-4 w-4" /> : <ReceiptText className="h-4 w-4" />}
                      {statusLabel[invoice.status]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/50 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {formatDate(invoice.createdAt)}
                    </span>
                    {invoice.appointment?.date ? (
                      <Link href="/admin/appointments" className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/50 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm transition-transform hover:scale-105 dark:border-violet-800/50 dark:bg-violet-950/50 dark:text-violet-400">
                        <CalendarDays className="h-4 w-4" />
                        Lịch hẹn {formatDate(invoice.appointment.date)}
                      </Link>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="truncate text-lg lg:text-xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{invoice.customer?.fullName ?? "Khách hàng"}</h3>
                    <p className="mt-1.5 text-xl lg:text-2xl font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(invoice.totalAmount)}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5" />
                        Phương thức: {invoice.paymentMethod ?? "--"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ReceiptText className="h-3.5 w-3.5" />
                        Mã HĐ: <span className="uppercase">{invoice.id.slice(0, 8)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  {invoice.status === "UNPAID" ? (
                    <Button size="sm" className="h-10 rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all" onClick={() => updatePayment(invoice, "PAID")}>
                      <CheckCircle2 className="mr-1.5 h-4 w-4" />
                      Đã thu tiền
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="h-10 rounded-xl px-5 text-xs font-bold hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-all" onClick={() => updatePayment(invoice, "UNPAID")}>
                      <Undo2 className="mr-1.5 h-4 w-4" />
                      Chuyển sang chưa thanh toán
                    </Button>
                  )}
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {!loading && filtered.length === 0 ? (
        <Reveal direction="up" className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">Không có hóa đơn nào phù hợp</p>
          <p className="mt-1 text-sm font-medium text-slate-500">Thử thay đổi bộ lọc hoặc đợi hóa đơn được tạo tự động.</p>
        </Reveal>
      ) : null}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <RefreshCw className="mb-4 h-8 w-8 animate-spin text-violet-500" />
          <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu...</p>
        </div>
      ) : null}
    </div>
  );
}
