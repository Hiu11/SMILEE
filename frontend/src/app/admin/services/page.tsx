"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatCurrency } from "@/lib/api";

type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
};

export default function AdminServicesPage() {
  return (
    <AdminResourcePage<Service>
      title="Quản lý dịch vụ"
      description="Danh mục dịch vụ nha khoa, giá và thời lượng thực hiện."
      endpoint="/services"
      totalLabel="Dịch vụ"
      emptyLabel="Chưa có dịch vụ nào."
      guide={[
        "Nhập tên, giá và thời lượng để thêm dịch vụ mới.",
        "Dịch vụ sau khi lưu sẽ hiển thị ở trang Dịch vụ bên ngoài.",
        "Dùng ô tìm kiếm để lọc nhanh theo tên hoặc mô tả.",
      ]}
      fallback={[
        { id: "mock-1", name: "Khám tổng quát", description: "Kiểm tra răng miệng định kỳ", price: 250000, duration: 30 },
        { id: "mock-2", name: "Tẩy trắng răng", description: "Tẩy trắng bằng công nghệ laser", price: 1200000, duration: 45 },
      ]}
      fields={[
        { name: "name", label: "Tên dịch vụ", required: true },
        { name: "description", label: "Mô tả", type: "textarea" },
        { name: "price", label: "Giá", type: "number", required: true },
        { name: "duration", label: "Thời lượng (phút)", type: "number", required: true },
      ]}
      columns={[
        { key: "name", label: "Tên dịch vụ" },
        { key: "description", label: "Mô tả" },
        { key: "price", label: "Giá", render: (item) => formatCurrency(item.price) },
        { key: "duration", label: "Thời lượng", render: (item) => `${item.duration} phút` },
      ]}
    />
  );
}
