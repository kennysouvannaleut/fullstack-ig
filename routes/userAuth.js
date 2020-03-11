const express = require('express')
const userAuth = express.Router()
const User = require('../models/user.js')

// signup
userAuth.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('That username is already taken'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send({user: savedUser})
        })
    })
})

// login
userAuth.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Username is incorrect'))
        }
        return res.status(200).send(user)
    })
})

module.exports = userAuth