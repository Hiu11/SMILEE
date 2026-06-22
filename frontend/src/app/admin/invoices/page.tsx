"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatCurrency, formatDate } from "@/lib/api";

type Invoice = {
  id: string;
  totalAmount: number;
  status: string;
  paymentMethod?: string;
  createdAt?: string;
  customer?: { fullName: string };
};

export default function InvoicesPage() {
  return (
    <AdminResourcePage<Invoice>
      title="Quản lý hóa đơn"
      description="Theo dõi hóa đơn điều trị, trạng thái thanh toán và phương thức thu."
      endpoint="/invoices"
      totalLabel="Hóa đơn"
      emptyLabel="Chưa có hóa đơn nào."
      canDelete={false}
      guide={[
        "Tạo hóa đơn bằng ID khách hàng; nếu có lịch hẹn thì nhập thêm ID lịch hẹn.",
        "Chọn trạng thái PAID khi đã thu tiền, UNPAID khi còn công nợ.",
        "Tìm kiếm theo tên khách hàng, phương thức hoặc trạng thái thanh toán.",
      ]}
      fallback={[
        { id: "mock-1", totalAmount: 1200000, status: "UNPAID", paymentMethod: "CASH", createdAt: new Date().toISOString(), customer: { fullName: "Mai Linh" } },
      ]}
      fields={[
        { name: "customerId", label: "ID khách hàng", required: true },
        { name: "appointmentId", label: "ID lịch hẹn" },
        { name: "totalAmount", label: "Tổng tiền", type: "number", required: true },
        {
          name: "status",
          label: "Trạng thái",
          type: "select",
          required: true,
          options: [
            { label: "Chưa thanh toán", value: "UNPAID" },
            { label: "Đã thanh toán", value: "PAID" },
          ],
        },
        { name: "paymentMethod", label: "Phương thức" },
      ]}
      columns={[
        { key: "customer", label: "Khách hàng", render: (item) => item.customer?.fullName ?? "--" },
        { key: "totalAmount", label: "Tổng tiền", render: (item) => formatCurrency(item.totalAmount) },
        { key: "status", label: "Trạng thái", render: (item) => (item.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán") },
        { key: "paymentMethod", label: "Phương thức" },
        { key: "createdAt", label: "Ngày tạo", render: (item) => formatDate(item.createdAt) },
      ]}
    />
  );
}
