document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#account-list");
  const addBtn = document.querySelector("#add-btn");

  if (!localStorage.getItem("accounts")) {
    const sampleAccounts = [
      {
        name: "T.Ú.Quang",
        code: "#TK094988",
        phone: "0978563415",
        role: "Lễ tân",
        experience: 5,
        ref: "REF001",
        password: "123456",
        degree: "Cử nhân Quản trị"
      },
      {
        name: "D.T.Hiếu",
        code: "#TK095211",
        phone: "0912345678",
        role: "Nha sĩ",
        experience: 3,
        ref: "REF002",
        password: "abc123",
        degree: "Bác sĩ Răng Hàm Mặt"
      },
      {
        name: "M.Linh",
        code: "#TK093456",
        phone: "0909999999",
        role: "Admin",
        experience: 7,
        ref: "REF003",
        password: "admin999",
        degree: "Thạc sĩ Quản lý"
      }
    ];
    localStorage.setItem("accounts", JSON.stringify(sampleAccounts));
  }

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  function renderTable() {
    tbody.innerHTML = "";

    accounts.forEach((acc, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${acc.name}</td>
        <td>${acc.code}</td>
        <td>${acc.phone}</td>
        <td>${acc.role}</td>
        <td>${acc.experience}</td>
        <td>
          <a href="admin-update-account.html?index=${i}">Sửa</a> |
          <a href="#" class="delete" data-index="${i}">Xóa</a>
        </td>`;
      tbody.appendChild(tr);
    });

    if (accounts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không có dữ liệu</td></tr>`;
    }
  }

  renderTable();

  addBtn.addEventListener("click", () => {
    window.location.href = "admin-add-account.html";
  });

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.preventDefault();
      const idx = e.target.dataset.index;
      if (confirm("Xóa tài khoản này?")) {
        accounts.splice(idx, 1);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        renderTable();
      }
    }
  });
});
