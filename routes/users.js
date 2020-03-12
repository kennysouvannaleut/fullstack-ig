const express = require('express')
const users = express.Router()
const Post = require('../models/post.js')
const User = require('../models/user.js')

// get all users:
users.get('/all', (req, res, next) => {
    User.find(
        (err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

// get one user's posts
users.get('/:username', (req, res, next) => {
    Post.find({user: req.params.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

module.exports = users