const express = require('express')
const postNew = express.Router()
const Post = require('../models/post.js')

postNew.post('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.postedBy = req.user.username
    const newPost = new Post(req.body)
    newPost.save((err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(post)
    })
})

// get (logged in) user's posts
postNew.get('/current-user', (req, res, next) => {
    Post.find({ user: req.user }, (err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

module.exports = postNew