// frontend/src/components/SuggestedAccounts/SuggestedAccounts.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuggestedAccounts = () => {
  const [suggested, setSuggested] = useState([]);
  const navigate = useNavigate();

  const fetchSuggested = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/suggested`);
      setSuggested(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuggested();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Suggested Accounts
      </Typography>
      <List>
        {suggested.map((user) => (
          <ListItem key={user.id} button onClick={() => navigate(`/profile/${user.username}`)}>
            <ListItemAvatar>
              <Avatar src={user.profilePic || ''}>
                {user.username.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SuggestedAccounts;
