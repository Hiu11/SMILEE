const form = document.getElementById("newPassForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPass = document.getElementById("newPass").value.trim();
    const confirmPass = document.getElementById("confirmPass").value.trim();

    if (newPass.length < 6) {
        showError("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    if (newPass !== confirmPass) {
        showError("Mật khẩu xác nhận không khớp!");
        return;
    }

    alert("Đặt lại mật khẩu thành công! Hãy đăng nhập lại.");
    window.location.href = "login.html";
});

function showError(message) {
    const box = document.createElement("div");
    box.textContent = message;
    box.style.position = "fixed";
    box.style.top = "20px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "#e6f0ff";
    box.style.color = "#0f2340";
    box.style.padding = "12px 20px";
    box.style.borderRadius = "10px";
    box.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    box.style.fontSize = "15px";
    box.style.zIndex = "999";
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
}