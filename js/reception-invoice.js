// localStorage.removeItem("invoices");
// localStorage.removeItem("tempInvoices");

const phonePopup = document.getElementById("phonePopup");
const openAddPopup = document.getElementById("openAddPopup");
const confirmPhone = document.getElementById("confirmPhone");

openAddPopup.addEventListener("click", () => {
  phonePopup.classList.remove("hidden");
});

confirmPhone.addEventListener("click", () => {
  const phone = document.getElementById("phoneInput").value.trim();
  if (phone === "") return alert("Vui lòng nhập số điện thoại!");
  localStorage.setItem("currentPhone", phone);
  window.location.href = "../html/reception-invoice-create.html";
});

window.addEventListener("DOMContentLoaded", () => {
  let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  const paidList = JSON.parse(localStorage.getItem("paidInvoices")) || [];
  const tbody = document.querySelector(".invoice-table tbody");
  tbody.innerHTML = "";

  const sampleInvoices = [
    { name: "H.T.T.Tuyên", id: "#HD0331157", total: "46.000.000", phone: "0919034559", order: "0000001", status: "Đã thanh toán" },
    { name: "H.T.T.Tuyên", id: "#HD0331158", total: "350.000", phone: "0919034559", order: "0000002", status: "Chưa thanh toán" },
    { name: "Ngọc Thảo", id: "#HD0331159", total: "120.000.000", phone: "0987654321", order: "0000003", status: "Đã thanh toán" }
  ];

  const allInvoices = [...sampleInvoices];
  invoices.forEach(inv => {
    if (!allInvoices.some(s => s.id === inv.id)) {
      allInvoices.push(inv);
    }
  });

  allInvoices.forEach(inv => {
    if (paidList.includes(inv.id)) {
      inv.status = "Đã thanh toán";
    }
  });

  localStorage.setItem("invoices", JSON.stringify(allInvoices));

  allInvoices.forEach(inv => {
    const isPaid = inv.status === "Đã thanh toán";
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${inv.name}</td>
      <td>${inv.id}</td>
      <td>${inv.total}</td>
      <td>${inv.phone}</td>
      <td>${inv.order}</td>
      <td>${inv.status}</td>
      <td>
        <a href="#" 
          class="action-link" 
          style="color: ${isPaid ? '#aaa' : '#1f4ba0'}; pointer-events: ${isPaid ? 'none' : 'auto'};">
          Ghi nhận
        </a>
      </td>
    `;

    if (!isPaid && inv.status === "Chưa thanh toán") {
      tr.classList.add("highlight");
    }

    tbody.appendChild(tr);
  });

  tbody.addEventListener("click", e => {
    const link = e.target.closest(".action-link");
    if (!link) return;

    const row = link.closest("tr");
    const id = row.children[1].textContent.trim();
    const status = row.children[5].textContent.trim();

    if (status === "Chưa thanh toán") {
      localStorage.setItem("selectedInvoiceId", id);
      window.location.href = "./reception-payment.html";
    } else {
      e.preventDefault();
    }
  });

  //  Dọn fake invoices sau khi load
  localStorage.removeItem("tempInvoices");
});
