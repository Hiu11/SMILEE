const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

const yearSelect = document.querySelector(".year-menu select");
const monthSelect = document.querySelector(".month-menu select");
const daySelect = document.querySelector(".day-menu select");

const scheduleContainer = document.querySelector(".schedule-container");

const mockAppointments = {
  today: [
    { time: "09:30", name: "Trọng Hiếu", status: "Hoàn thành" },
    { time: "10:00", name: "Quang", status: "Chưa đến" },
    { time: "10:30", name: "Trọng Hiếu", status: "Đã hủy" },
    { time: "11:00", name: "Thảo Lê", status: "Chưa đến" },
    { time: "11:30", name: "Hoàng Nhật", status: "Chưa đến" },
  ],
  past: [
    { time: "08:00", name: "Khánh Vy", status: "Hoàn thành" },
    { time: "08:30", name: "Trọng Hiếu", status: "Hoàn thành" },
    { time: "09:00", name: "Bảo Ngọc", status: "Đã hủy" }
  ],
  future: [
    { time: "09:00", name: "Tấn Phát", status: "Chưa đến" },
    { time: "09:30", name: "Ngọc Trâm", status: "Chưa đến" },
    { time: "10:00", name: "Hà My", status: "Đã xác nhận" },
    { time: "10:30", name: "Trọng Hiếu", status: "Đang chờ" }
  ]
};

function renderSchedule(type) {
  scheduleContainer.innerHTML = "";

  let data = [];
  if (type === "past") data = mockAppointments.past;
  else if (type === "future") data = mockAppointments.future;
  else data = mockAppointments.today;

  if (data.length === 0) {
    scheduleContainer.innerHTML = `
      <div style="text-align:center; grid-column: span 6;">
        <p style="color:#666; font-size:16px;">Chưa có lịch hẹn cho ngày này 🕓</p>
      </div>
    `;
    return;
  }

  const grouped = {};
  data.forEach(appt => {
    if (!grouped[appt.time]) grouped[appt.time] = [];
    grouped[appt.time].push(appt);
  });

  Object.entries(grouped).forEach(([time, list]) => {
    const col = document.createElement("div");
    col.className = "time-column";
    col.innerHTML = `<h3>${time}</h3>`;
    list.forEach(a => {
      const div = document.createElement("div");
      div.className = "appointment";
      if (a.status === "Hoàn thành") div.classList.add("completed");
      else if (a.status === "Đã hủy") div.classList.add("cancelled");
      div.innerHTML = `${a.name}<br><small>${a.status}</small>`;
      col.appendChild(div);
    });
    scheduleContainer.appendChild(col);
  });

  const stateText = {
    today: "Lịch hôm nay 🟢",
    past: "Lịch quá khứ 🔴",
    future: "Lịch tương lai 🔵"
  };
  const info = document.createElement("div");
  info.style.gridColumn = "span 6";
  info.style.textAlign = "center";
  info.style.marginTop = "20px";
  info.style.color = "#1f4ba0";
  info.innerHTML = `<strong>${stateText[type]}</strong>`;
  scheduleContainer.appendChild(info);
}

function handleChange() {
  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);
  const day = parseInt(daySelect.value);

  let state = "future";
  if (year < currentYear ||
    (year === currentYear && month < currentMonth) ||
    (year === currentYear && month === currentMonth && day < currentDay)) {
    state = "past";
  } else if (year === currentYear && month === currentMonth && day === currentDay) {
    state = "today";
  }

  renderSchedule(state);
}

yearSelect.addEventListener("change", handleChange);
monthSelect.addEventListener("change", handleChange);
daySelect.addEventListener("change", handleChange);

renderSchedule("today");
