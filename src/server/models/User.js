const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  password: {
    type: String
  },
  profilePicture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"
  },
  board: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
      autopopulate: true
    }
  ]
});

userSchema.plugin(autopopulate);

module.exports = mongoose.model("User", userSchema);
