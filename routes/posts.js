const express = require('express')
const posts = express.Router()
const Post = require('../models/post.js')

// get all posts
posts.get('/', (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// delete post
posts.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.postId}, (err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Your image was deleted`)
    })
})

// update post
posts.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        req.body,
        {new: true},
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(post)
        }
    )
})

// like post
posts.put('/like/:postId', (req, res, next) => {
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

module.exports = posts