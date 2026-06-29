"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LOCAL_STORAGE_CHANGE_EVENT, notifyLocalStorageChange, useLocalStorageValue } from "@/hooks/useLocalStorageValue";

export type Locale = "vi" | "en";

export const LOCALE_STORAGE_KEY = "smilee-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const storedLocale = useLocalStorageValue(LOCALE_STORAGE_KEY);
  const [fallbackLocale, setFallbackLocale] = useState<Locale>("vi");
  const locale: Locale = storedLocale === "en" || storedLocale === "vi" ? storedLocale : fallbackLocale;

  const setLocale = useCallback((nextLocale: Locale) => {
    setFallbackLocale(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    notifyLocalStorageChange();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "vi" ? "en" : "vi");
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, toggleLocale }), [locale, setLocale, toggleLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 ${compact ? "scale-95" : ""}`}>
      {(["vi", "en"] as const).map((item) => (
        <button
          aria-pressed={locale === item}
          className={`h-8 rounded-full px-3 text-xs font-black transition ${
            locale === item
              ? "bg-blue-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          }`}
          key={item}
          onClick={() => setLocale(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const translations: Record<string, string> = {
  "Giới thiệu": "About",
  "Dịch vụ": "Services",
  "Nha sĩ": "Dentists",
  "Kiến thức": "Knowledge",
  "Liên hệ": "Contact",
  "Quản trị": "Admin",
  "Đăng xuất": "Log out",
  "Đăng nhập": "Log in",
  "Đăng ký": "Register",
  "Đăng nhập ngay": "Log in now",
  "Đăng ký ngay": "Register now",
  "Đăng ký tài khoản": "Create an account",
  "Chưa có tài khoản?": "No account yet?",
  "Đã có tài khoản?": "Already have an account?",
  "Họ và tên": "Full name",
  "Số điện thoại": "Phone number",
  "Mật khẩu": "Password",
  "Quên mật khẩu?": "Forgot password?",
  "Ghi nhớ đăng nhập": "Remember me",
  "Xác thực Email": "Verify email",
  "Xác thực OTP": "Verify OTP",
  "Mã OTP": "OTP code",
  "Xác nhận": "Confirm",
  "Gửi lại mã": "Resend code",
  "Đang gửi lại...": "Resending...",
  "Đang xác nhận...": "Verifying...",
  "Đang xử lý...": "Processing...",
  "Khôi phục mật khẩu": "Reset password",
  "Nhập email để nhận mã OTP khôi phục tài khoản.": "Enter your email to receive an OTP for account recovery.",
  "Mã OTP đã được gửi. Vui lòng kiểm tra email.": "The OTP has been sent. Please check your email.",
  "Nhập mã gồm 6 số đã được gửi tới": "Enter the 6-digit code sent to",
  "email của bạn": "your email",
  "Mã OTP phải đúng 6 số.": "The OTP must be exactly 6 digits.",
  "Mã OTP không hợp lệ.": "Invalid OTP code.",
  "Đã gửi lại mã OTP. Vui lòng kiểm tra hộp thư.": "The OTP has been resent. Please check your inbox.",
  "Không thể gửi lại mã.": "Unable to resend the code.",
  "Mật khẩu mới": "New password",
  "Xác nhận mật khẩu": "Confirm password",
  "Đăng ký thành công! Vui lòng kiểm tra email để nhận mã OTP.": "Registration successful. Please check your email for the OTP.",
  "Đăng ký thất bại": "Registration failed",
  "Xác thực OTP thành công! Đang chuyển đến đăng nhập...": "OTP verified. Redirecting to login...",
  "Xác thực OTP thất bại": "OTP verification failed",
  "Gửi lại OTP thất bại": "Failed to resend OTP",
  "Đăng nhập thành công! Đang chuyển hướng...": "Login successful. Redirecting...",
  "Đăng nhập thành công! Đang chuyển hướng vào hệ thống...": "Login successful. Redirecting to the system...",
  "Đăng nhập thất bại": "Login failed",
  "Đặt lịch": "Book",
  "Đặt lịch ngay": "Book now",
  "Đặt lịch khám": "Book appointment",
  "Đặt lịch khám ngay": "Book an appointment",
  "Đặt lịch mới": "New appointment",
  "Đặt lịch trực tuyến": "Book online",
  "Đặt lịch tư vấn": "Book a consultation",
  "Đặt lịch khám ngay hôm nay.": "Book your visit today.",
  "Thông tin đặt lịch": "Booking information",
  "Thông tin khách hàng": "Customer information",
  "Ngày khám": "Appointment date",
  "Giờ khám": "Appointment time",
  "Bác sĩ": "Doctor",
  "Ghi chú": "Note",
  "Gửi yêu cầu đặt lịch": "Send booking request",
  "Đang gửi yêu cầu...": "Sending request...",
  "Yêu cầu đặt lịch đã được gửi. SMILEE sẽ liên hệ xác nhận sớm.": "Your booking request has been sent. SMILEE will contact you soon to confirm.",
  "Không thể gửi yêu cầu đặt lịch.": "Unable to send booking request.",
  "Chọn dịch vụ": "Select service",
  "Chọn bác sĩ": "Select doctor",
  "Chọn ngày": "Select date",
  "Chọn giờ": "Select time",
  "Hồ sơ cá nhân": "Profile",
  "Tài khoản": "Account",
  "Điều hướng": "Navigation",
  "Xem dịch vụ": "View services",
  "Xem chi tiết": "View details",
  "Xem tất cả": "View all",
  "Xem bảng giá dịch vụ": "View service pricing",
  "Gửi tư vấn": "Send consultation",
  "Gửi tin nhắn": "Send message",
  "Đang gửi...": "Sending...",
  "Biểu mẫu tư vấn": "Consultation form",
  "Thông tin liên hệ": "Contact information",
  "Họ tên": "Full name",
  "Điện thoại": "Phone",
  "Chủ đề": "Subject",
  "Nội dung": "Message",
  "Địa chỉ": "Address",
  "123 Đường Công Nghệ, TP. Hồ Chí Minh": "123 Cong Nghe Street, Ho Chi Minh City",
  "123 ÄÆ°á»ng CĂ´ng Nghá»‡, TP. Há»“ ChĂ­ Minh": "123 Cong Nghe Street, Ho Chi Minh City",
  "Đường Công Nghệ": "Cong Nghe Street",
  "ÄÆ°á»ng CĂ´ng Nghá»‡": "Cong Nghe Street",
  "TP. Hồ Chí Minh": "Ho Chi Minh City",
  "TP. Há»“ ChĂ­ Minh": "Ho Chi Minh City",
  "Hotline": "Hotline",
  "Cài đặt": "Settings",
  "Ngôn ngữ": "Language",
  "Tiếng Việt": "Vietnamese",
  "Tiếng Anh": "English",
  "Lưu cài đặt": "Save settings",
  "Đã lưu cài đặt.": "Settings saved.",
  "Cài đặt khách hàng": "Customer settings",
  "Tuỳ chỉnh trải nghiệm sử dụng SMILEE của bạn.": "Customize your SMILEE experience.",
  "Ngôn ngữ hiển thị": "Display language",
  "Chọn ngôn ngữ áp dụng cho website, menu và khu vực khách hàng.": "Choose the language for the website, menus, and customer area.",
  "Về trang chủ": "Back to home",
  "Menu": "Menu",
  "Đóng menu": "Close menu",
  "Mở menu": "Open menu",
  "SMILEE Dental Clinic — Chuẩn Quốc Tế": "SMILEE Dental Clinic — International Standard",
  "Hệ thống quản lý phòng khám nha khoa — kết nối đặt lịch, hồ sơ điều trị, hóa đơn và vận hành nội bộ trong một trải nghiệm thống nhất.": "A dental clinic management system connecting bookings, treatment records, invoices, and internal operations in one unified experience.",
  "Há»‡ thá»‘ng quáº£n lĂ½ phĂ²ng khĂ¡m nha khoa â€” káº¿t ná»‘i Ä‘áº·t lá»‹ch, há»“ sÆ¡ Ä‘iá»u trá»‹, hĂ³a Ä‘Æ¡n vĂ  váº­n hĂ nh ná»™i bá»™ trong má»™t tráº£i nghiá»‡m thá»‘ng nháº¥t.": "A dental clinic management system connecting bookings, treatment records, invoices, and internal operations in one unified experience.",
  "Nâng niu nụ cười Việt": "Caring for Vietnamese smiles",
  "NĂ¢ng niu ná»¥ cÆ°á»i Viá»‡t": "Caring for Vietnamese smiles",
  "Bộ Y Tế": "Ministry of Health",
  "Bá»™ Y Táº¿": "Ministry of Health",
  "SMILEE kết hợp chuyên môn nha khoa đỉnh cao với công nghệ quản lý hiện đại — đặt lịch, hồ sơ điều trị và chăm sóc sau khám trong một hệ thống thống nhất.": "SMILEE combines advanced dental expertise with modern management technology, bringing appointments, treatment records, and aftercare into one connected system.",
  "SMILEE kết hợp chuyên môn nha khoa với hệ thống quản lý lịch hẹn, hồ sơ điều trị và hóa đơn để mỗi ca chăm sóc được theo dõi từ tiếp nhận đến tái khám.": "SMILEE combines dental expertise with appointment, treatment record, and invoice management so every case is tracked from reception to follow-up.",
  "Nụ cười": "Smile",
  "hoàn hảo": "perfect",
  "bắt đầu từ đây.": "starts here.",
  "Tư vấn miễn phí": "Free consultation",
  "Vô trùng tuyệt đối": "Absolute sterilization",
  "Đánh giá 5.0": "5.0 rating",
  "Đánh giá": "Rating",
  "Tiêu chuẩn": "Standard",
  "An toàn tuyệt đối": "Absolute safety",
  "khách": "customers",
  "Xác nhận trong 1h": "Confirmed within 1 hour",
  "Cuộn xuống": "Scroll down",
  "Khách hàng": "Customers",
  "Hài lòng": "Satisfied",
  "Khách hàng tin tưởng": "Trusted customers",
  "Năm kinh nghiệm": "Years of experience",
  "Chuyên gia nha khoa": "Dental experts",
  "Hài lòng sau điều trị": "Satisfied after treatment",
  "Dịch vụ nổi bật": "Featured services",
  "Giải pháp chăm sóc": "Care solutions",
  "toàn diện": "comprehensive",
  "Đội ngũ chuyên gia với hơn 15 năm kinh nghiệm, ứng dụng công nghệ tiên tiến nhất.": "A specialist team with over 15 years of experience, applying advanced technology.",
  "Công nghệ laser hiện đại, làm sáng răng an toàn, kiểm soát ê buốt hoàn toàn.": "Modern laser technology for safe whitening with sensitivity control.",
  "Chỉnh nha mắc cài hoặc trong suốt theo phác đồ cá nhân hóa.": "Braces or clear aligners following a personalized treatment plan.",
  "Phục hồi răng mất bền vững, an toàn với công nghệ tiên tiến nhất.": "Durable, safe restoration of missing teeth with advanced technology.",
  "Phục hồi thẩm mỹ, màu răng tự nhiên và độ bền cao cấp.": "Aesthetic restoration with natural color and premium durability.",
  "Chăm sóc nhẹ nhàng, tạo thói quen tốt và môi trường thân thiện cho bé.": "Gentle care that builds healthy habits in a child-friendly space.",
  "Tiểu phẫu theo quy trình vô trùng nghiêm ngặt, phục hồi nhanh.": "Minor surgery under strict sterilization protocols with fast recovery.",
  "Tẩy trắng răng": "Teeth whitening",
  "Niềng răng": "Orthodontics",
  "Cấy ghép Implant": "Dental implants",
  "Bọc răng sứ": "Dental crowns",
  "Nha khoa trẻ em": "Pediatric dentistry",
  "Nhổ răng khôn": "Wisdom tooth removal",
  "Khám tổng quát": "General checkup",
  "Tại sao chọn SMILEE": "Why choose SMILEE",
  "Trải nghiệm nha khoa": "Dental experience",
  "khác biệt hoàn toàn": "that feels completely different",
  "Từ bước đặt lịch đến theo dõi tái khám, mọi thứ đều được số hóa và minh bạch hoàn toàn.": "From booking to follow-up tracking, everything is fully digital and transparent.",
  "Vô trùng nghiêm ngặt": "Strict sterilization",
  "Quy trình kiểm soát nhiễm khuẩn rõ ràng, đạt tiêu chuẩn quốc tế cho từng ca khám.": "Clear infection-control workflows that meet international standards for every visit.",
  "Thẩm mỹ tự nhiên": "Natural aesthetics",
  "Tư vấn chuyên sâu theo tình trạng răng thật và mong muốn thực tế của từng khách hàng.": "In-depth consultation based on each customer's real dental condition and goals.",
  "Hồ sơ điện tử toàn diện": "Complete digital records",
  "Mỗi lần khám được lưu trữ để bác sĩ theo dõi tiến trình điều trị xuyên suốt.": "Every visit is recorded so doctors can track the full treatment journey.",
  "Xác nhận lịch hẹn nhanh": "Fast appointment confirmation",
  "Hệ thống thông báo tức thì, lễ tân xử lý và xác nhận lịch khám trong vòng 1 giờ.": "Instant notifications help reception confirm appointments within 1 hour.",
  "Khách hàng nói gì": "What customers say",
  "Hàng nghìn nụ cười": "Thousands of",
  "hạnh phúc": "happy smiles",
  "Sẵn sàng chưa?": "Ready?",
  "Sẵn sàng bắt đầu?": "Ready to start?",
  "Bắt đầu hành trình nụ cười hoàn hảo ngay hôm nay.": "Start your perfect-smile journey today.",
  "Đặt lịch khám trực tuyến hoàn toàn miễn phí. Đội ngũ SMILEE sẽ liên hệ xác nhận trong vòng 1 giờ.": "Book online for free. The SMILEE team will contact you within 1 hour to confirm.",
  "Chi phí từ": "From",
  "phút": "minutes",
  "Dịch vụ nha khoa": "Dental services",
  "Chăm sóc toàn diện cho": "Comprehensive care for",
  "từng nụ cười.": "every smile.",
  "Danh mục dịch vụ đa dạng — từ điều trị cơ bản đến thẩm mỹ nâng cao, mỗi ca điều trị đều được cá nhân hóa theo nhu cầu thực tế.": "A diverse service catalog, from basic care to advanced aesthetics, with every treatment personalized to real needs.",
  "Không gian chuẩn Quốc Tế": "International-standard space",
  "Trải nghiệm dịch vụ nha khoa trong không gian sang trọng, hiện đại và vô trùng tuyệt đối.": "Experience dental care in a refined, modern, and fully sterile space.",
  "Dịch vụ nha khoa chuyên sâu tại SMILEE.": "Specialized dental service at SMILEE.",
  "Đặt lịch tư vấn miễn phí — bác sĩ sẽ kiểm tra và đề xuất giải pháp phù hợp nhất.": "Book a free consultation. A doctor will examine and recommend the best solution.",
  "Đội ngũ bác sĩ": "Doctor team",
  "Bác sĩ SMILEE": "SMILEE doctors",
  "Kinh nghiệm": "Experience",
  "Bệnh nhân": "Patients",
  "bệnh nhân": "patients",
  "Liên hệ bác sĩ": "Contact doctor",
  "theo sát từng kế hoạch điều trị.": "closely following every treatment plan.",
  "Chưa biết chọn bác sĩ nào?": "Not sure which doctor to choose?",
  "Đặt lịch tư vấn tổng quát — lễ tân sẽ sắp xếp bác sĩ phù hợp với tình trạng của bạn.": "Book a general consultation and reception will arrange the doctor best suited to your condition.",
  "TEAM NHA SĨ": "DENTAL TEAM",
  "Chuyên môn vững — theo sát từng kế hoạch điều trị.": "Strong expertise — closely following every treatment plan.",
  "Mỗi bác sĩ tại SMILEE phụ trách một nhóm chuyên môn rõ ràng, phối hợp cùng lễ tân và hồ sơ điện tử để lịch khám luôn nhất quán.": "Each SMILEE doctor owns a clear specialty area and coordinates with reception and digital records to keep every appointment consistent.",
  "Book với nha sĩ": "Book with a dentist",
  "Đặt lịch với nha sĩ": "Book with a dentist",
  "Chỉnh nha & Niềng răng": "Orthodontics & braces",
  "Nha khoa tổng quát": "General dentistry",
  "năm": "years",
  "Kiến thức nha khoa": "Dental knowledge",
  "Bài viết mới nhất": "Latest articles",
  "Đọc thêm": "Read more",
  "Mẹo chăm sóc": "Care tips",
  "Sức khỏe răng miệng": "Oral health",
  "Quản lý lịch hẹn": "Manage appointments",
  "Tra cứu lịch hẹn": "Look up appointments",
  "Mã đặt lịch": "Booking code",
  "Tìm lịch hẹn": "Find appointment",
  "Về SMILEE": "About SMILEE",
  "Phòng khám nha khoa hiện đại —": "Modern dental clinic —",
  "vận hành bằng dữ liệu.": "powered by data.",
  "Giá trị cốt lõi": "Core values",
  "An toàn": "Safety",
  "Tận tâm": "Care",
  "Chuyên môn": "Expertise",
  "Minh bạch": "Transparency",
  "Quy trình vô trùng và kiểm soát chất lượng theo từng bước điều trị.": "Sterilization and quality control at every treatment step.",
  "Lễ tân, bác sĩ và quản trị cùng nhìn một nguồn dữ liệu thống nhất.": "Reception, doctors, and admin teams work from one shared data source.",
  "Điều trị theo phác đồ rõ ràng, lưu hồ sơ để theo dõi dài hạn.": "Clear treatment plans with records kept for long-term tracking.",
  "Dịch vụ, hóa đơn và lịch sử điều trị được quản lý trong hệ thống.": "Services, invoices, and treatment history are managed in one system.",
  "Chặng đường": "Milestones",
  "Hành trình phát triển": "Growth journey",
  "NĂM": "YEAR",
  "Thành lập": "Founded",
  "Mở rộng": "Expansion",
  "Số hóa": "Digitalization",
  "Hôm nay": "Today",
  "SMILEE khai trương với đội ngũ 5 bác sĩ chuyên khoa nha.": "SMILEE opened with a team of 5 dental specialists.",
  "Mở thêm 3 chi nhánh, nâng tổng số bác sĩ lên 20+.": "Expanded with 3 more branches and 20+ doctors.",
  "Ra mắt hệ thống quản lý phòng khám điện tử toàn diện.": "Launched a complete digital clinic management system.",
  "10,000+ khách hàng, 50+ chuyên gia, tiêu chuẩn quốc tế.": "10,000+ customers, 50+ experts, international standards.",
  "Liên hệ SMILEE": "Contact SMILEE",
  "Cần tư vấn? Gửi thông tin, SMILEE phản hồi ngay.": "Need advice? Send your information and SMILEE will respond soon.",
  "Tin nhắn của bạn sẽ được lưu vào hệ thống hỗ trợ trong admin để lễ tân theo dõi, phản hồi và chuyển đúng bộ phận phụ trách.": "Your message will be saved in the admin support system so reception can follow up, respond, and route it to the right team.",
  "Tin nhắn đã được gửi. SMILEE sẽ phản hồi sớm.": "Your message has been sent. SMILEE will respond soon.",
  "Không thể gửi tin nhắn.": "Unable to send message.",
  "Hồ sơ điều trị": "Treatment records",
  "Lịch hẹn gần đây": "Recent appointments",
  "Lịch hẹn": "Appointments",
  "Hồ sơ": "Records",
  "Hoàn thành": "Completed",
  "Tài khoản đã xác thực": "Verified account",
  "Theo dõi lịch hẹn, hồ sơ điều trị và thông tin liên hệ trong một trải nghiệm duy nhất.": "Track appointments, treatment records, and contact information in one place.",
  "Thông tin hồ sơ đã sẵn sàng để lễ tân và bác sĩ hỗ trợ nhanh chóng khi bạn đặt lịch.": "Your profile information is ready so reception and doctors can support you quickly when you book.",
  "Thông tin đọc từ cấu hình dự án.": "Information read from project configuration.",
  "Khách hàng SMILEE": "SMILEE Customer",
  "Đã xác nhận": "Confirmed",
  "Chờ xác nhận": "Pending confirmation",
  "lúc": "at",
  "Cạo vôi răng định kỳ": "Routine scaling",
  "Tư vấn niềng răng": "Orthodontic consultation",
  "Nướu ổn định, hẹn tái khám sau 6 tháng.": "Gums are stable, follow-up scheduled after 6 months.",
  "Đã chụp phim và lên kế hoạch điều trị sơ bộ.": "X-rays completed and preliminary treatment plan created.",
  "Đã hoàn thành": "Completed",
  "Đã hủy": "Cancelled",
  "Tổng quan": "Overview",
  "Khu vực làm việc": "Workspace",
  "Lịch khám": "Appointments",
  "Bệnh án": "medical records",
  "Records bệnh án": "Medical records",
  "Điều trị": "Treatments",
  "Hóa đơn": "Invoices",
  "Kho thuốc & vật tư": "Inventory",
  "Hỗ trợ": "Support",
  "Trang web": "Website",
  "Nhân sự": "Staff",
  "Admin viên": "Admin",
  "Tìm kiếm bệnh nhân, lịch hẹn...": "Search patients, appointments...",
  "Tìm bệnh nhân, SĐT, dịch vụ...": "Search patients, phone, service...",
  "Tổng quan phòng khám": "Clinic overview",
  "Báo cáo hoạt động theo thời gian thực từ cơ sở dữ liệu SMILEE.": "Real-time activity reports from the SMILEE database.",
  "Live Dashboard": "Live Dashboard",
  "Làm mới dữ liệu": "Refresh data",
  "Làm mới": "Refresh",
  "Tổng bệnh nhân": "Total patients",
  "Tổng Patients": "Total patients",
  "Tổng lịch hẹn": "Total appointments",
  "Tổng doanh thu": "Total revenue",
  "Tổng hóa đơn": "Total invoices",
  "Đã thu": "Collected",
  "Công nợ": "Outstanding debt",
  "Tự động tạo từ lịch hoàn thành": "Automatically created from completed appointments",
  "hóa đơn đã thanh toán": "paid invoices",
  "hóa đơn chưa thanh toán": "unpaid invoices",
  "Lịch khám sắp tới": "Upcoming appointments",
  "Trạng thái hệ thống": "System status",
  "Kết nối Backend": "Backend connection",
  "Dữ liệu": "Data",
  "Chưa có lịch hẹn nào sắp tới.": "No upcoming appointments.",
  "Chưa phân bác sĩ": "Doctor not assigned",
  "Chưa phân công": "Unassigned",
  "Điều phối lịch khám": "Appointment coordination",
  "Admin Appointments": "Admin appointments",
  "Theo dõi, xác nhận và cập nhật trạng thái lịch khám. Hóa đơn sẽ được tạo tự động khi hoàn thành lịch.": "Track, confirm, and update appointment status. Invoices are created automatically when appointments are completed.",
  "Tạo lịch hẹn": "Create appointment",
  "Tất cả": "All",
  "Kết quả": "Results",
  "Không có lịch hẹn nào phù hợp": "No matching appointments",
  "Thử thay đổi bộ lọc hoặc tạo một lịch hẹn mới.": "Try changing filters or create a new appointment.",
  "Quản lý hóa đơn": "Invoice management",
  "Theo dõi công nợ, doanh thu và trạng thái thanh toán từ lịch hẹn đã hoàn thành.": "Track debt, revenue, and payment status from completed appointments.",
  "Không có hóa đơn nào phù hợp": "No matching invoices",
  "Thử thay đổi bộ lọc hoặc đợi hóa đơn được tạo tự động.": "Try changing filters or wait for invoices to be created automatically.",
  "Đang tải dữ liệu...": "Loading data...",
  "Hồ sơ bệnh nhân": "Patient records",
  "Thêm bệnh nhân": "Add patient",
  "Quản lý danh sách khách hàng và hồ sơ điều trị. Dữ liệu được lấy trực tiếp từ các tài khoản có vai trò CUSTOMER.": "Manage customer lists and treatment records. Data is pulled directly from CUSTOMER accounts.",
  "Không tìm thấy bệnh nhân nào": "No patients found",
  "Thử thay đổi từ khóa tìm kiếm hoặc tạo tài khoản mới.": "Try changing the search keyword or create a new account.",
  "Đang tải danh sách bệnh nhân...": "Loading patient list...",
  "Thông tin chi tiết": "Details",
  "Chưa cập nhật": "Not updated",
  "Quản lý nha sĩ": "Doctor management",
  "Danh sách bác sĩ được lấy trực tiếp từ tài khoản role DOCTOR. Quản lý thông tin và hồ sơ liên hệ.": "Doctor lists are pulled directly from DOCTOR accounts. Manage contact information and profiles.",
  "Trạng thái": "Status",
  "Đã xác thực": "Verified",
  "Chưa xác thực": "Unverified",
  "Xem hồ sơ": "View profile",
  "Không có nha sĩ nào": "No dentists found",
  "Hãy tạo tài khoản DOCTOR ở tab Tài khoản.": "Create a DOCTOR account in the Accounts tab.",
  "Yêu cầu đặt lịch": "Booking request",
  "đã được ghi nhận": "has been received",
  "Ngôn ngữ hiện tại:": "Current language:",
  "Designed & developed by Đỗ Trọng Hiếu.": "Designed & developed by Do Trong Hieu.",
  "Cạo vôi răng": "Scaling",
  "Theo dõi trạng thái lịch hẹn và thông tin bác sĩ phụ trách.": "Track appointment status and assigned doctor information.",
  "Tìm theo mã, dịch vụ, bác sĩ...": "Search by code, service, doctor...",
  "Công nghệ nha khoa hiện đại": "Modern dental technology",
  "Ứng dụng ánh sáng laser xanh và vật liệu tiên tiến giúp làm trắng răng an toàn tuyệt đối.": "Blue laser light and advanced materials help whiten teeth safely.",
  "Đội ngũ chuyên gia tận tâm": "Dedicated expert team",
  "Các bác sĩ luôn lắng nghe, tư vấn và lên phác đồ cá nhân hóa phù hợp nhất cho bạn.": "Doctors listen, advise, and create the most suitable personalized plan for you.",
  "Vì sao nên lấy cao răng định kỳ?": "Why should you get regular scaling?",
  "Lấy cao răng đúng lịch giúp giảm viêm nướu và giữ hơi thở thơm tho, sạch hơn.": "Regular scaling helps reduce gum inflammation and keeps breath fresher.",
  "Công nghệ": "Technology",
  "Đội ngũ": "Team",
  "Phòng ngừa": "Prevention",
  "Hiểu đúng để chăm sóc răng miệng": "Understand oral care",
  "dễ hơn.": "more easily.",
  "Các bài viết ngắn gọn giúp bạn chuẩn bị trước khi khám, hiểu quy trình điều trị và biết khi nào cần gặp nha sĩ.": "Short articles help you prepare before visits, understand treatment workflows, and know when to see a dentist.",
  "Đọc trong": "Read in",
  "Tư vấn với nha sĩ": "Consult a dentist",
  "Khám định kỳ và vệ sinh đúng cách giúp giảm rủi ro điều trị phức tạp.": "Regular checkups and proper hygiene reduce the risk of complex treatment.",
  "Thẩm mỹ": "Aesthetics",
  "Tẩy trắng, răng sứ và chỉnh nha cần được tư vấn theo tình trạng răng thật.": "Whitening, crowns, and orthodontics should be planned based on real tooth condition.",
  "Tái khám": "Follow-up",
  "Tuân thủ lịch hẹn giúp bác sĩ theo dõi tiến triển và điều chỉnh phác đồ.": "Keeping appointments helps doctors track progress and adjust treatment plans.",
  "Xem tất cả dịch vụ": "View all services",
  "Lễ tân SMILEE sẽ kiểm tra khung giờ, phân bác sĩ phù hợp và liên hệ xác nhận với bạn trong thời gian sớm nhất.": "SMILEE reception will check the time slot, assign a suitable doctor, and contact you to confirm as soon as possible.",
  "Chào mừng bạn đến với SMILEE. Hãy đăng nhập hoặc đăng ký để trải nghiệm dịch vụ nha khoa hiện đại, tận tâm và tiện lợi nhất.": "Welcome to SMILEE. Log in or register to experience modern, caring, and convenient dental services.",
  "Đã tạo lịch hẹn thành công. Lễ tân sẽ liên hệ xác nhận sớm.": "Appointment created successfully. Reception will contact you soon to confirm.",
  "Không thể tạo lịch hẹn.": "Unable to create appointment.",
  "Chọn thời gian phù hợp, SMILEE lo phần còn lại.": "Choose a suitable time, SMILEE handles the rest.",
  "Đặt lịch trực tiếp vào hệ thống phòng khám. Lịch hẹn sẽ xuất hiện ở trang quản trị với trạng thái chờ xác nhận để lễ tân xử lý nhanh chóng.": "Book directly into the clinic system. The appointment will appear in admin as pending so reception can process it quickly.",
  "Bác sĩ chuyên khoa": "Specialist doctor",
  "Xác nhận nhanh": "Fast confirmation",
  "Theo dõi trên admin": "Tracked in admin",
  "Vui lòng điền đầy đủ thông tin để SMILEE phục vụ bạn tốt nhất.": "Please fill in all information so SMILEE can serve you best.",
  "Tư vấn tổng quát": "General consultation",
  "Để phòng khám sắp xếp": "Let the clinic arrange",
  "Đang tạo lịch hẹn...": "Creating appointment...",
  "Tạo lịch hẹn ngay": "Create appointment now",
  "Không thể gửi mã OTP.": "Unable to send OTP.",
  "Quên mật khẩu": "Forgot password",
  "Đang gửi mã OTP...": "Sending OTP...",
  "Gửi mã OTP": "Send OTP",
  "Kiểm tra răng miệng định kỳ và tư vấn kế hoạch chăm sóc cá nhân.": "Routine oral examination and personal care planning.",
  "Công nghệ laser hiện đại, làm sáng răng an toàn và hiệu quả nhanh chóng.": "Modern laser technology for safe, fast, effective whitening.",
  "Phục hồi răng mất bền vững với phác đồ cá nhân hóa từ chuyên gia.": "Durable missing-tooth restoration with an expert personalized plan.",
  "Chỉnh nha mắc cài hoặc trong suốt cho nụ cười cân đối và tự nhiên.": "Braces or clear aligners for a balanced, natural smile.",
  "Phục hồi thẩm mỹ với sứ cao cấp, màu sắc hài hòa tự nhiên.": "Aesthetic restoration with premium ceramic and natural color.",
  "Tiểu phẫu quy trình vô trùng, phục hồi nhanh, giảm đau tối đa.": "Sterile minor surgery with fast recovery and maximum pain reduction.",
  "Khám tổng quát là bước quan trọng nhất để bảo vệ sức khỏe răng miệng dài lâu. Tại SMILEE, chúng tôi không chỉ kiểm tra bề mặt răng mà còn chụp X-quang, đánh giá tình trạng nướu và xương hàm để phát hiện sớm các vấn đề tiềm ẩn.": "A general checkup is the most important step for long-term oral health. At SMILEE, we examine teeth, take X-rays, and assess gums and jawbone to detect hidden issues early.",
  "Phát hiện sớm sâu răng": "Early cavity detection",
  "Tư vấn vệ sinh đúng cách": "Proper hygiene guidance",
  "Kiểm tra sức khỏe nướu": "Gum health check",
  "Tầm soát bệnh lý răng miệng": "Oral disease screening",
  "Bao lâu nên khám tổng quát một lần?": "How often should I get a general checkup?",
  "Tốt nhất là 6 tháng một lần để duy trì sức khỏe răng miệng tốt nhất.": "Every 6 months is best for maintaining oral health.",
  "Tẩy trắng răng bằng công nghệ Laser tiên tiến giúp đánh bay các vết ố vàng do trà, cà phê, thuốc lá chỉ sau 45 phút. Ánh sáng xanh kích hoạt gel làm trắng, không gây ê buốt, an toàn tuyệt đối cho men răng.": "Advanced laser whitening removes stains from tea, coffee, and tobacco in just 45 minutes. Blue light activates whitening gel without sensitivity and is safe for enamel.",
  "Hiệu quả ngay lập tức": "Immediate results",
  "Không gây ê buốt": "No sensitivity",
  "Màu sắc tự nhiên": "Natural color",
  "Duy trì kết quả từ 2-3 năm": "Results last 2-3 years",
  "Tẩy trắng răng có đau không?": "Does whitening hurt?",
  "Công nghệ Laser tại SMILEE hoàn toàn không gây đau đớn, chỉ có cảm giác hơi ê nhẹ ở một số cơ địa nhạy cảm.": "SMILEE laser whitening is painless, with only mild sensitivity for some sensitive cases.",
  "Cấy ghép Implant là giải pháp hoàn hảo để thay thế răng đã mất. Trụ Titanium siêu cấp được cấy trực tiếp vào xương hàm, đóng vai trò như chân răng thật, mang lại khả năng nhai và tính thẩm mỹ trọn vẹn.": "Dental implants are an ideal solution for missing teeth. A premium titanium post is placed into the jawbone like a natural root, restoring chewing and aesthetics.",
  "Độ bền trọn đời": "Lifetime durability",
  "Ngăn chặn tiêu xương hàm": "Prevents jawbone loss",
  "Thẩm mỹ như răng thật": "Natural-tooth aesthetics",
  "Không ảnh hưởng răng kế cận": "No impact on nearby teeth",
  "Cấy ghép Implant mất bao lâu?": "How long does implant placement take?",
  "Quá trình đặt trụ mất khoảng 30-45 phút, sau đó cần 3-6 tháng để trụ tích hợp hoàn toàn vào xương.": "Post placement takes about 30-45 minutes, followed by 3-6 months for full bone integration.",
  "Niềng răng chỉnh nha giúp khắc phục triệt để tình trạng hô, móm, khấp khểnh. Đội ngũ chuyên gia tại SMILEE sẽ lên phác đồ cá nhân hóa bằng phần mềm 3D, dự đoán chính xác kết quả sau điều trị.": "Orthodontics corrects overbite, underbite, and crowding. SMILEE specialists build personalized 3D plans to predict results accurately.",
  "Khớp cắn chuẩn xác": "Accurate bite",
  "Khuôn mặt hài hòa": "Balanced face",
  "Dễ dàng vệ sinh": "Easy cleaning",
  "Hạn chế bệnh lý về sau": "Reduces future dental issues",
  "Niềng răng trong suốt có hiệu quả không?": "Are clear aligners effective?",
  "Có, Invisalign có hiệu quả tương đương mắc cài với thẩm mỹ tối đa, tuy nhiên phù hợp nhất với các ca từ nhẹ đến trung bình.": "Yes. Invisalign can be as effective as braces with better aesthetics, especially for mild to moderate cases.",
  "Bọc răng sứ thẩm mỹ là lựa chọn hàng đầu cho nụ cười hoàn hảo. Chúng tôi sử dụng các dòng sứ cao cấp nhất (Cercon, Zirconia, Emax) với độ bền uốn cao, màu sắc trong bóng tự nhiên, chống bám màu tuyệt đối.": "Aesthetic ceramic crowns are a top choice for a perfect smile. We use premium ceramics like Cercon, Zirconia, and Emax for durability, natural translucency, and stain resistance.",
  "Thay đổi nụ cười tức thì": "Instant smile transformation",
  "Bảo vệ răng yếu, vỡ": "Protects weak or cracked teeth",
  "Không đen viền nướu": "No dark gumline",
  "Độ cứng gấp 5 lần răng thật": "Five times harder than natural teeth",
  "Bọc răng sứ có cần mài nhiều răng không?": "Do crowns require heavy tooth reduction?",
  "Với công nghệ bọc sứ bảo tồn, bác sĩ chỉ mài một lớp mỏng tối thiểu từ 0.5-1mm để giữ tối đa răng thật.": "With conservative crown technology, doctors remove only a thin 0.5-1mm layer to preserve natural teeth.",
  "Nhổ răng khôn bằng máy Piezotome sử dụng sóng siêu âm giúp bóc tách mô nướu nhẹ nhàng, không xâm lấn sâu. Quy trình vô trùng tuyệt đối, bác sĩ chuyên khoa phẫu thuật thực hiện giúp quá trình lành thương nhanh gấp 2 lần bình thường.": "Piezotome wisdom tooth removal uses ultrasound to separate gum tissue gently with minimal invasion. Strict sterilization and specialist surgeons help healing happen up to twice as fast.",
  "Không đau, ít chảy máu": "Painless, minimal bleeding",
  "Thời gian nhổ nhanh": "Fast extraction",
  "Lành thương nhanh chóng": "Fast healing",
  "Giảm thiểu sưng tấy": "Reduced swelling",
  "Nhổ răng khôn bao lâu thì ăn uống bình thường?": "How long after wisdom tooth removal can I eat normally?",
  "Bạn có thể ăn đồ mềm, nguội sau vài giờ. Sau 2-3 ngày có thể ăn uống gần như bình thường.": "You can eat soft, cool food after a few hours. After 2-3 days, eating is almost normal.",
  "SMILEE cung cấp dịch vụ nha khoa chất lượng cao với trang thiết bị hiện đại và đội ngũ chuyên gia giàu kinh nghiệm. Mỗi ca điều trị đều được cá nhân hóa nhằm mang lại hiệu quả cao nhất cho từng nụ cười.": "SMILEE provides high-quality dental services with modern equipment and experienced specialists. Every treatment is personalized for the best outcome.",
  "Đội ngũ chuyên nghiệp": "Professional team",
  "Công nghệ tiên tiến": "Advanced technology",
  "Chăm sóc tận tâm": "Dedicated care",
  "Tôi nên đặt lịch trước bao lâu?": "How far in advance should I book?",
  "Bạn nên đặt lịch trước 1-2 ngày để phòng khám sắp xếp khung giờ và bác sĩ phù hợp nhất.": "You should book 1-2 days in advance so the clinic can arrange the best time and doctor.",
  "Không tìm thấy dịch vụ": "Service not found",
  "Quay lại danh mục": "Back to catalog",
  "Tất cả dịch vụ": "All services",
  "Chi tiết dịch vụ": "Service details",
  "Chi phí dự kiến": "Estimated cost",
  "Thời gian": "Duration",
  "Đặt lịch dịch vụ này": "Book this service",
  "Lợi ích mang lại": "Benefits",
  "Câu hỏi thường gặp": "FAQ",
};

const placeholders: Record<string, string> = {
  "Tư vấn dịch vụ, lịch khám, chi phí...": "Service advice, appointment time, pricing...",
  "Nhập Email": "Enter email",
  "Nhập mật khẩu": "Enter password",
  "Nhập email của bạn": "Enter your email",
};

function translateText(value: string) {
  let nextValue = value;
  const entries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);

  for (const [source, target] of entries) {
    nextValue = nextValue.split(source).join(target);
  }

  return nextValue;
}

export function AutoTranslate() {
  const { locale } = useLanguage();
  const originalsRef = useRef<WeakMap<Node, string>>(new WeakMap());
  const originalAttrsRef = useRef<WeakMap<Element, Record<string, string>>>(new WeakMap());

  useEffect(() => {
    const originals = originalsRef.current;
    const originalAttrs = originalAttrsRef.current;
    const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
    let isUpdating = false;

    const restore = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const original = originals.get(node);
        if (original !== undefined && node.textContent !== original) node.textContent = original;
        node = walker.nextNode();
      }
      root.querySelectorAll?.("[placeholder],[aria-label]").forEach((element) => {
        const attrs = originalAttrs.get(element);
        if (!attrs) return;
        Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
      });
    };

    const translate = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || ignoredTags.has(parent.tagName) || parent.closest("[data-no-translate]")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let node = walker.nextNode();
      while (node) {
        if (!originals.has(node)) originals.set(node, node.textContent ?? "");
        const original = originals.get(node) ?? "";
        const nextText = locale === "en" ? translateText(original) : original;
        if (node.textContent !== nextText) node.textContent = nextText;
        node = walker.nextNode();
      }

      root.querySelectorAll?.("[placeholder],[aria-label]").forEach((element) => {
        if (!originalAttrs.has(element)) {
          originalAttrs.set(element, {
            placeholder: element.getAttribute("placeholder") ?? "",
            "aria-label": element.getAttribute("aria-label") ?? "",
          });
        }
        const attrs = originalAttrs.get(element);
        if (!attrs) return;
        Object.entries(attrs).forEach(([name, value]) => {
          if (!value) return;
          const nextValue = locale === "en" ? placeholders[value] ?? translations[value] ?? value : value;
          if (element.getAttribute(name) !== nextValue) element.setAttribute(name, nextValue);
        });
      });
    };

    const run = () => {
      if (isUpdating) return;
      isUpdating = true;
      if (locale === "vi") restore(document.body);
      translate(document.body);
      isUpdating = false;
    };

    run();
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(run);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, run);
    return () => {
      observer.disconnect();
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, run);
    };
  }, [locale]);

  return null;
}
