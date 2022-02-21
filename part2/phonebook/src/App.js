import { useState } from 'react'

const InputField = ({ label, value, onChange }) => (
  <div>
    {label} <input value={value} onChange={onChange} />
  </div>
) 

const Filter = ({ onChange }) => {
  const handleChange = ({ target: { value }}) => onChange(value)
  return <InputField label={'filter shown with'} onChange={handleChange} />
}

const Person = ({ name, number }) => <p>{name} {number}</p>

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
      onSubmit([...persons, { name: newName, number: newNumber }]);
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

const Persons = ({ persons, filter }) => 
  filter 
    ? persons
        .filter(({ name }) => name.toLowerCase().match(filter.toLowerCase()))
        .map(({ id, name, number }) => <Person key={id} name={name} number={number} />)
    : persons.map(({ id, name, number }) => <Person key={id} name={name} number={number} />)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={setFilter}/>
      <h3>Add a new person</h3>
      <PersonForm persons={persons} onSubmit={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App