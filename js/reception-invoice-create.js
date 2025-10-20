document.getElementById("phoneDisplay").value = localStorage.getItem("currentPhone") || "";

const saveBtn = document.getElementById("saveInvoice");
const popup = document.getElementById("successPopup");

saveBtn.addEventListener("click", () => {
  const name = document.querySelector('input[value="Trọng Hiếu"]').value || "Khách hàng";
  const phone = document.getElementById("phoneDisplay").value || "—";
  const address = document.querySelector('input[placeholder="Nhập địa chỉ khách hàng..."]').value || "—";

  const newInvoice = {
    name: name,
    id: "#HD" + Math.floor(100000 + Math.random() * 900000), 
    total: "—",
    phone: phone,
    order: String(Math.floor(Math.random() * 1000000)).padStart(6, "0"),
    status: "Chưa thanh toán",
    address: address
  };

  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  if (invoices.length === 0) {
  invoices.push(
    { name: "H.T.T.Tuyên", id: "#HD0331157", total: "46.000.000", phone: "0919034559", order: "0000001", status: "Đã thanh toán" },
    { name: "Ngọc Thảo", id: "#HD0331159", total: "120.000.000", phone: "0987654321", order: "0000003", status: "Đã thanh toán" }
  );
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

  invoices.push(newInvoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.add("hidden");
    window.location.href = "./reception-invoice.html";
  }, 1500);
});
