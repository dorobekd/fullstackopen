const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'title required'] },
    author: String,
    url: { type: String, required: [true, 'url required'] },
    likes: { type: Number, default: 0 }
})

module.exports = mongoose.model('Blog', blogSchema)