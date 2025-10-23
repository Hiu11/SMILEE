document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#warehouse-list");
    const addBtn = document.querySelector("#add-btn");

    if (!localStorage.getItem("warehouses")) {
        const sample = [
            {
                name: "Mắc cài 3M kim loại",
                code: "#VT34556",
                quantity: 150,
                unit: "Bộ",
                importDate: "2025-10-17",
                expiry: "Không có",
                importPrice: 24000000,
                sellPrice: 30000000,
                desc: "Mắc cài tự động, nhập từ Mỹ"
            },
            {
                name: "Ống dịch",
                code: "#VT094988",
                quantity: 32,
                unit: "Ống",
                importDate: "2025-10-10",
                expiry: "2026-10-10",
                importPrice: 10000,
                sellPrice: 20000,
                desc: "Ống dịch y tế tiêu chuẩn"
            }
        ];
        localStorage.setItem("warehouses", JSON.stringify(sample));
    }

    let warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];

    function renderTable(filter = "") {
        tbody.innerHTML = "";
        const f = filter.toLowerCase();
        const list = warehouses.filter(
            s =>
                s.name.toLowerCase().includes(f) ||
                s.code.toLowerCase().includes(f)
        );

        list.forEach((s, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${s.name}</td>
        <td>${s.code}</td>
        <td>${s.quantity}</td>
        <td>${s.unit}</td>
        <td>${s.importDate}</td>
        <td>${s.expiry}</td>
        <td><a href="admin-update-warehouse.html?index=${i}">Sửa</a> | <a href="#" class="delete" data-index="${i}">Xóa</a></td>`;
            tbody.appendChild(tr);
        });

        if (list.length === 0)
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#777;">Không có dữ liệu</td></tr>`;
    }

    renderTable();

    document.querySelector("#search").addEventListener("input", e => renderTable(e.target.value));
    addBtn.addEventListener("click", () => (window.location.href = "admin-add-warehouse.html"));

    tbody.addEventListener("click", e => {
        if (e.target.classList.contains("delete")) {
            e.preventDefault();
            const idx = e.target.dataset.index;
            if (confirm("Xóa vật tư này?")) {
                warehouses.splice(idx, 1);
                localStorage.setItem("warehouses", JSON.stringify(warehouses));
                renderTable();
            }
        }
    });
});
