// socket-server/index.js
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Adjust according to your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());

app.post("/notify", (req, res) => {
  const notification = req.body;
  const toId = notification.userId;
  console.log(notification);
  io.emit(`notification${toId ? "/" + toId : ""}`, notification);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
