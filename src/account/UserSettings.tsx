import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
//import type { UserAccount } from '../classes/UserAccount'; 
//import type { Post } from '../classes/Post';
import './UserSettings.css';
import Settings from "./Settings";
import MyPosts from "./MyPosts";
import Personalize from "./Personalize";


const UserSettings = () => {
  return (
    <div className="user-set">
      <div className="user-nav">
        <nav>
          <ul>
            <li><Link to="account" className="user-nav-item">User Settings</Link></li>
            <li><Link to="my-post" className="user-nav-item">My Posts</Link></li>
            <li><Link to="personalize" className="user-nav-item">Personalize</Link></li>
          </ul>
        </nav>
        <Outlet />
      </div>

      <div className="user-content">
        <Routes>
          <Route path="account" element={<Settings />} />
          <Route path="my-post" element={<MyPosts />} />
          <Route path="personalize" element={<Personalize />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserSettings;