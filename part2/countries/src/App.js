import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error(error)
        setCountries([])
      })
  }, [])

  return (
    <div>
      <h2>Countries</h2>
      <Filter label={'find countries'} value={filter} onChange={setFilter}/>
      {filter !== '' && <Countries countries={countries} filter={filter} handleShowCountry={setFilter} />}
    </div>
  )
}

export default App