const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const columnSchema = new Schema({
  title: { type: String, required: true },
  limit: Number,
  order: Number,
  ticket: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      autopopulate: true
    }
  ]
});

columnSchema.plugin(autopopulate);

module.exports = mongoose.model("Column", columnSchema);
