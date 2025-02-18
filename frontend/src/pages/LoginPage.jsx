// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials
      );
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            margin="normal"
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
