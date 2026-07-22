import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/i18n/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "SMILEE | Hệ Thống Nha Khoa Chuẩn Quốc Tế",
    template: "%s | SMILEE",
  },
  description: "Giải pháp quản lý phòng khám và đặt lịch khám nha khoa hiện đại, tự động hóa quy trình chăm sóc khách hàng chuyên nghiệp.",
  keywords: ["Nha khoa", "Smilee", "Đặt lịch nha khoa", "Phòng khám nha khoa", "Dental CRM"],
  authors: [{ name: "SMILEE Team" }],
  creator: "SMILEE",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://smilee.vn",
    title: "SMILEE | Hệ Thống Nha Khoa Chuẩn Quốc Tế",
    description: "Giải pháp quản lý phòng khám và đặt lịch khám nha khoa hiện đại, tự động hóa quy trình chăm sóc khách hàng.",
    siteName: "SMILEE",
    images: [
      {
        url: "/pic/banner_home.png",
        width: 1200,
        height: 630,
        alt: "SMILEE - Hệ thống nha khoa toàn diện",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMILEE | Hệ Thống Nha Khoa Chuẩn Quốc Tế",
    description: "Giải pháp quản lý phòng khám và đặt lịch khám nha khoa hiện đại.",
    images: ["/pic/banner_home.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans tracking-tight">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
