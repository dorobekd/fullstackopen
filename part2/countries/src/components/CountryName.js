const CountryName = ({ name, handleShowCountry }) => (
    <p>{name} <button onClick={() => handleShowCountry(name)}>show</button></p>
)

export default CountryName;