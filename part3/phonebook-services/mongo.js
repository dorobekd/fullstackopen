/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const [, , password, name, number] = process.argv

const url =
  `mongodb+srv://admin:${password}@cluster0.uwqjf.mongodb.net/phonebookDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(({ name, number }) => {
      console.log(`${name} ${number}`)
    })
    mongoose.connection.close()
  })
}
else if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(({ name, number }) => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}
