document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#service-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const newService = {
      name: form.querySelector("#name").value,
      code: form.querySelector("#code").value,
      price: Number(form.querySelector("#price").value),
      catCode: form.querySelector("#catCode").value,
      catName: form.querySelector("#catName").value,
      unit: form.querySelector("#unit").value,
      desc: form.querySelector("#desc").value
    };

    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push(newService);
    localStorage.setItem("services", JSON.stringify(services));

    alert("✅ Thêm dịch vụ thành công!");
    window.location.href = "admin-service-management.html";
  });
});
