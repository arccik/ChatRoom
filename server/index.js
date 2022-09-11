const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2022;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

let users = [];

server.listen(PORT, () => {
  io.on("connection", (socket) => {
    console.log(`${socket.id} user connected!`);

    socket.on("message", (data) => {
      io.emit("messageResponse", data);
    });

    // listen for new users
    socket.on("newUser", (data) => {
      users.push(data);
      socket.emit("newUserResponse", users);
    });
    socket.on("disconnet", () => {
      users.filter((user) => user.socketID !== socket.id);

      io.emit("newUserResponse", users);
      console.log("User Disconnected!");
    });
  });
});
