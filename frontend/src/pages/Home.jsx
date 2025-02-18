// frontend/src/pages/Home.jsx
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { PostContext } from '../context/PostContext';
import Post from '../components/Feed/Post';
import { Box, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../context/AuthContext';
import SuggestedAccounts from '../components/SuggestedAccounts/SuggestedAccounts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      setPosts(response.data);
    } catch (err) {
      setError('Error fetching posts.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleCreatePostClick = () => {
    if (!auth.token) {
      navigate('/login', { state: { message: 'Please log in to create a post.' } });
    } else {
      navigate('/create-post');
    }
  };

  return (
    <Grid container spacing={2} padding={2} maxWidth="md">
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Home
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box>
          {posts.map((post) => (
            <Post key={post.id} post={post} refreshPosts={fetchPosts} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <SuggestedAccounts />
      </Grid>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleCreatePostClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default Home;
