import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState();

  useEffect(() => {
    phonebookService.getAll().then((phonebook) => {
      setPersons(phonebook)
    })
  }, [])

  useEffect(() => {
    message && setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 3000);
  }, [message, error])

  const handleDeletePerson = (id) => {
    const remainingPersons = persons.filter((person) => person.id !== id)
    setPersons(remainingPersons)
    setMessage(`${persons.find(person => person.id === id).name} removed`)
  }

  const handleAddPerson = (addedPerson) => {
    const existingPerson = persons.find(({ id }) => id === addedPerson.id);
    if(existingPerson) setPersons(persons.map(person => person.id === existingPerson.id ? addedPerson : person))
    else setPersons([...persons, addedPerson])
    setMessage(`Added ${addedPerson.name}`)
  }

  const handleError = (message) => {
    setError(message)
    setMessage(message)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter onChange={setFilter}/>
      <h3>Add a new person</h3>
      <PersonForm persons={persons} onSubmit={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDelete={handleDeletePerson} onError={handleError} />
    </div>
  )
}

export default App