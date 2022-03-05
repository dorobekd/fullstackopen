import { useState } from "react"
import phonebookService from "../../../phonebook/src/services/phonebook"
import InputField from "./InputField"

const PersonForm = ({ persons, onSubmit }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = ({ target: { value }}) => setNewName(value)

  const handleNumberChange = ({ target: { value }}) => setNewNumber(value)

  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase())
    if (existingPerson && window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
      const updatedPerson = {...existingPerson, number: newNumber };
        phonebookService.update(updatedPerson.id, updatedPerson).then((updatedPerson) => {
          onSubmit(updatedPerson)
          setNewName('');
          setNewNumber('');
        })
    } else if (newName !== '' && newNumber !== '') {
      const addedPerson = { name: newName, number: newNumber, id: persons.length+1 }
      phonebookService.create(addedPerson).then(() => {
        onSubmit(addedPerson);
        setNewName('');
        setNewNumber('');
      })
    }   
  }

  return (
    <form onSubmit={addPersonToPhonebook}>
      <InputField label={'name:'} value={newName} onChange={handleNameChange} />
      <InputField label={'number:'} value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm;