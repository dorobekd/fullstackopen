const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'title required'] },
    author: String,
    url: { type: String, required: [true, 'url required'] },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Blog', blogSchema)