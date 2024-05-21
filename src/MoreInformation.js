import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

const MoreInformation = ({ weatherData, handleClose }) => {
  // Extract weather details from weatherData prop
  const { humidity, wind, description } = weatherData.weather[0];

  return (
    <div>
      <DialogTitle>More Information</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Humidity: {humidity}%</Typography>
        <Typography variant="body1">Wind Speed: {wind.speed} m/s</Typography>
        <Typography variant="body1">Description: {description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </div>
  );
};

export default MoreInformation;
