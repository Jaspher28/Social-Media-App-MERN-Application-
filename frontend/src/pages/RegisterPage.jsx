// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', profilePic: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed.');
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            margin="normal"
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
          />
          <TextField
            fullWidth
            label="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            margin="normal"
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            margin="normal"
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
          />
          <TextField
            fullWidth
            label="Profile Picture URL (optional)"
            value={userData.profilePic}
            onChange={(e) => setUserData({ ...userData, profilePic: e.target.value })}
            margin="normal"
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}
            fullWidth
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
