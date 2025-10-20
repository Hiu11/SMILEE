const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item a").forEach(a => {
    if (a.getAttribute("href").includes(path)) {
      a.parentElement.classList.add("active");
    }
  });

  document.querySelectorAll(".time-grid button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("booked")) return; // Giờ đã đặt rồi thì không chọn được

      const doctorName = btn.closest(".doctor-card").querySelector("h3").innerText;
      const selectedTime = btn.innerText.trim();
      const selectedDate = document.getElementById("dateSelect").value;

      localStorage.setItem("selectedDoctor", doctorName);
      localStorage.setItem("selectedTime", selectedTime);
      localStorage.setItem("selectedDate", selectedDate);

      window.location.href = "../html/confirm-booking.html";
    });
  });