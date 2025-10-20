const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'reset-otp.html';
});