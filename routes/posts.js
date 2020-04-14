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

// get (logged in) user's posts
// posts.get('/:user', (req, res, next) => {
//     Post.find({user: req.params.user}, (err, posts) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(posts)
//     })
// })

// get (other) user's posts
posts.get('/user/:username', (req, res, next) => {
    Post.find({postedBy: req.params.username}, (err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// get one post
posts.get('/post/:postId', (req, res, next) => {
    Post.findOne(
        { _id: req.params.postId},
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(post)
    })
})

module.exports = posts

