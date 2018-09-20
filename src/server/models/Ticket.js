const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  blocker: { type: Boolean, default: false },
  description: String,
  estimation: Number,
  key: String,
  ticketType: {
    type: String,
    enum: ["Bug", "User Story", "Action Item"],
    default: "User Story"
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
