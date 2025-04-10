import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWeatherFromAPI } from "../services/weatherService";
import { WeatherData } from "../types/Weather";

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherFromAPI(city);
      await AsyncStorage.setItem("lastCity", city); // Save last searched city
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "City not found");
    }
  }
);
