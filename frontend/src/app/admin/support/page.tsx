"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatDate } from "@/lib/api";

type Message = {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  createdAt?: string;
};

export default function SupportPage() {
  return (
    <AdminResourcePage<Message>
      title="Hỗ trợ & liên hệ"
      description="Tin nhắn tư vấn từ khách hàng và các yêu cầu cần phản hồi."
      endpoint="/messages"
      totalLabel="Tin nhắn"
      emptyLabel="Chưa có tin nhắn hỗ trợ."
      canDelete={false}
      guide={[
        "Tin nhắn từ trang Liên hệ và Đặt lịch sẽ xuất hiện ở đây.",
        "Ưu tiên phản hồi các tin mới có số điện thoại trước.",
        "Có thể tạo thủ công yêu cầu hỗ trợ khi khách gọi trực tiếp.",
      ]}
      fallback={[
        { id: "mock-1", fullName: "Khách hàng mới", phone: "0900000000", subject: "Tư vấn niềng răng", message: "Tôi muốn đặt lịch tư vấn.", status: "NEW", createdAt: new Date().toISOString() },
      ]}
      fields={[
        { name: "fullName", label: "Họ tên", required: true },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Số điện thoại" },
        { name: "subject", label: "Chủ đề" },
        { name: "message", label: "Nội dung", type: "textarea", required: true },
      ]}
      columns={[
        { key: "fullName", label: "Khách hàng" },
        { key: "phone", label: "Điện thoại" },
        { key: "subject", label: "Chủ đề" },
        { key: "status", label: "Trạng thái", render: (item) => (item.status === "NEW" ? "Mới" : item.status) },
        { key: "createdAt", label: "Ngày gửi", render: (item) => formatDate(item.createdAt) },
      ]}
    />
  );
}
