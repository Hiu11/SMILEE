const time = localStorage.getItem("selectedTime");
const date = localStorage.getItem("selectedDate");
const doctor = localStorage.getItem("selectedDoctor");

if (date && time) document.getElementById("timeInput").value = `${date}, ${time}`;
if (doctor) document.getElementById("doctorInput").value = doctor;

document.getElementById("confirmForm").addEventListener("submit", e => {
    e.preventDefault();

    const date = localStorage.getItem("selectedDate");
    const time = localStorage.getItem("selectedTime");
    const doctor = localStorage.getItem("selectedDoctor");
    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const newAppointment = {
        fullname,
        phone,
        date,
        time,
        doctor,
        status: "new"
    };
    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("successMsg").style.display = "block";

    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedDoctor");

    setTimeout(() => {
        window.location.href = "../html/manage.html";
    }, 2000);
});

