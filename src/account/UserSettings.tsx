import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
//import type { UserAccount } from '../classes/UserAccount'; 
//import type { Post } from '../classes/Post';
import './UserSettings.css';

const UserSettings = () => {
  return (
    <div className="user-nav">
      <nav>
        <ul>
          <li><NavLink to="/account" className="user-nav-item">User Settings</NavLink></li>
          <li><NavLink to="/account/my-post" className="user-nav-item">My Posts</NavLink></li>
          <li><NavLink to="/account/personalize" className="user-nav-item">Personalize</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserSettings;