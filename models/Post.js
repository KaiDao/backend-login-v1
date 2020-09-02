const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Comments = new Schema({
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

const PostSchema = new Schema({
  post: {
    type: String,
    required: true,
  },
  posterid: {
    type: String,
    required: true,
  },
  comments: {
    type: [Comments],
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