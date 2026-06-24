"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { AuthRole, getAccessToken, getSessionRole } from "@/lib/auth";
import { getSidebarLinks } from "@/components/layout/AdminSidebar";

const defaultRouteByRole: Record<AuthRole, string> = {
  ADMIN: "/admin",
  RECEPTIONIST: "/admin/appointments",
  DOCTOR: "/admin/records",
  CUSTOMER: "/",
};

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  const role = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getSessionRole() as AuthRole | null;
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      const currentRole = getSessionRole() as AuthRole | null;
      const token = getAccessToken();

      if (!currentRole || !token) {
        setAllowed(false);
        setChecked(true);
        router.replace("/login");
        return;
      }

      const allowedLinks = getSidebarLinks(currentRole);
      const canOpenRoute = allowedLinks.some((link) => pathname === link.href);

      if (!canOpenRoute) {
        setAllowed(false);
        setChecked(true);
        router.replace(defaultRouteByRole[currentRole] ?? "/");
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
  }, [pathname, router]);

  if (!checked || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">Đang kiểm tra quyền truy cập</h1>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            SMILEE sẽ chuyển bạn đến khu vực phù hợp với vai trò {role ? role : "tài khoản"}.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
