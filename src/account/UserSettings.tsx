import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import './UserSettings.css'; 


interface darkProp { 
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}


const UserSettings: React.FC<darkProp> = ({isDark,setIsDark}) =>{

  useEffect(() => {
    const fetchThemePreference = async () => {
      try {
        const response = await fetch('/api/user-theme');
        const data = await response.json();
        setIsDark(data.isDark);
      } catch (error) {
        console.error("Error fetching theme preference:", error);
      }
    };
    fetchThemePreference();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDark;

    try {
      await fetch('/api/user-theme-change', {
        method: "POST",
        headers: {"Content-Type": "application/json", },
        body: JSON.stringify({ isDark: newMode }),
      });

      setIsDark(newMode);

      document.body.classList.toggle('dark-mode', newMode);
    } catch (error) {
      console.error("Error updating theme preference:", error);
    }
  };



  return (
    <div className="user-nav">
      <nav>
        <ul>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account" end={true} >User Settings</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "active nav-link" : "user-nav-item"} to="/account/my-posts" >My Posts</NavLink></li>
          <li><button className={`toggle-btn ${isDark ? "on" : "off"}`} onClick={toggleDarkMode}>{isDark ? "On" : "Off"}</button></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserSettings;