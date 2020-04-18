const express = require('express')
const profile = express.Router()
const Profile = require('../models/profile.js')


profile.get('/', (req, res, next) => {
    Profile.find({ username: req.user.username }, 
        (err, profile) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(profile)
    })
})


// get profile
// profile.get('/username', (req, res, next) => {
//     Profile.find({ username: req.username },
//     // Profile.findOne(
//     //     {username: req.params.username},
//         (err, profile) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//         return res.status(200).send(profile)
//     })
// })

// add profile image
// profile.put('/img', (req, res, next) => {
//     Profile.findOneAndUpdate(
//         {username: req.user.username},
//         {img: req.body},
//         {bio: req.body},
//         {upsert: true},
//         (err, profile) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(profile)
//     })
// })

profile.put('/img', (req, res, next) => {
    console.log(111, req.body);
    Profile.findOneAndUpdate(
        { username : req.user.username },
        { $set : { 'img.imgUrl' : req.body.imgUrl }},
        { upsert : true },
        (err, profile) => {
            if (err) {
                res.status(500);
                return next(err);
            };
            return res.status(201).send(profile)
        });
    });

// add bio
// profile.put('/bio', (req, res, next) => {
//     console.log(333, req.body.bio)
//     Profile.findOneAndUpdate(
//         {username: req.user.username},
//         {bio: req.body.data},
//         {upsert : true},
//         (err, profile) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(profile)
//         }
//     )
// })

profile.put('/bio', (req, res, next) => {
    console.log(222, req.body)
    Profile.findOneAndUpdate(
        { username: req.user.username },
        { $set : { bio: req.body.bio }},
        {upsert : true},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            };
            return res.status(201).send(profile)
        });
    });

module.exports = profile