import WeatherReport from "./WeatherReport";

const CountryDetails = ({ country }) => {
    const { name, capital, area, languages, flags, latlng } = country || {};

    return (
    <>
        <h1>{name?.common}</h1>
        <p>Capital: {capital?.[0]}</p>
        <p>Area: {area}</p>
        <h2>Languages:</h2>
        <ul>
            {Object.values(languages)?.map((lang) => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={flags.png} alt={`${name} flag`}/>
        <WeatherReport name={name.common} latitude={latlng[0]} longitude={latlng[1]} />
    </>
    )
}

export default CountryDetails;