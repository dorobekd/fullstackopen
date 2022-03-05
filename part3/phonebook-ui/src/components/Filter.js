import React from 'react'
import InputField from './InputField'

const Filter = ({ onChange }) => {
  const handleChange = ({ target: { value } }) => onChange(value)
  return <InputField label="filter shown with" onChange={handleChange} />
}

export default Filter
