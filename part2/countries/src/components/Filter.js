import InputField from "./InputField";

const Filter = ({ label, value, onChange }) => {
    const handleChange = ({ target: { value }}) => onChange(value)
    return <InputField label={label} value={value} onChange={handleChange} />
}

export default Filter;