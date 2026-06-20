import Link from "next/link";
import { Stethoscope, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group w-fit">
              <div className="relative h-20 w-64 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img src="/pic/logo_smilee.png" alt="SMILEE Logo" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-200 scale-[1.3] origin-left" />
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Hệ thống quản lý phòng khám nha khoa thông minh. Chúng tôi mang đến nụ cười hoàn mỹ với công nghệ tiên tiến nhất và đội ngũ chuyên gia hàng đầu.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <Link href="#" className="hover:text-blue-600 transition-colors">Facebook</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Zalo</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Instagram</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-6">Dịch vụ</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              {["Niềng răng trong suốt", "Bọc răng sứ thẩm mỹ", "Cấy ghép Implant", "Tẩy trắng răng", "Nha khoa trẻ em"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-6">Công ty</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              {["Về chúng tôi", "Đội ngũ bác sĩ", "Bảng giá dịch vụ", "Tin tức & Kiến thức", "Liên hệ"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-6">Liên hệ</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>123 Đường Công Nghệ, Quận Tech, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <span>1900 6868 99</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <span>contact@smilee.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} SMILEE. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
