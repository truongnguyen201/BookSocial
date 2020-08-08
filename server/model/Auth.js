const mongoose = require("mongoose");
const schema = mongoose.Schema;

const authSchema = new schema({
  email: String,
  username: String,
  password: String,
  fullname: String,
});

module.exports = mongoose.model("Auth", authSchema);
