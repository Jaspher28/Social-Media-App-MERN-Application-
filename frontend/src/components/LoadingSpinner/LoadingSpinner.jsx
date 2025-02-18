// frontend/src/components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" color={'primary.main'}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default LoadingSpinner;
