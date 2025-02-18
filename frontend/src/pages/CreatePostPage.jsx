// frontend/src/pages/CreatePostPage.jsx
import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const CreatePostPage = () => {
  const [postData, setPostData] = useState({ content: '', imageUrl: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);
  const { posts, setPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      setError('Please log in to create a post.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        postData,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setPosts([response.data, ...posts]);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Error creating post.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          Create a Post
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="What's on your mind?"
              multiline
              rows={3}
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL (optional)"
              value={postData.imageUrl}
              onChange={(e) => setPostData({ ...postData, imageUrl: e.target.value })}
              margin="normal"
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Post
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default CreatePostPage;
