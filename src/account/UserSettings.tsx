import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import './UserSettings.css'; 
import { response } from "express";


interface darkProp { 
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}


const UserSettings: React.FC<darkProp> = ({isDark,setIsDark}) =>{

  



  return (
    <div className="user-nav">
      <nav>
        <ul>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account" end={true} >User Settings</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account/my-posts" >My Posts</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account/Personalize" >Personalize</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserSettings;