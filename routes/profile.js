const express = require('express')
const profile = express.Router()
const Profile = require('../models/profile.js')

// get profile
profile.get('/:username', (req, res, next) => {
    Profile.findOne(
        // {_id: req.user},
        {username: req.params.username},
        (err, profile) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(profile)
    })
})

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
        // req.user.username, 
        // { $set : req.body }, 
        // { $upsert : true, new: true },
        // {bio: req.body},
        {username: req.user.username},
        {img: req.body},
        {upsert: true, new: true},
        (err, profile) => {
            if (err) {
                res.status(500);
                return next(err);
            };
            return res.status(201).send(profile)
        })
})

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
    Profile.findOneAndUpdate(
        {username: req.user.username},
        {bio: req.body.data},
        // {bio: req.body.bio},
        {upsert: true, new: true},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            };
            return res.status(201).send(profile)
        });
    });

module.exports = profile