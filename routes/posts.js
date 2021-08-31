const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router()
const Post = require('../models/PostSchema')

//POST
//create a post
router.post('/', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
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
    } else {
        return next(new ErrorResponse("You are not allowed to create posts!", 403))
    }
});

//GET
//get all posts
router.get('/', verify, async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (error) {
        next(error)
    }
})

//GET
//get specific post
router.get('/:postID', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})

//DELETE
//delete specific post
router.delete('/:postID', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const removePost = await Post.remove({ _id: req.params.postID })
            res.json(removePost)
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(new ErrorResponse("You are not allowed to delete posts!", 403))
    }
})

//PATCH
//update a post
router.patch('/:postID', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const updatePost = await Post.updateOne(
                { _id: req.params.postID },
                { $set: { title: req.body.title } })
            res.json(updatePost)
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to update posts!", 403))
    }
})

//export module
module.exports = router