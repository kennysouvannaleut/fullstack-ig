const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

const dbURL = 'mongodb://localhost:27017/ig-app'

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect (
    dbURL, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }, 
    (err) => {
        if(err) throw err;
        console.log('MongoDB connection established successfully')
    }
)

app.use('/auth', require('./routes/userAuth.js'))
app.use('/viewposts', require('./routes/posts.js'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/post', require('./routes/postNew.js'))
app.use('api/', require('./routes/vote.js'))
app.use('api/update', require('./routes/update'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send( { errMsg: err.message } )
})

const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
    console.log(`Server is running on local port ${PORT}`)
})