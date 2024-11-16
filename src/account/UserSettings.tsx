import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import type { UserAccount } from '../classes/UserAccount'; 
import type { Post } from '../classes/Post';
// import './UserSettings.css';

// User Settings Component
const Settings = () => {
  // get user's info from DB
  
  
  // display info
  return (
    <div>
      <h1>User Settings</h1>
      <p className="label">Username: {}</p>
      <p className="label">Password: {}</p>
      <p className="label">Email: {}</p>
    </div>
  );
};

// My Posts Component
const MyPosts = () => {
  // get user's posts from DB


  // display posts
  return (
    <div>

    </div>
  );
};

// Personalize Component
const Personalize = () => {
  // get user's choice for theme mode from DB


  // display isDark
  return (
    <div>

    </div>
  );
};

const UserSettings: React.FC = () => {
  return (
    <Router>
      <div className="userNav">
        <nav>
          <ul>
            <li><Link to="/" className="user-nav-item">User Settings</Link></li>
            <li><Link to="/my-post" className="user-nav-item">My Posts</Link></li>
            <li><Link to="/personalize" className="user-nav-item">Personalize</Link></li>
          </ul>
        </nav>
      </div>

      <div className="user-content">
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/my-post" element={<MyPosts />} />
          <Route path="/personalize" element={<MyPosts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default UserSettings;