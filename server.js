const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/group-api';

app.use(express.json());
app.use(morgan('dev'));

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
        console.log('MongoDB connection established successfully');
    }
);

app.use('/view', require('./routes/posts.js'))
app.use('/post', require('./routes/postNew.js'))
app.use('/users', require('./routes/users.js'))

app.use((err, req, res, next) => {
    console.log(err);
    return res.send( { errMsg: err.message } );
});

const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
    console.log(`Server is running on local port ${PORT}`);
});