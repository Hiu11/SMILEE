const otpForm = document.getElementById('otpForm');

otpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'reset-new.html';
});
const resetForm = document.getElementById('resetForm');
const inputEmail = document.getElementById('inputEmail');

resetForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const value = inputEmail.value.trim();
    const isPhone = /^0\d{9}$/.test(value);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isPhone && !isEmail) {
        showError("Số điện thoại hoặc email không hợp lệ. Vui lòng nhập lại!");
        return;
    }

    window.location.href = 'reset-otp.html';
});

function showError(message) {
    const box = document.createElement('div');
    box.textContent = message;
    box.style.position = 'fixed';
    box.style.top = '20px';
    box.style.left = '50%';
    box.style.transform = 'translateX(-50%)';
    box.style.background = '#e6f0ff';
    box.style.color = '#0f2340';
    box.style.padding = '12px 20px';
    box.style.borderRadius = '10px';
    box.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    box.style.fontSize = '15px';
    box.style.zIndex = '999';
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
}
