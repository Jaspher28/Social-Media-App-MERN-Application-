// frontend/src/components/Feed/Post.jsx
import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const Post = ({ post, refreshPosts }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleLike = async () => {
    if (!auth.token) {
      navigate('/login', { state: { message: 'Please log in to like posts.' } });
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${post.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      refreshPosts();
    } catch (err) {
      setError('Error liking post.');
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      navigate('/login', { state: { message: 'Please log in to comment.' } });
      return;
    }
    if (!commentText) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${post.id}/comment`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setCommentText('');
      refreshPosts();
    } catch (err) {
      setError('Error adding comment.');
      console.error(err);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          color='primary'
          onClick={() => navigate(`/profile/${post.User.username}`)}
          sx={{ cursor: 'pointer' }}
        >
          {post.User.username}
        </Typography>
        <Typography variant="body1">{post.content}</Typography>
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt="Post image"
            sx={{ maxHeight: 300, objectFit: 'contain', mt: 1 }}
          />
        )}
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike} color="error">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2">{post.Likes.length}</Typography>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ mt: 1 }}>
            <form onSubmit={handleComment}>
                <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <IconButton 
                        onClick={handleComment} 
                        sx={{ padding: 0 }}
                        aria-label="send"
                    >
                        <SendIcon />
                    </IconButton>
                    ),
                }}
                />
            </form>
        </Box>
        {post.Comments.map((comment) => (
          <Box key={comment.id} sx={{ mt: 1 }}>
            <Typography variant="subtitle2">
              {comment.User?.username || 'Anonymous'}:            
            </Typography>
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default Post;
