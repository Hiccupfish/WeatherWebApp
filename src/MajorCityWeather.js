import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';

const MajorCityWeather = ({ metric }) => {
  const apiKey = '2a2ba64f56cc47b7725e9239917543cf';
  const cities = ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban'];

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const promises = cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      );

      try {
        const responses = await Promise.all(promises);
        const data = responses.map(response => ({
          city: response.data.name,
          temperature: metric === 'celsius' ? (response.data.main.temp - 273.15).toFixed(2) : response.data.main.temp,
          weatherDescription: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        }));
        setWeatherData(data);
      } catch (err) {
        console.error('Failed to fetch weather data for cities:', err);
      }
    };

    fetchWeatherData();
  }, [apiKey, metric]);

  return (
    <div>
      <Typography variant="h4">Major City Forecast</Typography>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Typography variant="h6">City Name</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Temperature ({metric === 'celsius' ? '°C' : 'Kelvin'})</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Weather Description</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Icon</Typography>
        </Grid>
      </Grid>
      {weatherData.map((weather, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={3}>
            <Typography>{weather.city}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{weather.temperature}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{weather.weatherDescription}</Typography>
          </Grid>
          <Grid item xs={3}>
            <img
              src={`http://openweathermap.org/img/w/${weather.icon}.png`}
              alt={weather.weatherDescription}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default MajorCityWeather;
