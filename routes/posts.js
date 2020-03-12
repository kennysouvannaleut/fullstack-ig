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

module.exports = posts