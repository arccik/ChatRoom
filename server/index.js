const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

const loginRouter = require("./routes/login");
const errorMiddleware = require("./middleware/error-middleware");

const SOCKETPORT = process.env.PORT || 2022;

const API_PORT = process.env.WEB_PORT || 4000;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  },
});
app.use(cors());
app.use(express.json());
app.use("/auth", loginRouter);
app.use(errorMiddleware);

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

app.listen(API_PORT, () => console.log(`API starts on port ${API_PORT}`));
