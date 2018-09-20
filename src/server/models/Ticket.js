const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: String,
  blocker: { type: Boolean, default: false },
  description: String,
  estimation: String,
  key: String
});

module.exports = mongoose.model("Ticket", ticketSchema);
