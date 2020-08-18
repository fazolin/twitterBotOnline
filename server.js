const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

const postRoute = require('./routes/posts');

app.use('/post', postRoute);


mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // uncoment on release
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    if (mongoose.connection.readyState) {
        console.log('Connected to DB!');
    }
});

app.listen(process.env.PORT); // start server
