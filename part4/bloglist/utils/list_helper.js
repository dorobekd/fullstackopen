const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.sort((a, b) => a.likes - b.likes)[blogs.length-1];

//TODO
const mostBlogs = (blogs) => {}

//TODO
const mostLikes = (blogs) => {}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}