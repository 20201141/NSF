import React, { useState, useEffect } from "react";
import "./UserSettings.css";

interface darkProp { 
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

// Personalize Component
const Personalize: React.FC<darkProp> = ({isDark,setIsDark}) => {
  // const [isDark, setIsDark] = useState<boolean>(false);

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

  // display isDark
  return (
    <div className="personalize-content">
      <h1>Personalize</h1>
      <div className="toggle">
        <p className="toggle-label">Dark Mode</p>
        <button className={`toggle-btn ${isDark ? "on" : "off"}`} onClick={toggleDarkMode}>{isDark ? "Off" : "On"}</button>
      </div>
    </div>
  );
};

export default Personalize;