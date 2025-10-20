const invoiceId = localStorage.getItem("selectedInvoiceId");
document.getElementById("invoiceId").textContent = invoiceId || "Không xác định";

const confirmBtn = document.getElementById("confirmPayment");
const popup = document.getElementById("successPopup");

confirmBtn.addEventListener("click", () => {
  const fileInput = document.getElementById("fileUpload");
  if (!fileInput.files.length) {
    alert("Vui lòng tải ảnh xác nhận trước khi ghi nhận!");
    return;
  }

  const paidList = JSON.parse(localStorage.getItem("paidInvoices")) || [];
  if (invoiceId && !paidList.includes(invoiceId)) {
    paidList.push(invoiceId);
    localStorage.setItem("paidInvoices", JSON.stringify(paidList));
  }

  let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  const index = invoices.findIndex(inv => inv.id === invoiceId);

  if (index !== -1) {
    invoices[index].status = "Đã thanh toán";
  } else {
    invoices.push({
      name: "Khách hàng",
      id: invoiceId,
      total: "—",
      phone: "—",
      order: "—",
      status: "Đã thanh toán"
    });
  }

  localStorage.setItem("invoices", JSON.stringify(invoices));

  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
    window.location.href = "./reception-invoice.html";
  }, 1500);
});
