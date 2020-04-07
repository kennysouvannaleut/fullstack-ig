const express = require('express')
const postNew = express.Router()
const Post = require('../models/post.js')

postNew.post('/', (req, res, next) => {
    console.log(777, req.body)
    // req.body.user = req.user._id
    const newPost = new Post(req.body)
    newPost.save((err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(post)
    })
})

// postNew.post('/', (req, res, next) => {
//     const newPost = new Post(req.body)
//     console.log(newPost)
//     // newPost.user = req.user;
//     newPost.save((err, post) => {
//         if(err){ 
//             return next(err)
//         }
//         return res.status(201).send(`New user post created with postID: ${post._id}` + post)
//     })
// })

// output:
// New user post created with postID: 5e877bbcad91e913b56f77db
    // {
    //     likes: 0,
    //     dateAdded: 2020-04-03T18:08:51.203Z,
    //     _id: 5e877bbcad91e913b56f77db,
    //     user: 'blah',
    //     description: 'some description of whatever cool.'
    //   }

module.exports = postNew