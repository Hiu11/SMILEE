"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";

type Account = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  isVerified?: boolean;
};

export default function AccountsPage() {
  return (
    <AdminResourcePage<Account>
      title="Quản lý tài khoản"
      description="Tạo và quản lý tài khoản khách hàng, lễ tân, bác sĩ và quản trị."
      endpoint="/users"
      totalLabel="Tài khoản"
      emptyLabel="Chưa có tài khoản nào."
      guide={[
        "Chọn đúng vai trò để phân quyền theo công việc.",
        "Mật khẩu nhập ở đây sẽ được backend mã hóa trước khi lưu.",
        "Dùng tìm kiếm để lọc theo email, tên, số điện thoại hoặc vai trò.",
      ]}
      fallback={[
        { id: "mock-1", fullName: "Nguyễn Tuấn", email: "doctor@smilee.vn", phone: "0901234567", role: "DOCTOR", isVerified: true },
        { id: "mock-2", fullName: "Mai Linh", email: "customer@smilee.vn", phone: "0912345678", role: "CUSTOMER", isVerified: true },
      ]}
      fields={[
        { name: "fullName", label: "Họ tên", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Mật khẩu", required: true },
        { name: "phone", label: "Số điện thoại" },
        {
          name: "role",
          label: "Vai trò",
          type: "select",
          required: true,
          options: [
            { label: "Quản trị", value: "ADMIN" },
            { label: "Lễ tân", value: "RECEPTIONIST" },
            { label: "Bác sĩ", value: "DOCTOR" },
            { label: "Khách hàng", value: "CUSTOMER" },
          ],
        },
      ]}
      columns={[
        { key: "fullName", label: "Họ tên" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Điện thoại" },
        { key: "role", label: "Vai trò" },
        { key: "isVerified", label: "Xác thực", render: (item) => (item.isVerified ? "Đã xác thực" : "Chưa xác thực") },
      ]}
    />
  );
}
