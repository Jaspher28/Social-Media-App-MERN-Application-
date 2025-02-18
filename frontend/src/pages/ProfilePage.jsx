// frontend/src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({ user: {}, posts: [] });
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${username}`);
      setProfile(response.data);
    } catch (err) {
      setError('Error fetching profile.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [username]);

  return (
    <Box p={2} width={800}>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h4" gutterBottom>
        {profile.user.username}'s Profile
      </Typography>
      {profile.user.profilePic && (
        <Box my={2}>
          <img
            src={profile.user.profilePic}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
        </Box>
      )}
      <Button variant="contained" color="primary" size="small">
        Follow
      </Button>
      <Typography variant="h6" gutterBottom marginTop={3} color='textSecondary'>
        Posts
      </Typography>
      {profile.posts.length > 0 ? (
        <Grid container spacing={2} mt={1}>
          {profile.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                {post.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={post.imageUrl}
                    alt="Post"
                    height="200"
                  />
                ) : (
                  <Box p={2}>
                    <Typography variant="body2">{post.content}</Typography>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" disabled>
            No post yet
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
