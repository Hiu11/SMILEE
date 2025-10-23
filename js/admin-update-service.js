document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#service-form");
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  let services = JSON.parse(localStorage.getItem("services")) || [];
  const s = services[index];

  if (s) {
    form.querySelector("#name").value = s.name;
    form.querySelector("#code").value = s.code;
    form.querySelector("#price").value = s.price;
    form.querySelector("#catCode").value = s.catCode;
    form.querySelector("#catName").value = s.catName;
    form.querySelector("#unit").value = s.unit;
    form.querySelector("#desc").value = s.desc;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    services[index] = {
      name: form.querySelector("#name").value,
      code: form.querySelector("#code").value,
      price: Number(form.querySelector("#price").value),
      catCode: form.querySelector("#catCode").value,
      catName: form.querySelector("#catName").value,
      unit: form.querySelector("#unit").value,
      desc: form.querySelector("#desc").value
    };

    localStorage.setItem("services", JSON.stringify(services));
    alert("✅ Cập nhật dịch vụ thành công!");
    window.location.href = "admin-service-management.html";
  });
});
