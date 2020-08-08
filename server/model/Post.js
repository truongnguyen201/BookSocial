const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  Review: String,
  Recommendation: String,
  img: String,
  Booktitle: String,
  genreID: String,
  authorID: String,
});

module.exports = mongoose.model("Posts", postSchema);
