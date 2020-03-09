const express = require('express')
const posts = express.Router()
const Post = require('./models/post.js')

posts.get('/', (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            next(err)
        }
        return res.status(200).send(posts)
    })
})

posts.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate
})