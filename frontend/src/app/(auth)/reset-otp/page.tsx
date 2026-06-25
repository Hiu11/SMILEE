"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("reset_email");
    if (!stored) {
      // No email stored → redirect back
      router.replace("/reset");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(stored);
    }
  }, [router]);

  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const otp = String(form.get("otp") ?? "").trim();

    try {
      // Verify OTP — reuse the same OTP field for reset flow
      // Mark OTP as "verified" in sessionStorage so reset-new page knows it's valid
      // We do the actual password reset in /reset-new with the OTP
      if (otp.length !== 6) {
        setError("Mã OTP phải đúng 6 số.");
        return;
      }
      sessionStorage.setItem("reset_otp", otp);
      router.push("/reset-new");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mã OTP không hợp lệ.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setResendMsg("");
    setError("");
    try {
      await apiPost("/auth/forgot-password", { email });
      setResendMsg("Đã gửi lại mã OTP. Vui lòng kiểm tra hộp thư.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể gửi lại mã.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-2 text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Xác thực OTP</h1>
        <p className="font-medium text-slate-500">
          Nhập mã gồm 6 số đã được gửi tới{" "}
          <span className="font-bold text-blue-600">{email || "email của bạn"}</span>.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleVerify}>
        <div className="space-y-2">
          <Label htmlFor="otp" className="font-bold text-slate-700 dark:text-slate-300">Mã OTP</Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="otp"
              name="otp"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="000000"
              className="h-12 rounded-xl bg-slate-50 pl-10 text-center text-lg font-black tracking-[0.35em] dark:bg-slate-950"
            />
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}
        {resendMsg && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">{resendMsg}</p>}

        <Button disabled={loading} className="h-12 lg:h-14 w-full rounded-xl bg-blue-600 text-base lg:text-lg font-bold text-white hover:bg-blue-700">
          {loading ? "Đang xác nhận..." : "Xác nhận"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          disabled={resending}
          onClick={handleResend}
          className="h-11 w-full rounded-xl"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${resending ? "animate-spin" : ""}`} />
          {resending ? "Đang gửi lại..." : "Gửi lại mã"}
        </Button>
      </form>
    </>
  );
}
