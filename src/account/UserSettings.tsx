import React from 'react';
import { Link, Outlet } from 'react-router-dom';
//import type { UserAccount } from '../classes/UserAccount'; 
//import type { Post } from '../classes/Post';
import './UserSettings.css';

const UserSettings = () => {
  return (
    <div className="user-nav">
      <nav>
        <ul>
          <li><Link to="/account" className="user-nav-item">User Settings</Link></li>
          <li><Link to="/account/my-post" className="user-nav-item">My Posts</Link></li>
          <li><Link to="/account/personalize" className="user-nav-item">Personalize</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserSettings;