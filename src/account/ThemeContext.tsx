import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  fetchThemePreference: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const fetchThemePreference = async () => {
    try {
      const response = await fetch('/api/user-theme');
      const data = await response.json();
      setIsDark(data.isDark);
    } catch (error) {
      console.error("Error fetching theme preference:", error);
    }
  };

  useEffect(() => {
    fetchThemePreference();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, fetchThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
