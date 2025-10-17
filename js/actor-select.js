 document.addEventListener("DOMContentLoaded", function () {
  const btnCustomer = document.getElementById("btnCustomer");
  const btnReception = document.getElementById("btnReception");
  const btnDoctor = document.getElementById("btnDoctor");
  const btnAdmin = document.getElementById("btnAdmin");

  if (btnCustomer) {
    btnCustomer.addEventListener("click", function () {
      window.location.href = "login-customer.html";
    });
  }

  if (btnReception) {
    btnReception.addEventListener("click", function () {
      window.location.href = "login-reception.html";
    });
  }

  if (btnDoctor) {
    btnDoctor.addEventListener("click", function () {
      window.location.href = "login-doctor.html";
    });
  }

  if (btnAdmin) {
    btnAdmin.addEventListener("click", function () {
      window.location.href = "login-admin.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnLogin");
  if (btn) {
    btn.addEventListener("click", function () {
      const path = window.location.pathname;
      const currentFile = path.substring(path.lastIndexOf("/") + 1);

      const redirectMap = {
        "login-customer.html": "login-customer-otp.html",
        "login-admin.html": "login-admin-otp.html",
        "login-doctor.html": "login-doctor-otp.html",
        "login-reception.html": "login-reception-otp.html",
      };

      if (redirectMap[currentFile]) {
        window.location.href = redirectMap[currentFile];
      } else {
        alert("Không tìm thấy trang OTP tương ứng 😅");
      }
    });
  }
});