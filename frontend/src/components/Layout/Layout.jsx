// frontend/src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" marginX="auto">
      <Navbar />
      <Box container maxWidth="lg" marginX="auto">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
