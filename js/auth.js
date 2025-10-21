document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const accounts = [
      { email: "doctor@gmail.com", password: "doctor123", role: "doctor" },
      { email: "user@gmail.com", password: "user123", role: "user" },
      { email: "staff@gmail.com", password: "staff123", role: "staff" }
    ];

    const user = accounts.find(
      acc => acc.email === username && acc.password === password
    );

    if (!username || !password) {
      showError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (user) {
      alert(`Đăng nhập thành công! Xin chào ${user.role.toUpperCase()} 😎`);

      switch (user.role) {
        case "doctor":
          window.location.href = "doctor-records.html";
          break;
        case "user":
          window.location.href = "home.html";
          break;
        case "staff":
          window.location.href = "reception-manage.html";
          break;
      }
    } else {
      showError("Sai tài khoản hoặc mật khẩu!");
    }
  });

  function showError(message) {
    const box = document.createElement("div");
    box.textContent = message;
    Object.assign(box.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ffeaea",
      color: "#b60000",
      padding: "12px 24px",
      borderRadius: "10px",
      fontSize: "15px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      zIndex: "9999",
    });
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  }
});
