"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { getAccessToken, getSessionRole } from "@/lib/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const role = getSessionRole();
      const token = getAccessToken();

      if (role !== "ADMIN" || !token) {
        setAllowed(false);
        setChecked(true);
        router.replace(role ? "/" : "/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Forbidden");
        }

        setAllowed(true);
      } catch {
        setAllowed(false);
        router.replace("/");
      } finally {
        setChecked(true);
      }
    };

    checkAccess();
  }, [router]);

  if (!checked || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">Không có quyền quản trị</h1>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Chỉ tài khoản ADMIN mới được truy cập khu vực quản trị.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
