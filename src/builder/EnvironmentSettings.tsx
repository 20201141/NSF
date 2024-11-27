import React, { useState } from 'react';
import './EnvironmentSettings.css';

// Define the type for menu keys
type MenuKey = 'Language' | 'Compiler' | 'Operating System';

// Define the initial state type
type SettingsState = {
  [key in MenuKey]: string;
};

const EnvironmentSettings: React.FC = () => {
  // Initial state for settings
  const [settings, setSettings] = useState<SettingsState>({
    Language: '',
    Compiler: '',
    'Operating System': '',
  });

  // Menu options
  const menuOptions: Record<MenuKey, string[]> = {
    Language: ['', 'TypeScript', 'Python', 'C++'],
    Compiler: ['', 'tsc', 'spyder', 'clang++'],
    'Operating System': ['', 'Windows', 'Linux', 'MacOS'],
  };

  // Handle dropdown change
  const handleChange = (menu: MenuKey, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [menu]: value,
    }));
  };

  return (
    <div className="environment-settings">
      <h3 className="title">Environment Settings</h3>
      <div className="menu-container">
        {Object.entries(menuOptions).map(([menu, options]) => (
          <div key={menu} className="menu-row">
            <label htmlFor={menu} className="menu-label">
              {menu}
            </label>
            <select
              id={menu}
              className="menu-dropdown"
              value={settings[menu as MenuKey]} // Type assertion ensures TypeScript recognizes this key
              onChange={(e) => handleChange(menu as MenuKey, e.target.value)} // Type assertion here too
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSettings;
