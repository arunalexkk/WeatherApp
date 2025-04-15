import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWeatherByCity } from "../../../api/weatherService";
import { WeatherData } from "../../../types/Weather";

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await getWeatherByCity(city);
      await AsyncStorage.setItem("lastCity", city);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "City not found");
    }
  }
);
