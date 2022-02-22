import { useState, useEffect } from "react";
import axios from 'axios'

const WeatherReport = ({ name, latitude, longitude }) => {
    const [report, setReport] = useState({});

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {
            setReport(response.data)
          })
          .catch(error => {
            console.error(error)
            setReport({})
          })
      }, [latitude, longitude])

    return <>
        <h2>Weather in {name}</h2>
        {report.weather && <img src={`http://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`} alt={report.weather[0].description} />}
        <p>Temperature: {report.main?.temp} celcius</p>
        <p>Wind: {report.wind?.speed} m/s</p>
    </>
}

export default WeatherReport;