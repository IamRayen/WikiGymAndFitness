const Post = require("../Models/postSchema");

//get all posts
const getPosts = async (req, res) => {
    try {
        const data = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message, message: "fail" });
    }
};
//get a single post
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Post.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message, message: "fail, cannot find this post"});
    }
};
//create a post
const createPost = async (req, res) => {
    const { title, desc, photo, content, author, categories } = req.body;
    try {
        const post = await Post.create({
            title,
            desc,
            photo,
            content,
            author,
            categories,
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//delete a post
//edit a post

module.exports = {
    createPost,
    getPosts,
    getPost,
};
