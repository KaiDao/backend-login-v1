const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

// @ route POST api/post/newpost
// @desc creats a new post
// @ access Public
router.post("/newpost", (req, res) => {
  //console.log("new post.");

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

//@route POST api/post/addcomment
//@desc adds a comment to a post
router.post("/addcomment", (req, res) => {
  Post.findById(req.body._id).then((post) => {
    const newComment = new Comment({
      commenterid: req.body.commenterid,
      comment: req.body.comment,
      meta: {
        upvotes: 0,
      },
    });

    newComment
      .save()
      .then((comment) => {
        //console.log(comment);
        post.commentids.push(newComment._id);
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

//@route Post api/post/upvote post
//@ desc adds vote to a post
router.post("/upvotepost", (req, res) => {
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

router.post("/upvotecomment", (req, res) =>{
    Comment.findById(req.body._id).then((comment) => {
        if(comment){
            comment.meta.upvotes = comment.meta.upvotes + 1;

            comment
                .save()
                .then((post) => {
                    res.json(post);
                })
                .catch((err) => { console.log(err) }); 
        }else{
            res.json("comment not found");
        }
    });
});

module.exports = router