
// This file defines a context for managing theme state in a React Native application.
import React, { createContext, useState, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../styles/theme";

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
