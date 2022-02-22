import { useCallback, useState } from "react";
import CountryName from "./CountryName";
import CountryDetails from "./CountryDetails";


const Countries = ({ countries, filter, handleShowCountry }) => {

  const getFilteredCountries = useCallback(
    () => countries.filter(({ name }) => name.common.toLowerCase().match(filter.toLowerCase())), [countries, filter]
  )
  const filteredCountries = getFilteredCountries();

  return filteredCountries.length === 1 
    ? <CountryDetails country={filteredCountries[0]} />
    : filteredCountries.length < 10 
      ? filteredCountries.map(({ name }) => <CountryName key={name.common} name={name.common} handleShowCountry={handleShowCountry} />)
      : null;
}
  

export default Countries;