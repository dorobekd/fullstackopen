const Blog = require("../models/blog")

const initialBlogs = [
    { 
        title: 'Batman is the best superhero',
        author: 'B. Wayne',
        likes: 15,
        url: 'http://blogpost.com/blogs_12_batman_best',
    },
    { 
        title: 'Why Spiderman is actually the best superhero',
        author: 'P. Parker',
        likes: 5,
        url: 'http://blogpost.com/blogs_12_spiderman_hero',
    }
]

module.exports = {
    initialBlogs
}