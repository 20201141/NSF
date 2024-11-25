import React, { useState, useContext, createContext } from "react";

interface User {
  username: string;
  email: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  clearUser: () => void;
}

const UserInfo = createContext<UserContextType | undefined>(undefined);

// UserInfo Component; Global
export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    isLoggedIn: false,
  });

  const clearUser = () => setUser({username: '', email: '', isLoggedIn: false});

  return (
    <UserInfo.Provider value={{user, setUser, clearUser}}>{children}</UserInfo.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserInfo);
  if (!context) {
    throw new Error("useUser must be used in UserProvider");
  }
  return context;
}
