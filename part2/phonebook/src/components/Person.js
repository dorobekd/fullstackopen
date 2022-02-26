import phonebookService from "../services/phonebook";

const Person = ({ id, name, number, onDelete, onError }) => {
    const handleDelete = () => {
        if(window.confirm(`Delete ${name}?`)) {
            phonebookService.remove(id).then(() => {
                onDelete(id);
            }).catch((error) => {
                console.log(error);
                onError(`Information for ${name} has already been removed from server`)
            })
        }
    }
    return <p>{name} {number}<button onClick={handleDelete}>Delete</button></p>
}
export default Person;