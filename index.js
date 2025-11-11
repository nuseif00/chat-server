const express = require("express");
const http = require("http");
const app = express();
const port  = process.env.PORT || 5000;  // 👈 note capital PORT for Vercel
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.json());

var clients = {};

io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "joined");

  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });

  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) {
      clients[targetId].emit("message", msg);
    }
  });
});

// ✅ Add root route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/check", (req, res) => {
  res.json("Your App is working fine");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});