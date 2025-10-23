document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newAcc = {
      name: form.querySelector("#name").value,
      code: form.querySelector("#code").value,
      role: form.querySelector("#role").value,
      ref: form.querySelector("#ref").value,
      phone: form.querySelector("#phone").value,
      password: form.querySelector("#password").value,
      experience: form.querySelector("#exp").value,
      degree: form.querySelector("#degree").value,
    };

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push(newAcc);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("✅ Thêm tài khoản thành công!");
    window.location.href = "admin-system-account-management.html";
  });
});
