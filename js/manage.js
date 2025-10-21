let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const appointmentList = document.getElementById("appointmentList");
const emptyState = document.getElementById("emptyState");
const historyList = document.getElementById("historyList");

function renderAppointments() {
  appointmentList.innerHTML = "";
  historyList.innerHTML = "";

  const newAppointments = appointments.filter(a => a.status === "new");
  const cancelledAppointments = appointments.filter(a => a.status === "cancelled");

  if (newAppointments.length > 0) {
    newAppointments.forEach((app, index) => {
      appointmentList.innerHTML += `
          <div class="appointment-card">
            <div class="appointment-info">
              <strong>${app.time} - ${app.date}</strong><br>
              Nha sĩ: ${app.doctor}<br>
              KH: ${app.fullname}<br>
              SĐT: ${app.phone}
            </div>
            <button class="cancel-btn" onclick="cancelAppointment(${index})">Huỷ</button>
          </div>
        `;
    });
    emptyState.style.display = "none";
  } else {
    emptyState.style.display = "block";
  }

  if (cancelledAppointments.length > 0) {
    cancelledAppointments.forEach(app => {
      historyList.innerHTML += `
          <div class="appointment-card">
            <div class="appointment-info">
              <strong>${app.time} - ${app.date}</strong><br>
              Nha sĩ: ${app.doctor}<br>
              Trạng thái: <span style="color:red;">Đã huỷ</span>
            </div>
          </div>
        `;
    });
  }
}

function cancelAppointment(index) {
  const confirmCancel = confirm("Bạn có chắc muốn huỷ lịch hẹn này không?");
  if (!confirmCancel) return;

  appointments[index].status = "cancelled";

  localStorage.setItem("appointments", JSON.stringify(appointments));

  renderAppointments();
}

renderAppointments();