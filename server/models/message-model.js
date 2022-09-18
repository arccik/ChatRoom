const { Schema, model } = require("mongoose");

const Message = new Schema({
  body: { type: String, require: true },
  timeStamp: { type: Date, default: new Date() },
});

module.exports = model("Message", Message);
