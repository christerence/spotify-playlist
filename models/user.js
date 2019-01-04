const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  spotID: String,
  token: String,
  profileURL: String,
  profilePhoto: String
});

mongoose.model("users", userSchema);
