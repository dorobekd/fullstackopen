const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people`
    const date = new Date();
    response.end(`${info}\n${date}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body || {}
    if (!name) 
        return response.status(400).json({ error: 'name missing' })
    if (!number)
        return response.status(400).json({ error: 'number missing' })
    if(persons.find((person) => name === person.name))
        return response.status(400).json({ error: 'name must be unique'})
    
    const person = { id: persons.length + 1, name, number }
    persons = [...persons, person]
    
    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const requestId = Number(request.params.id)
    const person = persons.find(({ id }) => id === requestId)
    if (person) response.json(person)
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const requestId = Number(request.params.id)
    persons = persons.filter(({ id }) => id !== requestId)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})