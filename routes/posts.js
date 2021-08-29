const express = require("express");
const router = express.Router()
const Post = require('../models/post')

//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})
//create - submit a post
router.post('/', async (req, res) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }
});
//get specific post
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})
//delete specific post
router.delete('/:postID', async (req, res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postID })
        res.json(removePost)
    } catch (err) {
        res.json({ message: err })
    }
})
//update a post
router.patch('/:postID', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postID },
            { $set: { title: req.body.title } })
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err })
    }
})
//export module
module.exports = router