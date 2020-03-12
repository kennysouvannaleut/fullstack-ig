const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

const firebaseConfig = {
    apiKey: "AIzaSyBMzNMMbyeAsrmfVwA0I4s4lGM4AR7jOq4",
    authDomain: "image-bucket-143c1.firebaseapp.com",
    databaseURL: "https://image-bucket-143c1.firebaseio.com",
    projectId: "image-bucket-143c1",
    storageBucket: "image-bucket-143c1.appspot.com",
    messagingSenderId: "396601837101",
    appId: "1:396601837101:web:cfb369d92c08c6c9809aa4",
    measurementId: "G-CK3LLXRTX5"
  }

firebase.initializeApp(firebaseConfig)

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