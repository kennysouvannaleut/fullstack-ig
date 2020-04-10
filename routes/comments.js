const express = require('express')
const comments = express.Router()
const Comment = require('../models/post.js')

comments.get('/:postId', (req, res, next) => {
    Comment.find({post: req.params.postId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

comments.post('/post/:postId', (req, res, next) => {
    req.body.user = req.user._id
    req.body.post = req.params._id
    req.body.postedBy = req.user.username
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(comment)
    })
})

comments.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.CommentId, user: req.user._id}, 
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(`Your comment was deleted`)
    })
})

comments.put('/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.CommentId, user: req.user._id},
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send('Your comment was updated')
        }
    )
})

module.exports = comments