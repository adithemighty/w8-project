const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const superheroes = require("superheroes");
const supervillains = require("supervillains");

const boardSchema = new Schema({
  title: {
    type: String
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
      autopopulate: true
    }
  ]
});

boardSchema.pre("save", function(next) {
  //if a user entered no board title
  //a random board title will be generated
  try {
    if (!this.title) {
      this.title = `${superheroes.random()} vs. ${supervillains.random()}`;
      return next();
    }
    return next();
  } catch (err) {
    next(err);
  }
});

boardSchema.plugin(autopopulate);

module.exports = mongoose.model("Board", boardSchema);
