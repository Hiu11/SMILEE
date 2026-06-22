"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatDate } from "@/lib/api";

type Treatment = {
  id: string;
  patientName: string;
  doctorName: string;
  toothArea: string;
  procedure: string;
  status: string;
  nextVisit?: string;
};

export default function TreatmentsPage() {
  return (
    <AdminResourcePage<Treatment>
      title="Quản lý điều trị"
      description="Theo dõi chi tiết phác đồ, thủ thuật và lịch tái khám của từng bệnh nhân."
      endpoint="/treatments"
      totalLabel="Phiếu điều trị"
      emptyLabel="Chưa có phiếu điều trị nào."
      fallback={[
        { id: "mock-1", patientName: "Nguyễn Trọng Hiếu", doctorName: "BS. Tuấn", toothArea: "Răng 18", procedure: "Nhổ răng khôn", status: "Đang theo dõi", nextVisit: new Date().toISOString() },
        { id: "mock-2", patientName: "Trần Mai Linh", doctorName: "BS. Trang", toothArea: "Hàm trên", procedure: "Tẩy trắng răng", status: "Hoàn thành" },
      ]}
      guide={[
        "Ghi rõ vùng răng hoặc hàm đang điều trị để bác sĩ dễ tra cứu.",
        "Cập nhật trạng thái sau mỗi lần khám nhằm đồng bộ với hồ sơ bệnh án.",
        "Thêm ngày tái khám nếu bệnh nhân cần theo dõi sau thủ thuật.",
      ]}
      fields={[
        { name: "patientName", label: "Tên bệnh nhân", required: true },
        { name: "doctorName", label: "Bác sĩ phụ trách", required: true },
        { name: "toothArea", label: "Vùng điều trị", required: true },
        { name: "procedure", label: "Thủ thuật", type: "textarea", required: true },
        { name: "status", label: "Trạng thái", required: true },
        { name: "nextVisit", label: "Lịch tái khám", type: "datetime-local" },
      ]}
      columns={[
        { key: "patientName", label: "Bệnh nhân" },
        { key: "doctorName", label: "Bác sĩ" },
        { key: "toothArea", label: "Vùng điều trị" },
        { key: "procedure", label: "Thủ thuật" },
        { key: "status", label: "Trạng thái" },
        { key: "nextVisit", label: "Tái khám", render: (item) => formatDate(item.nextVisit) },
      ]}
    />
  );
}
