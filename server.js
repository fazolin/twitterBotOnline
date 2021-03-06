const express = require('express')
const app = express();

const mongoose = require('mongoose');

require('dotenv').config();

const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

const Post = require('./models/Post');

const bodyParser = require('body-parser');

var cors = require('cors');

app.use(cors());

const hashtag = '#sp467';

const postRoute = require('./routes/post'); // import routs to admin

//////////Parsing//////////

app.use(bodyParser.json()); // make parsing json in all routes
app.use('/', postRoute);


//////////Connect to db

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

getTweets(); // first search
console.log('Getting new tweets');

////////// seacrh on interval

setInterval(function () {
    console.log('Getting new tweets');
    getTweets()
}, process.env.TIMEOUT);


function getTweets() {

    T.get('search/tweets', {
        q: hashtag,
        count: 100
    }, function (err, data, response) {

        for (let i = 0; i < data.statuses.length; i++) {

            Post.find({ id: data.statuses[i].id }, function (err, docs) {
                if (docs.length) {
                    console.log('Name exists already');
                } else {
                    console.log('New tweet');
                    const post = new Post({
                        username: data.statuses[i].user.name,
                        twitte: data.statuses[i].text,
                        id: data.statuses[i].id
                    });

                    post.save()
                        .then(data => {
                            console.log('Tweet Salvo');
                        })
                        .catch(err => {
                            console.log('Erro');
                        });
                }
            });

        }

    })
}

app.listen(process.env.PORT, () => {
    console.log('Listen on ' + process.env.PORT + ' port')
}); // start server