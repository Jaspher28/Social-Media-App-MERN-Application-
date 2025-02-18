// frontend/src/components/Footer/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box bgcolor="background.paper" py={2} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        © 2025 Social Gram. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
