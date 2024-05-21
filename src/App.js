import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Link, Dialog, Divider } from '@mui/material';
import Header from './Header';
import WeatherInfo from './WeatherInfo';
import MajorCityWeather from './MajorCityWeather';
import MoreInformation from './MoreInformation';
import './App.css';
import clearsky from './pictures/clearsky.jpeg';
import moderaterain from './pictures/moderaterain.jpeg';

function App() {
  const apiKey = '2a2ba64f56cc47b7725e9239917543cf';
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [metric, setMetric] = useState('celsius'); // Default metric is Celsius
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Function to handle opening More Information
  const handleOpenMoreInfo = () => {
    setShowMoreInfo(true);
  };

  // Function to handle closing More Information
  const handleCloseMoreInfo = () => {
    setShowMoreInfo(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${metric}&appid=${apiKey}`
      );

      // Set weather data
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again later.');
    }
  };

  const switchMetric = () => {
    setMetric(metric === 'celsius' ? 'kelvin' : 'celsius');
  };

  const descriptionPicture = (description) => {
    const pictures = {
      clearsky,
      moderaterain
    };

    if (description.includes("clear")) {
      return pictures.clearsky;
    } else if (description.includes("rain")) {
      return pictures.moderaterain;
    } else {
      return null; // Default image or handle other weather types
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        // Get user's current location coordinates
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch weather data using current location coordinates
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${metric}&appid=${apiKey}`
          );

          // Set weather data
          setWeatherData(response.data);
          setError(null);
        });
      } catch (err) {
        console.error('Failed to fetch initial weather data:', err);
      }
    };

    fetchInitialWeather();
  }, [apiKey, metric]);

  return (
    <div className="app-container">
      <Header />
      <Divider />
      <WeatherInfo 
        handleSubmit={handleSubmit} 
        location={location} 
        setLocation={setLocation} 
        descriptionPicture={descriptionPicture} 
        weatherData={weatherData} 
        error={error}
        metric={metric}
        setMetric={setMetric}
      />
      {error && <p>Failed to process your request, ensure correct location spelling and network availability.</p>}
      <div>
        {/* Button to open More Information */}
        <Button onClick={handleOpenMoreInfo}>More Information</Button>

        {/* More Information dialog */}
        <Dialog open={showMoreInfo} onClose={handleCloseMoreInfo}>
          <MoreInformation weatherData={weatherData} handleClose={handleCloseMoreInfo} />
        </Dialog>
      </div>
      <div>
        <Typography variant="h6">Temperature Unit:</Typography>
        <Button color="primary" onClick={switchMetric}>
          Click button to convert to {metric === 'celsius' ? 'Kelvin' : 'Celsius'}
        </Button>
      </div>
      <MajorCityWeather metric={metric} />
      <Box bgcolor="primary.main" color="white" p={2}>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <Link href="#" color="inherit" mx={1}>
            About Us
          </Link>
          <Link href="#" color="inherit" mx={1}>
            Contact Us
          </Link>
          <Link href="#" color="inherit" mx={1}>
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default App;
