document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#warehouse-form");
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  let warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];
  const w = warehouses[index];

  if (w) {
    form.querySelector("#name").value = w.name;
    form.querySelector("#code").value = w.code;
    form.querySelector("#quantity").value = w.quantity;
    form.querySelector("#unit").value = w.unit;
    form.querySelector("#dateIn").value = w.importDate; 
    form.querySelector("#expiry").value = w.expiry;
    form.querySelector("#status").value = w.status || "";
    form.querySelector("#origin").value = w.origin || "";
    form.querySelector("#batch").value = w.batch || "";
    form.querySelector("#importPrice").value = w.importPrice;
    form.querySelector("#sellPrice").value = w.sellPrice;
    form.querySelector("#desc").value = w.desc;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    warehouses[index] = {
      name: form.querySelector("#name").value,
      code: form.querySelector("#code").value,
      quantity: Number(form.querySelector("#quantity").value),
      unit: form.querySelector("#unit").value,
      importDate: form.querySelector("#dateIn").value, 
      expiry: form.querySelector("#expiry").value,
      status: form.querySelector("#status").value,
      origin: form.querySelector("#origin").value,
      batch: form.querySelector("#batch").value,
      importPrice: Number(form.querySelector("#importPrice").value),
      sellPrice: Number(form.querySelector("#sellPrice").value),
      desc: form.querySelector("#desc").value
    };

    localStorage.setItem("warehouses", JSON.stringify(warehouses));
    alert("✅ Cập nhật vật tư thành công!");
    window.location.href = "admin-warehouse-management.html";
  });
});
