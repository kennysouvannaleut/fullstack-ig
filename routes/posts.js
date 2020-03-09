const express = require('express')
const posts = express.Router()
const Post = require('../models/post.js')

posts.get('/', (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

posts.delete('/:postId', (req, res, status) => {
    Post.findOneAndDelete({_id: req.params.postId}, (err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Your image was deleted`)
    })
})

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

module.exports = posts