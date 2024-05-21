import React from "react";
import { Button } from 'reactstrap';
import clearsky from './pictures/clearsky.jpeg';

const WeatherInfo = ({ weatherData, location, handleSubmit, error, setLocation, metric, setMetric }) => {
  const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  }

  const toFahrenheit = (celsius) => {
    return celsius * (9 / 5) + 32;
  }

  return (
    <div style={{}}>
      <form onSubmit={handleSubmit} style={{marginTop: '20px',marginLeft:'40px',}}>
        <h4>Search for your location</h4>
        <label>Enter location: </label>
        <input
          type="text"
          style={{width:'70%',}}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
        <Button type="submit">Get Weather</Button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
        <div className="weather-info" style={{marginTop:'20px',align:'center',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundImage: `url(${clearsky})`,backgroundSize:'cover',backgroundPosition: 'center',}}>
          <h3>Weather Information for {weatherData.name}</h3>
          
          <p>Description: {weatherData.weather[0].description} </p>
          {metric === 'kelvin' ? (
            <p>Temperature: {toCelsius(weatherData.main.temp)} °C</p>
          ) : (
            <p>Temperature: {toFahrenheit(weatherData.main.temp)} °F</p>
          )}
          <p>Wind speed: {weatherData.wind.speed}</p>
          <img src={weatherData.weather[0].icon} alt="Weather Icon" />
          <hr/>
        </div>
        
      )}
    </div>
  );
}

export default WeatherInfo;
