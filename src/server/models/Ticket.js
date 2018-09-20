const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  blocker: { type: Boolean, default: false },
  description: String,
  estimation: String,
  key: String
});

module.exports = mongoose.model("Ticket", ticketSchema);
