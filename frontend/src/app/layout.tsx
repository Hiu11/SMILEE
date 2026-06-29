import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/i18n/AppProviders";

export const metadata: Metadata = {
  title: "SMILEE - Hệ Thống Nha Khoa Chuẩn Quốc Tế",
  description: "Giải pháp quản lý phòng khám và đặt lịch khám nha khoa hiện đại, chuyên nghiệp hàng đầu.",
  icons: {
    icon: "/favicon.ico",
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
