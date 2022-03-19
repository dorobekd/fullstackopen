const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
    
})
  
blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
        
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({ ...request.body, user: user._id })
        
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })

        //TODO: only remove if user created blog
        const requestId = request.params.id
        await Blog.findByIdAndRemove(requestId)
        response.status(204).end()        
    } catch (exception) {
        next(exception)
    }
    
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const requestId = request.params.id
        const { likes } = request.body || {}

        const blog = { likes }
        const updatedBlog = await Blog.findByIdAndUpdate(requestId, blog, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
