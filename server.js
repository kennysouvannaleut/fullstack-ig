const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
// const firebase = require('firebase')

const dotENV = require('dotenv')
dotENV.config()
const apiKey = process.env.API_KEY

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "image-bucket-4e572.firebaseapp.com",
    databaseURL: "https://image-bucket-4e572.firebaseio.com",
    projectId: "image-bucket-4e572",
    storageBucket: "image-bucket-4e572.appspot.com",
    messagingSenderId: "15521326526",
    appId: "1:15521326526:web:1e2fb596d1b954e7e7c5ef",
    measurementId: "G-QRZNJJGDP6"
  }

// firebase.initializeApp(firebaseConfig)

const dbURL = 'mongodb://localhost:27017/group-api'

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
app.use('/users', require('./routes/users.js'))
app.use('/post', require('./routes/postNew.js'))
app.use('/viewposts', require('./routes/posts.js'))
app.use('/', require('./routes/likeDislike.js'))
app.use('/update', require('./routes/update'))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send( { errMsg: err.message } )
})

const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
    console.log(`Server is running on local port ${PORT}`)
})