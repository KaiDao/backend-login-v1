const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

//*********this entire api needs validation*do not use on prod server until vzalidated */
 








// @route POST api/post/newpost
// @desc creats a new post
// @access Public
// @body {
// post, }
// posterid,
// } 
router.post("/newpost", (req, res) => {
  const newPost = new Post({
    post: req.body.post,
    posterid: req.body.posterid,
    commentid: [],
    meta: { upvotes: 0 },
  });
  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// @route POST api/post/addcomment.
// @desc adds a comment to a post.
// @acces Public.
// @body {
// commenterid,
// comment,
// postid,
// }
router.post("/addcomment", (req, res) => {
  Post.findById(req.body._id).then((post) => {
    const newComment = new Comment({
      commenterid: req.body.commenterid,
      comment: req.body.comment,
      postid: req.body.postid,
      meta: {
        upvotes: 0,
      },
    });
    newComment
      .save()
      .then((comment) => {
        post.commentids.push(comment._id);
        post
          .save()
          .then((post) => {
            console.log(post);
            res.json(post);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  });
});

// @route Post api/post/upvote
// @ desc adds vote to a post
// @acsses Public
// @body {
// _id // id of the post or comment to be updated
// }
router.post("/upvote", (req, res) => {
  Post.findById(req.body._id).then((post) => {
    if (post) {
      post.meta.upvotes = post.meta.upvotes + 1;
      post
        .save()
        .then((post) => {
          res.json(post);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json("post not found.");
    }
  });
});

module.exports = router