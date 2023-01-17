const express = require('express')
const router = express.Router()
const {createPost,getPosts,getPost}=require('../Controllers/postsController')

//get all posts
router.get("/",getPosts)
//get a single post
router.get("/:id",getPost)

//post a post
router.post("/post",createPost)

module.exports = router

