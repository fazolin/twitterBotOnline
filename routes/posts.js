const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.send('posts');
});

router.post('/', (req, res) => {
    console.log(req.body);
    const post = new Post({
        username: req.body.username,
        twitte: req.body.twitte,
        timestamp: req.body.timestamp
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        });

});

module.exports = router;