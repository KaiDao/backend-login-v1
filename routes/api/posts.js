const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Post = require("../../models/Post");

// @ route POST api/post/newpost
// @desc creats a new post
// @ access Public
router.post("/newpost" , (req,res) => {
    const newPost = new Post({
        post : req.body.post,
        posterid : req.body.posterid,
        comments : [],
        meta : {upvotes : 0},
    });
});

//@route POST api/post/addcomment
//@desc adds a comment to a post
// needs comment, postid, commenterid in req
router.post("/addcomment", (req,res) => {
    
});