/* ====== seed data lần đầu ====== */
const LS_KEY = "doctor_records_v1";
if (!localStorage.getItem(LS_KEY)) {
    const seed = [
        {
            id: "HSBA0001", code: "#KH000331", name: "Trọng Hiếu", gender: "Nam", age: 21,
            phone: "0995 999 999", cccd: "xxxxxxxxxxx", blood: "B +ve", address: "59C Nguyễn Đình Chiểu, TP.HCM",
            lastVisit: "13/09/2025", avatar: "../pic/dentist1.png",
            treatments: [
                { dentist: "Nguyễn Huỳnh Trân", pdt: "#PDT784", date: "13-09-25" },
                { dentist: "Nguyễn Huỳnh Trân", pdt: "#PDT756", date: "04-08-25" },
                { dentist: "Nguyễn Huỳnh Trân", pdt: "#PDT732", date: "23-07-25" },
                { dentist: "Nguyễn Huỳnh Trân", pdt: "#PDT712", date: "05-09-24" },
                { dentist: "Nguyễn Huỳnh Trân", pdt: "#PDT709", date: "04-03-23" }
            ]
        },
        {
            id: "HSBA0002", code: "#KH000332", name: "Trọng Hiếu", gender: "Nam", age: 21,
            phone: "0912 345 678", cccd: "xxxxxxxxxxx", blood: "B +ve",
            address: "Q.1, TP.HCM", lastVisit: "10/09/2025", avatar: "../pic/dentist1.png", treatments: []
        },
        {
            id: "HSBA0003", code: "#KH000333", name: "Trọng Hiếu", gender: "Nam", age: 21,
            phone: "0919 999 999", cccd: "xxxxxxxxxxx", blood: "B +ve",
            address: "Thủ Đức, TP.HCM", lastVisit: "02/09/2025", avatar: "../pic/dentist1.png", treatments: []
        }
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
}

/* ====== helpers ====== */
const $ = s => document.querySelector(s);
const getAll = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
const saveAll = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));
const setCurrentId = (id) => localStorage.setItem("current_hsba_id", id);
const getCurrentId = () => localStorage.getItem("current_hsba_id");

/* ====== PAGE: records list ====== */
if (location.pathname.endsWith("doctor-records.html")) {
    const grid = $("#grid");
    const searchBox = $("#searchBox");
    const toAdd = () => location.href = "./doctor-record-add.html";
    $("#btnAdd")?.addEventListener("click", toAdd);
    $("#btnAdd2")?.addEventListener("click", toAdd);

    const render = (q = "") => {
        // xoá các card cũ (giữ add-card ở index 0)
        grid.querySelectorAll(".card.card-link, .record-card").forEach(n => n.remove());
        const data = getAll().filter(r => {
            const x = (r.name + r.id + r.code + r.phone).toLowerCase();
            return x.includes(q.toLowerCase());
        });
        data.forEach(rec => {
            const a = document.createElement("a");
            a.href = "./doctor-record-detail.html";
            a.className = "card record-card card-link";
            a.innerHTML = `
        <div class="hdr">
          <img class="avatar" src="${rec.avatar}" alt="">
          <div>
            <div style="font-weight:600">${rec.name}</div>
            <div style="font-size:12px;color:#6b7280">${rec.code}</div>
          </div>
        </div>
        <div class="kv"><span>Nhóm máu</span><span>${rec.blood}</span></div>
        <div class="kv"><span>SĐT</span><span>${rec.phone}</span></div>
        <div class="kv"><span>CCCD</span><span>${rec.cccd}</span></div>
        <div class="kv"><span>Lần khám gần nhất</span><span>${rec.lastVisit}</span></div>
      `;
            a.addEventListener("click", () => setCurrentId(rec.id));
            grid.appendChild(a);
        });
    };
    render();
    searchBox?.addEventListener("input", e => render(e.target.value));
}

/* ====== PAGE: detail ====== */
if (location.pathname.endsWith("doctor-record-detail.html")) {
    const id = getCurrentId();
    const data = getAll();
    const rec = data.find(x => x.id === id) || data[0];

    $("#detailAvatar").src = rec.avatar;
    $("#detailName").textContent = rec.name;
    $("#detailCode").textContent = rec.code;

    const info = $("#infoList");
    const rows = [
        ["Nhóm máu", rec.blood], ["SĐT", rec.phone], ["CCCD", rec.cccd],
        ["Ngày sinh", rec.dob || "xx/xx/xxxx"], ["Địa chỉ", rec.address],
        ["Nha sĩ", rec.dentist || "—"], ["Lần khám gần nhất", rec.lastVisit]
    ];
    rows.forEach(([k, v]) => {
        const line = document.createElement("div");
        line.className = "info-row"; line.innerHTML = `<span>${k}</span><span>${v}</span>`;
        info.appendChild(line);
    });

    const list = $("#historyList");
    if (rec.treatments?.length) {
        rec.treatments.slice(0, 8).forEach(t => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `<div class="meta">
          <div><strong>Nha sĩ</strong><br>${t.dentist}</div>
          <div><strong>Phiếu điều trị</strong><br>${t.pdt}</div>
          <div><strong>Ngày</strong><br>${t.date}</div>
        </div>
        <i class="fa-solid fa-angle-right"></i>`;
            list.appendChild(div);
        });
    } else {
        list.innerHTML = `<div class="item"><div>Chưa có lịch sử điều trị</div></div>`;
    }

    $("#btnEdit").addEventListener("click", () => {
        setCurrentId(rec.id);
        location.href = "./doctor-record-edit.html";
    });
}

/* ====== PAGE: edit ====== */
if (location.pathname.endsWith("doctor-record-edit.html")) {
    const id = getCurrentId();
    const data = getAll();
    const rec = data.find(x => x.id === id) || data[0];

    // fill
    $("#fHsba").value = rec.id;
    $("#fCust").value = rec.code;
    $("#fName").value = rec.name;
    $("#fDob").value = rec.dob || "";
    $("#fId").value = rec.cccd;
    $("#fPhone").value = rec.phone;
    $("#fBlood").value = rec.blood;
    $("#fAddress").value = rec.address;

    $("#editForm").addEventListener("submit", (e) => {
        e.preventDefault();
        rec.name = $("#fName").value.trim() || rec.name;
        rec.dob = $("#fDob").value.trim();
        rec.cccd = $("#fId").value.trim();
        rec.phone = $("#fPhone").value.trim();
        rec.blood = $("#fBlood").value.trim();
        rec.address = $("#fAddress").value.trim();
        saveAll(data);
        location.href = "./doctor-record-detail.html";
    });
}

/* ====== PAGE: add ====== */
if (location.pathname.endsWith("doctor-record-add.html")) {
    const genId = () => "HSBA" + String(Math.floor(100000 + Math.random() * 900000));
    $("#aHsba").value = genId();

    $("#addForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const rec = {
            id: $("#aHsba").value,
            code: $("#aCust").value || "#KH" + Math.floor(100000 + Math.random() * 900000),
            name: $("#aName").value || "Khách mới",
            dob: $("#aDob").value || "",
            cccd: $("#aId").value || "xxxxxxxxxxx",
            phone: $("#aPhone").value || "—",
            blood: $("#aBlood").value || "—",
            address: $("#aAddress").value || "—",
            lastVisit: new Date().toLocaleDateString("vi-VN"),
            avatar: "../pic/dentist1.png",
            treatments: []
        };
        const data = getAll(); data.unshift(rec); saveAll(data);
        setCurrentId(rec.id);
        location.href = "./doctor-record-detail.html";
    });
}
