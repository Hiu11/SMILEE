const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const autoReplies = [
  "Dạ, Smilee xin chào! Bạn cần tư vấn dịch vụ nào ạ?",
  "Cảm ơn bạn đã quan tâm đến Nha khoa Smilee ❤️",
  "Hiện tại bên mình có nhiều chương trình ưu đãi, bạn muốn đặt lịch khám chứ ạ?",
  "Bác sĩ sẽ tư vấn trực tiếp nếu bạn đặt lịch trong hôm nay nhé!"
];

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text === "") return;
  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    addMessage(reply, "staff");
  }, 800);
});

userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendBtn.click();
});