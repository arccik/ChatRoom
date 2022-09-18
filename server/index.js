const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./socketServer");

const MONGODB_URL = process.env.MONGODB_URL;

const loginRouter = require("./routes/authRouter");
const errorMiddleware = require("./middleware/error-middleware");

const API_PORT = process.env.API_PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", loginRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(API_PORT, () => console.log(`API starts on port ${API_PORT}`));
  } catch (error) {
    console.log("Something went wrong during start up", error);
  }
};

start();
