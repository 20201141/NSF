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
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account" end={true} >User Settings</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account/my-post" >My Posts</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account/personalize" >Personalize</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserSettings;