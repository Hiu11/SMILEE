const PDT_KEY = "pdt_list_v1";
const SVC_KEY = "service_catalog_v1";
const SUP_KEY = "supply_catalog_v1";
const CUR_PDTID = "current_pdt_id";

const $ = s => document.querySelector(s);
const fmt = n => Number(n).toLocaleString("vi-VN");

function initCatalogSeed() {
  if (!localStorage.getItem(SVC_KEY)) {
    const svcs = [
      { code: "DV001", name: "Niềng răng mức 1", price: 5000000 },
      { code: "DV002", name: "Niềng răng mức 3", price: 8000000 },
      { code: "DV003", name: "Niềng răng mức 3", price: 12000000 },
      { code: "DV004", name: "Niềng răng mức 4", price: 20000000 },
      { code: "DV005", name: "Nhổ răng", price: 150000 },
      { code: "DV006", name: "Trám răng", price: 150000 },
    ];
    localStorage.setItem(SVC_KEY, JSON.stringify(svcs));
  }
  if (!localStorage.getItem(SUP_KEY)) {
    const sups = [
      { code: "VT098", name: "Mắc cài kim loại thường", price: 24000000 },
      { code: "VT099", name: "Mắc cài kim loại tự động", price: 30000000 },
      { code: "VT100", name: "Mắc cài sứ", price: 40000000 },
    ];
    localStorage.setItem(SUP_KEY, JSON.stringify(sups));
  }
}

function initPdtSeed() {
  initCatalogSeed();
  if (!localStorage.getItem(PDT_KEY)) {
    const seed = [
      {
        id: "#PDT03988", custId: "#KH000331", name: "H.T.T.Tuyền", phone: "0976542515", address: "97 Trần Hưng Đạo",
        type: "Niềng răng", note: "—", date: "16/10/2025", parent: "",
        services: [{ code: "DV004", name: "Niềng răng mức độ 3", price: 12000000, qty: 1 }],
        supplies: [{ code: "VT099", name: "Mắc cài kim loại tự động", price: 30000000, qty: 1 }]
      },
      {
        id: "#PDT04001", custId: "#KH000333", name: "Trọng Hiếu", phone: "0912 345 678", address: "Q1, TP.HCM",
        type: "Trám răng", note: "—", date: "10/10/2025", parent: "",
        services: [{ code: "DV006", name: "Trám răng", price: 150000, qty: 2 }],
        supplies: []
      },
      {
        id: "#PDT04002", custId: "#KH730163", name: "Khách mới", phone: "—", address: "—",
        type: "—", note: "—", date: "20/10/2025", parent: "",
        services: [], supplies: []
      }
    ];
    localStorage.setItem(PDT_KEY, JSON.stringify(seed));
  }
}

const getPdtList = () => JSON.parse(localStorage.getItem(PDT_KEY) || "[]");
const savePdtList = list => localStorage.setItem(PDT_KEY, JSON.stringify(list));
const getSvcs = () => JSON.parse(localStorage.getItem(SVC_KEY) || "[]");
const getSups = () => JSON.parse(localStorage.getItem(SUP_KEY) || "[]");

function renderPdtList(q = "") {
  const tbody = $("#pdtTbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const data = getPdtList().filter(p => {
    const hay = (p.id + p.custId + p.name + p.phone).toLowerCase();
    return hay.includes(q.toLowerCase());
  });
  data.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.custId}</td>
      <td>${p.name}</td>
      <td>${p.phone}</td>
      <td>${p.date}</td>
    `;
    tr.addEventListener("click", () => {
      localStorage.setItem(CUR_PDTID, p.id);
      location.href = "./doctor-management-records-detail.html";
    });
    tbody.appendChild(tr);
  });
}

function setNewPdtId(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const id = "#PDT" + String(Math.floor(100000 + Math.random() * 900000));
  el.value = id;
}

function renderCatalog(type, container, q = "") {
  const items = type === "service" ? getSvcs() : getSups();
  container.innerHTML = "";
  items.filter(x => {
    const hay = (x.code + x.name).toLowerCase();
    return hay.includes(q.toLowerCase());
  }).forEach(x => {
    const row = document.createElement("div");
    row.className = "item";
    row.dataset.code = x.code;
    row.dataset.name = x.name;
    row.dataset.price = x.price;

    row.innerHTML = `
      <div>${x.code}</div>
      <div>${x.name}</div>
      <div>${fmt(x.price)}</div>
      <div class="qty">
        <button type="button" class="minus">–</button>
        <input type="text" value="0" readonly>
        <button type="button" class="plus">+</button>
      </div>
    `;

    const minus = row.querySelector(".minus");
    const plus = row.querySelector(".plus");
    const qty = row.querySelector("input");

    minus.onclick = () => { qty.value = Math.max(0, Number(qty.value) - 1); };
    plus.onclick = () => { qty.value = Number(qty.value) + 1; };

    container.appendChild(row);
  });
}

function handleCreatePdt(e) {
  e.preventDefault();
  const id = $("#fPdtId").value || "#PDT" + Math.floor(100000 + Math.random() * 900000);
  const p = {
    id,
    custId: $("#fCustId").value || "",
    name: $("#fCustName").value || "Khách mới",
    phone: $("#fPhone").value || "—",
    address: $("#fAddress").value || "—",
    type: $("#fType").value || "—",
    note: $("#fNote").value || "",
    parent: $("#fParentPdt").value || "",
    date: new Date().toLocaleDateString("vi-VN"),
    services: [],
    supplies: []
  };

  document.querySelectorAll("#svcList .item").forEach(row => {
    const qty = Number(row.querySelector("input").value);
    if (qty > 0) p.services.push({
      code: row.dataset.code, name: row.dataset.name,
      price: Number(row.dataset.price), qty
    });
  });
  document.querySelectorAll("#supList .item").forEach(row => {
    const qty = Number(row.querySelector("input").value);
    if (qty > 0) p.supplies.push({
      code: row.dataset.code, name: row.dataset.name,
      price: Number(row.dataset.price), qty
    });
  });

  const list = getPdtList();
  list.unshift(p);
  savePdtList(list);
  localStorage.setItem(CUR_PDTID, p.id);
  location.href = "./doctor-management-records-detail.html";
}

function renderPdtDetail() {
  const id = localStorage.getItem(CUR_PDTID);
  const p = getPdtList().find(x => x.id === id);
  if (!p) { location.href = "./doctor-management-records.html"; return; }

  $("#dPdtId").value = p.id;
  $("#dCustId").value = p.custId;
  $("#dParent").value = p.parent || "";
  $("#dName").value = p.name;
  $("#dPhone").value = p.phone;
  $("#dAddr").value = p.address;
  $("#dType").value = p.type;
  $("#dNote").value = p.note;

  const sb = $("#dSvcBody"); sb.innerHTML = "";
  (p.services || []).forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.code}</td><td>${s.name}</td><td>${fmt(s.price)}</td><td>${s.qty}</td>`;
    sb.appendChild(tr);
  });
  if (!p.services?.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4" style="color:#6b7280">Chưa chọn dịch vụ</td>`;
    sb.appendChild(tr);
  }

  const tb = $("#dSupBody"); tb.innerHTML = "";
  (p.supplies || []).forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.code}</td><td>${s.name}</td><td>${fmt(s.price)}</td><td>${s.qty}</td>`;
    tb.appendChild(tr);
  });
  if (!p.supplies?.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4" style="color:#6b7280">Chưa chọn vật tư</td>`;
    tb.appendChild(tr);
  }
}
