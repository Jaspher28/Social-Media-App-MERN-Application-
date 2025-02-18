// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      {/* Wrap pages that require Navbar and Footer in Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Route>
      {/* Standalone pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
