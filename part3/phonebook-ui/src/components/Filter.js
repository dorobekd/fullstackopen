import InputField from './InputField'

function Filter({ onChange }) {
  const handleChange = ({ target: { value } }) => onChange(value)
  return <InputField label="filter shown with" onChange={handleChange} />
}

export default Filter
