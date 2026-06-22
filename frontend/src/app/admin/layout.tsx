import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminGuard } from "@/components/auth/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="fixed inset-0 flex overflow-hidden bg-slate-50 font-sans tracking-tight dark:bg-slate-950">
        <AdminSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
