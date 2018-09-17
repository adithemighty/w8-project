const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: String,
  blocker: { type: Boolean, default: false }
});

module.exports = mongoose.model("Ticket", ticketSchema);
