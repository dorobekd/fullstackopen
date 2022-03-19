const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token
beforeEach(async () => {
    await api.post('/api/users').send({ username: 'damian', name: 'Damian', password: 'damian123' })
    let login = await api.post('/api/login').send({ username: 'damian', password: 'damian123'})
    token = login.body.token
    await Blog.deleteMany({})
    for (const blog of helper.initialBlogs) {
        await new Blog(blog).save()
    }
}, 10000)

test('all posted blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toMatchObject(helper.initialBlogs)
}, 10000)

test('all blogs have unique identifiers', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog._id).toBeDefined()
    })
}, 10000)

test('blogs are successfully posted', async () => {
    const additionalBlog = { 
        title: 'No, Superman is the best',
        author: 'C. Kent',
        likes: 50,
        url: 'http://blogpost.com/blogs_12_superman_is_best',
    }
    const savedBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(additionalBlog)

    const allBlogs = await api.get('/api/blogs')
    const addedPost = allBlogs.body.find(blog => savedBlog.body._id === blog._id)
    
    expect(allBlogs.body).toContainEqual(addedPost)
}, 10000)

test('blogs posted with missing likes property are assigned 0', async () => {
    const additionalBlog = { 
        title: 'What about Aquaman',
        author: 'A. Qua',
        url: 'http://blogpost.com/blogs_12_aquaman',
    }
    const savedBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(additionalBlog)

    const allBlogsResponse = await api.get('/api/blogs')
    const addedBlog = allBlogsResponse.body.find(blog => blog._id === savedBlog.body._id)
    expect(addedBlog.likes).toBe(0)
}, 10000)

test('blogs posted with missing title and url properties are thrown 400 error', async () => {
    const additionalBlog = { 
        author: 'Missing',
        likes: 1,
    }
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(additionalBlog).expect(400)
})

test('blogs are successfully deleted', async () => {
    const allBlogs = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${allBlogs.body[0]._id}`).set('Authorization', `Bearer ${token}`).expect(204)
}, 10000)

test('blogs are successfully updated', async () => {
    let allBlogs = await api.get('/api/blogs')
    await api.put(`/api/blogs/${allBlogs.body[0]._id}`).set('Authorization', `Bearer ${token}`).send({ likes: 100 })
    allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body[0].likes).toBe(100)
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})