const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    username: {
        type: String
    },
    twitte: {
        type: String
    },
    hashtag: {
        type: String
    },
    timestamp: {
        type: String
    }

});

// Export User Schema
const User = module.exports = mongoose.model('Post', postSchema);