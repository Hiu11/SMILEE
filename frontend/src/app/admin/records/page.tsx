"use client";

import { AdminResourcePage } from "@/components/admin/AdminResourcePage";
import { formatDate } from "@/lib/api";

type MedicalRecord = {
  id: string;
  diagnosis: string;
  treatmentPlan: string;
  notes?: string;
  createdAt?: string;
  patient?: { fullName: string };
};

export default function RecordsPage() {
  return (
    <AdminResourcePage<MedicalRecord>
      title="Hồ sơ bệnh án"
      description="Lưu chẩn đoán, kế hoạch điều trị và ghi chú theo lịch khám."
      endpoint="/records"
      totalLabel="Hồ sơ"
      emptyLabel="Chưa có hồ sơ bệnh án."
      canEdit={false}
      canDelete={false}
      guide={[
        "Nhập đúng ID bệnh nhân và ID lịch hẹn để liên kết hồ sơ với ca khám.",
        "Chẩn đoán nên ngắn gọn, kế hoạch điều trị cần ghi rõ bước tiếp theo.",
        "Ghi chú dùng cho dặn dò tái khám, thuốc hoặc lưu ý đặc biệt.",
      ]}
      fallback={[
        { id: "mock-1", diagnosis: "Viêm nướu nhẹ", treatmentPlan: "Lấy cao răng và tái khám sau 2 tuần", createdAt: new Date().toISOString(), patient: { fullName: "Nguyễn Trọng Hiếu" } },
      ]}
      fields={[
        { name: "patientId", label: "ID bệnh nhân", required: true },
        { name: "appointmentId", label: "ID lịch hẹn", required: true },
        { name: "diagnosis", label: "Chẩn đoán", type: "textarea", required: true },
        { name: "treatmentPlan", label: "Kế hoạch điều trị", type: "textarea", required: true },
        { name: "notes", label: "Ghi chú", type: "textarea" },
      ]}
      columns={[
        { key: "patient", label: "Bệnh nhân", render: (item) => item.patient?.fullName ?? "--" },
        { key: "diagnosis", label: "Chẩn đoán" },
        { key: "treatmentPlan", label: "Điều trị" },
        { key: "createdAt", label: "Ngày tạo", render: (item) => formatDate(item.createdAt) },
      ]}
    />
  );
}
