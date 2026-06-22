import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Giới thiệu", href: "/about" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Nha sĩ", href: "/doctors" },
  { label: "Kiến thức", href: "/knowledge" },
  { label: "Liên hệ", href: "/contact" },
];

const accountLinks = [
  { label: "Đăng nhập", href: "/login" },
  { label: "Đăng ký", href: "/register" },
  { label: "Hồ sơ cá nhân", href: "/profile" },
  { label: "Quản trị", href: "/admin" },
];

const actionLinks = [
  { label: "Đặt lịch khám", href: "/booking" },
  { label: "Xem bảng giá dịch vụ", href: "/services" },
  { label: "Gửi tư vấn", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <Link href="/" className="relative block h-16 w-44 max-w-full overflow-hidden rounded-lg bg-white">
              <Image
                src="/pic/logo_smilee.png"
                alt="SMILEE Logo"
                fill
                className="object-cover object-left"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              Hệ thống quản lý phòng khám nha khoa, kết nối đặt lịch, hồ sơ điều trị, hóa đơn và vận hành nội bộ trong một trải nghiệm thống nhất.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Đặt lịch khám
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-cyan-300">Điều hướng</h3>
            <div className="mt-5 grid gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-cyan-300">Tài khoản</h3>
            <div className="mt-5 grid gap-3 text-sm font-medium">
              {accountLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-cyan-300">Dịch vụ</h3>
            <div className="mt-5 grid gap-3 text-sm font-medium">
              {actionLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-cyan-300">Liên hệ</h3>
            <div className="mt-5 space-y-4 text-sm font-medium leading-6 text-slate-400">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                123 Đường Công Nghệ, TP. Hồ Chí Minh
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                1900 6868 99
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                contact@smilee.vn
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SMILEE Dental Clinic. Designed and developed by Đỗ Trọng Hiếu.</p>
          <p>Chăm sóc nụ cười Việt.</p>
        </div>
      </div>
    </footer>
  );
}
