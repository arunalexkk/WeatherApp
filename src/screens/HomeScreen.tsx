// Description: This is the main screen of the weather app where users can enter a city name and fetch the weather data.
// It uses Redux for state management and displays the weather information in a card format.
// This file contains the main screen of the weather app where users can enter a city name and fetch the weather data.
import React, { useState, useContext, useCallback } from "react";
import {
  View,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Text,
  Alert,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherActions";
import { RootState, AppDispatch } from "../redux/store";
import WeatherCard from "../components/WeatherCard";
import { ThemeContext } from "../context/ThemeContext";
import { darkTheme } from "../styles/theme";
import { debounce } from "../utils/ debounce";
import { isValidCityName } from "../utils/helpers";
import { useNetInfo } from "../hooks/useNetInfo";
import ActionBar from "../components/ActionBar";
import { styles } from "./style";

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isConnected = useNetInfo();
  //console.log("Is connected to internet:", isConnected);
  const handleSearch = useCallback(
    debounce(() => {
      if (!isConnected) return; // silently fail, ActionBar shows the error
      if (!isValidCityName(city)) {
        Alert.alert("Please enter a valid city name");
        return;
      }
      dispatch(fetchWeather(city));
    }, 800),
    [city, isConnected]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ActionBar message="No Internet Connection" visible={!isConnected} />
      <View style={[styles.subContainer]}>
        <Text style={{ color: theme.text }}>
          Enter a city to get current weather:
        </Text>
        <TextInput
          testID="city-input"
          style={[
            styles.input,
            { backgroundColor: theme.card, color: theme.text },
          ]}
          placeholder="Enter city"
          placeholderTextColor={theme.text}
          onChangeText={(text) => setCity(text)}
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
          <Text testID="error_text" style={[styles.error]}>
            {error}
          </Text>
        ) : (
          data && <WeatherCard weather={data} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
