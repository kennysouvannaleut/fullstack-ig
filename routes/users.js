const express = require('express')
const users = express.Router()
const Post = require('../models/post.js')

// get all users (not sure if we'll use this)
// users.get('/', (req, res, next) => {
//     Post.find((err, users) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         const usernames = users.map(post => post.user)
//         const unique = new Set(usernames)
//         const uniqueUsers = unique.values(unique)
//         return res.status(200).send(Array.from(uniqueUsers))
//     })
// })

// get one user
users.get('/:userId', (req, res, next) => {
    Post.find({user: req.params.userId}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

module.exports = users