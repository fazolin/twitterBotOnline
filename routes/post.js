const express = require('express'); // import express
const router = express.Router(); // create router to export
const Post = require('../models/Post')




router.get('/twittes', async (req, res) => {

    let posts = await Post.find();

    if (posts) {
        res.json(posts)
    } else {
        res.status(400).send('Este e-mail não existe.');
    }

});



module.exports = router; // expourt router