// Description: This is the main screen of the weather app where users can enter a city name and fetch the weather data.
// It uses Redux for state management and displays the weather information in a card format.
// This file contains the main screen of the weather app where users can enter a city name and fetch the weather data.
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherActions";
import { RootState, AppDispatch } from "../store/store";
import WeatherCard from "../components/WeatherCard";
import { ThemeContext } from "../context/ThemeContext";
import { darkTheme } from "../styles/theme";

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = () => {
    if (city.trim() === "") {
      Alert.alert("Please enter a city name");
      return;
    }
    dispatch(fetchWeather(city));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>Enter city name to get weather</Text>
      <TextInput
        testID="city-input"
        style={[
          styles.input,
          { backgroundColor: theme.card, color: theme.text },
        ]}
        placeholder="Enter city"
        placeholderTextColor={theme.text}
        onChangeText={setCity}
      />
      <Button
        testID="btnWeather"
        title="Get Weather"
        onPress={handleSearch}
        color={theme.button}
      />
      <View style={styles.switchContainer}>
        <Text testID="mode" style={[styles.label, { color: theme.text }]}>
          Dark Mode
        </Text>
        <Switch
          testID="Switch"
          onValueChange={toggleTheme}
          value={theme === darkTheme}
        />
      </View>

      {loading && <ActivityIndicator size="large" />}

      {error ? (
        <Text testID="error_text" style={[styles.error, { color: "red" }]}>
          {error}
        </Text>
      ) : (
        data && <WeatherCard weather={data} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  error: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  label: { marginRight: 10, fontSize: 16 },
});

export default HomeScreen;
