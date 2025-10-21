const LS_TREATMENT = "treatment_records_v1";
const $ = (s) => document.querySelector(s);

if (!localStorage.getItem(LS_TREATMENT)) {
  const seed = [
    {
      id: "#PDT01234",
      customer: "#KH09982",
      name: "Đặng Trần Thảo Lê",
      phone: "0989123456",
      type: "Niềng răng",
      date: "18/10/2025",
      note: "Ca chỉnh nha lần 1",
      services: [{ id: "DV003", name: "Niềng răng mức độ 3" }],
      supplies: [{ id: "VT099", name: "Mắc cài kim loại tự động" }]
    },
    {
      id: "#PDT01235",
      customer: "#KH000331",
      name: "Trọng Hiếu",
      phone: "0995999999",
      type: "Trám răng",
      date: "16/10/2025",
      note: "Trám răng sau",
      services: [{ id: "DV001", name: "Trám răng" }],
      supplies: []
    },
    {
      id: "#PDT01236",
      customer: "#KH000332",
      name: "Mai Linh",
      phone: "0912345678",
      type: "Nhổ răng",
      date: "15/10/2025",
      note: "Nhổ răng khôn bên phải",
      services: [{ id: "DV002", name: "Nhổ răng" }],
      supplies: []
    }
  ];
  localStorage.setItem(LS_TREATMENT, JSON.stringify(seed));
}

const getAll = () => JSON.parse(localStorage.getItem(LS_TREATMENT) || "[]");
const saveAll = (arr) => localStorage.setItem(LS_TREATMENT, JSON.stringify(arr));

const tableBody = $("#tableBody");

function render(keyword = "") {
  const data = getAll().filter((x) => {
    const text = (x.id + x.customer + x.name + x.type + x.phone).toLowerCase();
    return text.includes(keyword.toLowerCase());
  });

  tableBody.innerHTML = "";

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.customer}</td>
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.type}</td>
      <td>${item.date}</td>
    `;
    tr.addEventListener("click", () => {
      localStorage.setItem("current_treatment_id", item.id);
      location.href = "./doctor-management-records-detail.html";
    });
    tableBody.appendChild(tr);
  });
}
render();

$("#searchBox").addEventListener("input", (e) => render(e.target.value));

$("#btnAdd").addEventListener("click", () => {
  const data = getAll();
  const newId = "#PDT" + Math.floor(100000 + Math.random() * 900000);
  const newRec = {
    id: newId,
    customer: "#KH" + Math.floor(100000 + Math.random() * 900000),
    name: "Khách mới",
    phone: "—",
    type: "Chưa xác định",
    date: new Date().toLocaleDateString("vi-VN"),
    note: "",
    services: [],
    supplies: []
  };
  data.unshift(newRec);
  saveAll(data);
  localStorage.setItem("current_treatment_id", newId);
  location.href = "./doctor-management-records-detail.html";
});
