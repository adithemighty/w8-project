const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  board: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
      autopopulate: true
    }
  ],
  title: {
    type: String
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
      autopopulate: true
    }
  ],
  timeOfDaily: String
});

teamSchema.pre("save", function(next) {
  //if team has no title
  //a random title will be generated like plural of superheroes
  try {
    if (!this.title) {
      this.title = `${superheroes.random()}s`;
      return next();
    }
    return next();
  } catch (err) {
    next(err);
  }
});

teamSchema.plugin(autopopulate);

module.exports = mongoose.model("Team", teamSchema);
