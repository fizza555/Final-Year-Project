import React, { createContext, useContext, useState } from 'react';

// Create a context for user authentication
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap around your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state

  const login = (userData) => {
    setUser(userData); // Store user data on login
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
