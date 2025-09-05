// src/components/navigation/NavigationProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};

export default function NavigationProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    // No additional delay needed - let the exit animation handle timing
  };

  const navigateWithStairs = (path) => {
    // Start closing the menu (this triggers exit animations)
    setIsMenuOpen(false);

    // Navigate after menu stairs animation completes
    setTimeout(() => {
      navigate(path);
    }, 600); // Wait for menu stairs to finish (0.5s + small buffer)
  };

  return (
    <NavigationContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        closeMenu,
        navigateWithStairs,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
