const socket = io();

function startChat() {
  socket.emit("start");
}

socket.on("waiting", () => {
  document.getElementById("chat").innerHTML += "<p>Waiting for partner...</p>";
});

socket.on("matched", () => {
  document.getElementById("chat").innerHTML += "<p>Connected!</p>";
});

socket.on("message", (msg) => {
  document.getElementById("chat").innerHTML += "<p>Stranger: " + msg + "</p>";
});

function sendMsg() {
  const msg = document.getElementById("msg").value;
  socket.emit("message", msg);
  document.getElementById("chat").innerHTML += "<p>You: " + msg + "</p>";
}
