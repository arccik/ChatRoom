const socketio = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const SOCKETPORT = process.env.SOCKET_PORT || 2022;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

let users = [];
server.listen(SOCKETPORT, () => {
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      io.emit("messageResponse", data);
    });

    // broadcast when user is typing
    socket.on("typing", (data) => {
      socket.broadcast.emit("typingResponse", data);
    });
    // listen for new users
    socket.on("newUser", (data) => {
      users.push(data);
      socket.emit("newUserResponse", users);
    });
    socket.on("disconnet", () => {
      users.filter((user) => user.socketID !== socket.id);

      io.emit("newUserResponse", users);
    });
  });
});

module.exports = server;
