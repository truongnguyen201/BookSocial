const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  Review: String,
  Recommendation: String,
  img: String,
  Booktitle: String,
  userID: String,
  sharesID: [{ type: String }],
  genreID: String,
  authorID: String,
  userCreator: String,
  date: String,
});

module.exports = mongoose.model("Posts", postSchema);
