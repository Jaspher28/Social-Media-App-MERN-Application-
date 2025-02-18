// frontend/src/context/PostContext.jsx
import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
};
