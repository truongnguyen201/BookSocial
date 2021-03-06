const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  Review: String,
  Recommendation: String,
  img: String,
  Booktitle: String,
  userID: String,
  sharesID: [{ type: String }],
  postType: String,
  genreID: String,
  authorID: String,
  userCreator: String,
  date: String,
  rateCount: Number,
  userVoted: [{ type: String }],
  comments: [
    {
      rateCount: Number,
      userVoted: [{ type: String }],
      PostCommentID: String,
      content: String,
      userID: String,
      time: String,
      replyComments: [
        {
          content: String,
          userID: String,
          time: String,
          rateCount: Number,
          userVoted: [{ type: String }],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Posts", postSchema);
