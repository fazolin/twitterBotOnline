const mongoose = require('mongoose');
require('dotenv').config();
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const Post = require('./models/Post')

const hashtag = '#protagonistasdemascaras';

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
}, 60 * 1000);


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

