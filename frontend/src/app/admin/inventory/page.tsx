"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatCurrency } from "@/lib/api";

type WarehouseItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
};

export default function InventoryPage() {
  return (
    <AdminResourcePage<WarehouseItem>
      title="Kho thuốc & vật tư"
      description="Theo dõi tồn kho, đơn vị tính và giá nhập vật tư nha khoa."
      endpoint="/warehouse"
      totalLabel="Mặt hàng"
      emptyLabel="Kho chưa có mặt hàng nào."
      guide={[
        "Thêm vật tư với số lượng hiện có và đơn vị tính rõ ràng.",
        "Kiểm tra các mặt hàng số lượng thấp trước khi đặt lịch điều trị lớn.",
        "Giá nhập giúp ước tính chi phí vận hành và tồn kho.",
      ]}
      fallback={[
        { id: "mock-1", name: "Găng tay y tế", category: "Dụng cụ", quantity: 120, unit: "Hộp", pricePerUnit: 85000 },
        { id: "mock-2", name: "Thuốc tê Lidocaine", category: "Thuốc", quantity: 35, unit: "Ống", pricePerUnit: 45000 },
      ]}
      fields={[
        { name: "name", label: "Tên vật tư", required: true },
        { name: "category", label: "Loại", required: true },
        { name: "quantity", label: "Số lượng", type: "number", required: true },
        { name: "unit", label: "Đơn vị", required: true },
        { name: "pricePerUnit", label: "Giá mỗi đơn vị", type: "number", required: true },
      ]}
      columns={[
        { key: "name", label: "Tên vật tư" },
        { key: "category", label: "Loại" },
        { key: "quantity", label: "Tồn kho" },
        { key: "unit", label: "Đơn vị" },
        { key: "pricePerUnit", label: "Giá nhập", render: (item) => formatCurrency(item.pricePerUnit) },
      ]}
    />
  );
}
