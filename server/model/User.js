const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  id: { type: String },
  username: { type: String },
  fullname: { type: String },
  followersID: [{ type: String }],
  followingID: [{ type: String }],
  NumbOfPost: { type: Number },
});

module.exports = mongoose.model("Users", UserSchema);
