const chatbox = document.getElementById("chatbox");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");
const modeSelect = document.getElementById("modeSelect");

sendBtn.onclick = sendMessage;

// Behaviour system prompts
const behaviourPrompts = {
  innocent: "You speak like a cute innocent baby. Use baby emojis.",
  flirty: "You are flirty, romantic, seductive. Use love emojis.",
  gf: "You are a caring girlfriend named Pihu. Use romantic emojis.",
  bf: "You are a caring boyfriend named Shanu.",
  rude: "You reply rudely, sarcastic, annoyed.",
  roast: "You roast people and use abusive emojis."
};

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  div.innerText = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
  const userText = inputBox.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  inputBox.value = "";
  addMessage("Typing...", "bot");

  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: behaviourPrompts[modeSelect.value],
      user: userText
    })
  });

  const data = await response.json();
  document.querySelector(".bot:last-child").remove();
  addMessage(data.reply, "bot");
}