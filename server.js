const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let waitingUser = null;

io.on("connection", (socket) => {
  if (waitingUser) {
    socket.partner = waitingUser;
    waitingUser.partner = socket;

    socket.emit("matched");
    waitingUser.emit("matched");

    waitingUser = null;
  } else {
    waitingUser = socket;
  }

  socket.on("message", (msg) => {
    socket.partner?.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});
