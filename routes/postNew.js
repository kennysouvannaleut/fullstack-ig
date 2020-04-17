const express = require('express')
const postNew = express.Router()
const Post = require('../models/post.js')
const Profile = require('../models/profile.js')

postNew.post('/', async (req, res, next) => {
    req.body.user = req.user._id
    req.body.postedBy = req.user.username
    try{
        const profile = await Profile.findOne({username: req.user.username})
        if(profile){
            req.body.userImg = profile.img.imgUrl
        }
        const newPost = new Post(req.body)
        const newPostObj = await newPost.save()
        return res.status(201).send(newPostObj)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
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