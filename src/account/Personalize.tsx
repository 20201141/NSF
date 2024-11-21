import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./UserSettings.css";

// Personalize Component
const Personalize: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // fetch user's preference from DB
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
      await fetch('/api/user-theme', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify({ isDark: newMode }),
      });

      setIsDark(newMode);

      document.body.classList.toggle('dark-mode', newMode);
    } catch (error) {
      console.error("Error updating theme preference:", error);
    }
  };

  // display isDark
  return (
    <div className="personalize-content">
      <h1>Personalize</h1>
      <div className="fake-button">
        <p>Dark Mode</p>
        <Button className={`toggle-btn ${isDark ? "on" : "off"}`} onClick={toggleDarkMode}>{isDark ? "On" : "Off"}</Button>
      </div>
    </div>
  );
};

export default Personalize;