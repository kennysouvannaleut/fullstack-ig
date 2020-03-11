const express = require('express')
const update = express.Router()
const Post = require('../models/post.js')

// delete post
update.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.postId}, (err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Your image was deleted`)
    })
})

// update post
update.put('/:postId', (req, res, next) => {
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

module.exports = update