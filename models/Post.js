const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post: {
    type: String,
    required: true,
  },
  posterid: {
    type: String,
    required: true,
  },
  commentids: {
    type: [String],
    required: false,
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

module.exports = Post = mongoose.model("post", PostSchema);