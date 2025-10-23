document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const acc = accounts[index];

  if (acc) {
    form.querySelector("#name").value = acc.name;
    form.querySelector("#code").value = acc.code;
    form.querySelector("#role").value = acc.role;
    form.querySelector("#ref").value = acc.ref;
    form.querySelector("#phone").value = acc.phone;
    form.querySelector("#password").value = acc.password;
    form.querySelector("#exp").value = acc.experience;
    form.querySelector("#degree").value = acc.degree;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    accounts[index] = {
      name: form.querySelector("#name").value,
      code: form.querySelector("#code").value,
      role: form.querySelector("#role").value,
      ref: form.querySelector("#ref").value,
      phone: form.querySelector("#phone").value,
      password: form.querySelector("#password").value,
      experience: form.querySelector("#exp").value,
      degree: form.querySelector("#degree").value,
    };

    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("✅ Cập nhật thành công!");
    window.location.href = "admin-system-account-management.html";
  });
});
