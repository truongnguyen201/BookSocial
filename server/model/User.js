const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  id: { type: String },
  username: { type: String },
  fullname: { type: String },
  followers: { type: Number },
  following: { type: Number },
  followersID: [{ type: String }],
  followingID: [{ type: String }],
  postsNumb: { type: Number },
});

module.exports = mongoose.model("Users", UserSchema);
