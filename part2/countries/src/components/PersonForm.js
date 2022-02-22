import { useState } from "react"
import InputField from "./InputField"

const PersonForm = ({ persons, onSubmit }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = ({ target: { value }}) => setNewName(value)

  const handleNumberChange = ({ target: { value }}) => setNewNumber(value)

  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    if (persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already in the phonebook`);
    } else if (newName !== '' && newNumber !== '') {
      onSubmit([...persons, { name: newName, number: newNumber, id: persons.length+1 }]);
      setNewName('');
      setNewNumber('');
    }   
  }

  return (
    <form onSubmit={addPersonToPhonebook}>
      <InputField label={'name:'} value={newName} onChange={handleNameChange} />
      <InputField label={'number:'} value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;