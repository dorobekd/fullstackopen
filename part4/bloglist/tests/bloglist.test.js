const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const bloglist = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17v7',
      title: 'Less Harmful',
      author: 'Edgar W. Artskjid',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Less_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('returns sum of likes in blogs', () => {
    const result = listHelper.totalLikes(bloglist)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  const bloglist = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17v7',
      title: 'Less Harmful',
      author: 'Edgar W. Artskjid',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Less_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(bloglist)
    expect(result).toBe(bloglist[1])
  })
})