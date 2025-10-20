document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const validUser = "test@gmail.com";
    const validPass = "123456";

    if (!username || !password) {
      showError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (username === validUser && password === validPass) {
      alert("Đăng nhập thành công! Chuyển đến trang chủ...");
      window.location.href = "home.html"; 
    } else {
      showError("Thông tin đăng nhập không hợp lệ, vui lòng nhập lại!");
    }
  });

  function showError(message) {
    const box = document.createElement("div");
    box.textContent = message;
    box.style.position = "fixed";
    box.style.top = "20px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "#ffeaea";
    box.style.color = "#b60000";
    box.style.padding = "12px 24px";
    box.style.borderRadius = "10px";
    box.style.fontSize = "15px";
    box.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    box.style.zIndex = "9999";
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  }
});
