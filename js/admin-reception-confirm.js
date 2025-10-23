const time = localStorage.getItem("selectedTime");
const date = localStorage.getItem("selectedDate");
const doctor = localStorage.getItem("selectedDoctor");

if (time && date) document.getElementById("timeInput").value = `${date}, ${time}`;
if (doctor) document.getElementById("doctorInput").value = doctor;

document.getElementById("confirmForm").addEventListener("submit", e => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const appointment = {
    fullname,
    phone,
    doctor,
    date,
    time,
    status: "Đã xác nhận"
  };

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  document.getElementById("successMsg").style.display = "block";

  localStorage.removeItem("selectedDoctor");
  localStorage.removeItem("selectedTime");
  localStorage.removeItem("selectedDate");

  setTimeout(() => {
    window.location.href = "admin-reception-appointment.html";
  }, 2000);
});
