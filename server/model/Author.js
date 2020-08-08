const mongoose = require("mongoose");
const schema = mongoose.Schema;

const authorSchema = new schema({
  name: String,
  biography: String,
});

module.exports = mongoose.model("Authors", authorSchema);
