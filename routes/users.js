const express = require('express')
const users = express.Router()
const User = require('../models/user.js')
const Profile = require('../models/profile.js')
const Post = require('../models/post.js')
const Comment = require('../models/comment.js')

// get all users:
users.get('/all', (req, res, next) => {
    User.find((err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
    })
})

// delete user (and user's profile, all user's posts, all user's comments, all comments from user's posts)
users.delete('/delete-user', (req, res, next) => {
    const posts = Post.find({user: req.user._id})
    Profile.findOneAndDelete(
        {username: req.user.username},
        (err, deletedProfile) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send('Profile deleted' + deletedProfile)
        }
    )
    Comment.deleteMany(
        {$or: [{user: req.user._id}, {post: posts}]},
        (err, deletedComments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send('Comments deleted' + deletedComments)
        }
    )
    Post.deleteMany(
        posts,
        (err, deletedPosts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send('Posts deleted' + deletedPosts)
        }
    )
    User.findOneAndDelete(
        {_id: req.user._id}, 
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // return res.status(200).send(`User deleted` + deletedUser)
        }
    )
    return res.status(200).send('Profile deleted')
})

// posts.post('/', async (req, res, next) => {
//     req.body.user = req.user._id
//     req.body.postedBy = req.user.username
//     try{
//         const profile = await Profile.findOne({username: req.user.username})
//         if(profile && profile.img){
//             req.body.userImg = profile.img.imgUrl
//         }
//         const newPost = new Post(req.body)
//         const newPostObj = await newPost.save()
//         return res.status(201).send(newPostObj)
//     }
//     catch(err){
//         res.status(500)
//         return next(err)
//     }
// })


module.exports = users