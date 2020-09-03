const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  commenterid: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  meta: {
    upvotes: {
      type: Number,
      required: false,
    },
  },
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
