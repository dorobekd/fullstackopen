import { useState } from "react"
import phonebookService from "../services/phonebook"
import InputField from "./InputField"

const PersonForm = ({ persons, onSubmit, onError }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = ({ target: { value }}) => setNewName(value)

  const handleNumberChange = ({ target: { value }}) => setNewNumber(value)

  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase())
    if (existingPerson && window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = {...existingPerson, number: newNumber };
        phonebookService.update(personToUpdate.id, personToUpdate)
          .then((updatedPerson) => {
            onSubmit(updatedPerson)
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.log(error.response.data)
            onError(error.response.data.error)
          })
    } else {
      const personToAdd = { name: newName, number: newNumber }
      phonebookService.create(personToAdd)
        .then((addedPerson) => {
          onSubmit(addedPerson);
          setNewName('');
          setNewNumber('');
        }).catch(error => {
          console.log(error.response.data)
          onError(error.response.data.error)
        })
    }   
  }

  return (
    <form onSubmit={addPersonToPhonebook}>
      <InputField label={'name:'} value={newName} onChange={handleNameChange} />
      <InputField label={'number:'} value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit" disabled={newName === '' || newNumber === ''}>Add</button>
      </div>
    </form>
  )
}

export default PersonForm;