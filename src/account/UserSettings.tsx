import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
//import type { UserAccount } from '../classes/UserAccount'; 
//import type { Post } from '../classes/Post';
import Button from "./Button";
import './UserSettings.css';

const UserSettings = () => {
  return (
    <div className="user-set">
      <div className="user-nav">
        <nav>
          <ul>
            <li><Link to="/" className="user-nav-item">User Settings</Link></li>
            <li><Link to="my-post" className="user-nav-item">My Posts</Link></li>
            <li><Link to="personalize" className="user-nav-item">Personalize</Link></li>
          </ul>
        </nav>
      </div>
      <Outlet />

      <div className="user-content">
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="my-post" element={<MyPosts />} />
          <Route path="personalize" element={<Personalize />} />
        </Routes>
      </div>
    </div>
  );
}

// User Settings Component
function Settings() {
  // get user's info from DB

  
  // change password
  const handleClick = () => {
    console.log("Button was clicked");
  };

  // display info
  return (
    <div>
      <h1>User Settings</h1>
      <p className="label">Username: {}</p>
      <p className="label">Password: {}</p>
      <p className="label">Email: {}</p> 
      <Button onClick={handleClick}>Change Password</Button>
    </div>
  );
}

// My Posts Component
function MyPosts() {
  // get user's posts from DB


  // display posts
  return (
    <div>
      Posts
    </div>
  );
}

// Personalize Component
function Personalize() {
  // get user's choice for theme mode from DB


  // display isDark
  return (
    <div>
      Personalize
    </div>
  );
}

export default UserSettings;