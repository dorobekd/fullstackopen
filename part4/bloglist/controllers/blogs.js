const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
    
})
  
blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const requestId = request.params.id.substring(1)
        await Blog.findByIdAndRemove(requestId)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
    
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const requestId = request.params.id.substring(1)
        const { likes } = request.body || {}

        const blog = { likes }
        const updatedBlog = await Blog.findByIdAndUpdate(requestId, blog, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
