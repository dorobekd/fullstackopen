import Person from "./Person";

const Persons = ({ persons, filter, onDelete, onError }) => 
  filter 
    ? persons
        .filter(({ name }) => name.toLowerCase().match(filter.toLowerCase()))
        .map(({ id, name, number }) => <Person key={id+name} id={id} name={name} number={number} onDelete={onDelete} onError={onError} />)
    : persons.map(({ id, name, number }) => <Person key={id+name} id={id} name={name} number={number} onDelete={onDelete} onError={onError} />)

export default Persons;