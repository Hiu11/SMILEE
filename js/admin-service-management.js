document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#service-list");
  const addBtn = document.querySelector("#add-btn");

  if (!localStorage.getItem("services")) {
    const sample = [
      {
        name: "Nhổ răng thường",
        code: "#DV094988",
        price: 250000,
        catCode: "DMDV001",
        catName: "Dịch vụ khác",
        unit: "Lần",
        desc: "Dịch vụ nhổ răng cơ bản"
      },
      {
        name: "Trám răng thẩm mỹ",
        code: "#DV095233",
        price: 400000,
        catCode: "DMDV002",
        catName: "Nha thẩm mỹ",
        unit: "Răng",
        desc: "Trám răng bằng composite"
      },
      {
        name: "Tẩy trắng răng",
        code: "#DV096322",
        price: 600000,
        catCode: "DMDV003",
        catName: "Thẩm mỹ răng",
        unit: "Lần",
        desc: "Tẩy trắng bằng laser"
      }
    ];
    localStorage.setItem("services", JSON.stringify(sample));
  }

  let services = JSON.parse(localStorage.getItem("services")) || [];

  function renderTable(filter = "") {
    tbody.innerHTML = "";
    const f = filter.toLowerCase();
    const list = services.filter(
      s =>
        s.name.toLowerCase().includes(f) ||
        s.code.toLowerCase().includes(f) ||
        s.catName.toLowerCase().includes(f)
    );

    list.forEach((s, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.name}</td>
        <td>${s.code}</td>
        <td>${s.price.toLocaleString("vi-VN")}</td>
        <td>${s.catCode}</td>
        <td>${s.catName}</td>
        <td><a href="admin-update-service.html?index=${i}">Sửa</a> | <a href="#" data-index="${i}" class="delete">Xóa</a></td>
      `;
      tbody.appendChild(tr);
    });

    if (list.length === 0)
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#777;">Không có dữ liệu</td></tr>`;
  }

  renderTable();

  document.querySelector("#search").addEventListener("input", e => renderTable(e.target.value));
  addBtn.addEventListener("click", () => (window.location.href = "admin-add-service.html"));

  tbody.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
      e.preventDefault();
      const idx = e.target.dataset.index;
      if (confirm("Xóa dịch vụ này?")) {
        services.splice(idx, 1);
        localStorage.setItem("services", JSON.stringify(services));
        renderTable();
      }
    }
  });
});
