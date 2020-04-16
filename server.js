const express = require('express')
const expressJWT = require('express-jwt');
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')

const auth = require('./routes/userAuth');
const viewposts = require('./routes/posts');
const profile = require('./routes/profile')
const post = require('./routes/postNew');
const update = require('./routes/update');
const comments = require('./routes/comments')
const votes = require('./routes/votes');
const users = require('./routes/users');

const dbURL = 'mongodb://localhost:27017/ig-app'

require('dotenv').config();

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

app.use('/auth', auth);
app.use('/viewposts', viewposts);
app.use('/api', expressJWT({ secret: process.env.SECRET }));
app.use('/api/profile', profile)
app.use('/api/comments', comments);
app.use('/api/post', post);
app.use('/api/update', update);
app.use('/api/vote', votes);
app.use('/api/users', users);

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
    }
    return res.send( { errMsg: err.message } )
});

const port = process.env.PORT || 9000;
    app.listen(port, () => {
    console.log(`Server is running on local port ${port}`)
})
