const express = require('express')
const update = express.Router()
const Post = require('../models/post.js')

// delete post
update.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete(
        {_id: req.params.postId, user: req.user._id}, 
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(`Your post was deleted` + deletedPost)
    })
})

// update post
update.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId, user: req.user._id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(`Your post was updated` + updatedPost)
        }
    )
})

// update user icons
update.put('/profile/:username', (req, res, next) => {
    console.log(req.body.data)
    Post.updateMany(
        {postedBy: req.params.username},
        {userImg: req.body.data},
        {new: true},
        (err, updatedPosts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPosts)
        }
    )
})

module.exports = update