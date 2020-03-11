const express = require('express')
const likes = express.Router()
const Post = require('../models/post.js')

// like post
likes.put('/like/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {$inc: {likes: 1}},
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

// dislike post
likes.put('/dislike/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {$inc: {likes: -1}},
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

module.exports = likes