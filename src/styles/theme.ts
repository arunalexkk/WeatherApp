// This file defines the light and dark themes for the application.
import { Appearance } from "react-native";

export const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  card: "#f0f0f0",
  button: "#007AFF",
};

export const darkTheme = {
  background: "#121212",
  text: "#ffffff",
  card: "#1E1E1E",
  button: "#BB86FC",
};

export const getTheme = () => {
  return Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
};
