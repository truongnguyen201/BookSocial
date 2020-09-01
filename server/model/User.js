const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  id: { type: String },
  username: { type: String },
  fullname: { type: String },
  followersID: [{ type: String }],
  followingID: [{ type: String }],
  postsNumb: { type: Number },
  postRated: [{ type: String }],
});

module.exports = mongoose.model("Users", UserSchema);
