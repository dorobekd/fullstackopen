require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('post-body', ({ method, body }) => method === 'POST' && JSON.stringify(body))
const morganConfiguration = ':method :url :status :res[content-length] - :response-time ms :post-body'

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  next(error)
}

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(morganConfiguration))

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const info = `Phonebook has info for ${persons.length} people`
      const date = new Date()
      response.end(`${info}\n${date}`)
    })
    .catch((error) => next(error))

})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body || {}

  const person = new Person({ name, number })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const requestId = request.params.id
  const { name, number } = request.body || {}

  const person = { name, number }
  Person.findByIdAndUpdate(requestId, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const requestId = request.params.id
  Person.findById(requestId)
    .then(person => {
      if(person) response.json(person)
      else response.status(404).end()
    })
    .catch((error) => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  const requestId = request.params.id.substring(1)
  Person.findByIdAndRemove(requestId)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})


app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})