const express = require('express')
const profile = express.Router()
const Profile = require('../models/profile.js')

// add profile
profile.post('/', (req, res, next) => {
    req.body.username = req.user.username
    const newProfile = new Profile(req.body)
    newProfile.save((err, newProfile) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newProfile)
    })
})

// get profile
profile.get('/:username', (req, res, next) => {
    Profile.findOne(
        {username: req.params.username},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(profile)
    })
})

module.exports = profile