document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#warehouse-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const newItem = {
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

    let warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];
    warehouses.push(newItem);
    localStorage.setItem("warehouses", JSON.stringify(warehouses));

    alert("✅ Thêm vật tư thành công!");
    window.location.href = "admin-warehouse-management.html";
  });
});
