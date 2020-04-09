const express = require('express')
const expressJWT = require('express-jwt');
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

const auth = require('./routes/userAuth');
const users = require('./routes/users');
const post = require('./routes/postNew');
const viewposts = require('./routes/posts');
const update = require('./routes/update');
const votes = require('./routes/likeDislike');

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

app.use('/api', expressJWT({ secret: process.env.SECRET }));
app.use('/api/post', post);
app.use('/api/update', update);
app.use('/api/', votes);
app.use('/auth', auth);
app.use('/api/users', users);
app.use('/viewposts', viewposts);

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
