// Description: This file contains the Redux slice for managing weather data.
// It includes actions for fetching weather data and handling loading and error states.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWeatherFromAPI } from "../services/weatherService";
import { WeatherData, WeatherState } from "../types/Weather";

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherFromAPI(city);
      await AsyncStorage.setItem("lastCity", city);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "City not found");
    }
  }
);

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
