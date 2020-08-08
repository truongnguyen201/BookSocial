const mongoose = require("mongoose");
const schema = mongoose.Schema;

const genreSchema = new schema({
  GenreTitle: String,
  Summary: String,
});

module.exports = mongoose.model("Genres", genreSchema);
