const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const customerMsgs = [
    "Chào Smilee ạ, em muốn hỏi về dịch vụ tẩy trắng răng!",
    "Dạ cho em hỏi, bên mình còn lịch khám vào cuối tuần này không ạ?",
    "Em thấy có chương trình ưu đãi implant, còn áp dụng không ạ?",
    "Smilee ơi, em muốn đặt lịch cho ba mẹ thì làm sao ạ?"
];

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateCustomerMessage() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= customerMsgs.length) {
            clearInterval(interval);
            return;
        }
        addMessage(customerMsgs[i], "staff");
        i++;
    }, 2500);
}

sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
});

userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});

window.onload = simulateCustomerMessage;
