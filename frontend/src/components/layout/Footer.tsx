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
    <footer className="relative overflow-hidden border-t border-white/6 bg-slate-950 text-slate-300">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-500/6 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" />

      <div className="container relative mx-auto px-4 py-10 md:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_1.1fr]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="relative block h-14 w-44">
              <Image src="/pic/logo_smilee.png" alt="SMILEE Logo" fill className="object-contain object-left" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Hệ thống quản lý phòng khám nha khoa — kết nối đặt lịch, hồ sơ điều trị, hóa đơn và vận hành nội bộ trong một trải nghiệm thống nhất.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-1 hover:shadow-blue-600/40"
            >
              <CalendarDays className="h-4 w-4" />
              Đặt lịch khám
            </Link>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Điều hướng</h3>
            <div className="mt-4 md:mt-5 grid gap-2.5 md:gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:translate-x-1 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Tài khoản</h3>
            <div className="mt-4 md:mt-5 grid gap-2.5 md:gap-3 text-sm font-medium">
              {accountLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:translate-x-1 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Dịch vụ</h3>
            <div className="mt-4 md:mt-5 grid gap-2.5 md:gap-3 text-sm font-medium">
              {actionLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:translate-x-1 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Liên hệ</h3>
            <div className="mt-4 md:mt-5 space-y-3 md:space-y-4 text-sm font-medium leading-6 text-slate-400">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                123 Đường Công Nghệ, TP. Hồ Chí Minh
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                1900 6868 99
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                contact@smilee.vn
              </p>
            </div>

            {/* Mini trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["ISO 9001", "Bộ Y Tế"].map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 md:mt-14 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SMILEE Dental Clinic. Designed & developed by Đỗ Trọng Hiếu.</p>
          <p className="gradient-text font-bold">Nâng niu nụ cười Việt 🦷</p>
        </div>
      </div>
    </footer>
  );
}
