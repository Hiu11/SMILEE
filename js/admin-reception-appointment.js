document.querySelectorAll(".time-grid button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("booked")) return;

    const doctor = btn.closest(".doctor-card").querySelector("h3").innerText;
    const time = btn.innerText.trim();
    const date = document.getElementById("dateSelect").value;

    localStorage.setItem("selectedDoctor", doctor);
    localStorage.setItem("selectedTime", time);
    localStorage.setItem("selectedDate", date);

    window.location.href = "admin-reception-confirm.html";
  });
});

const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".menu-item a").forEach(link => {
  if (link.getAttribute("href").includes(currentPage)) {
    link.parentElement.classList.add("active");
  }
});
