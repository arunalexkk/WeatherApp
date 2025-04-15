import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherState } from "../../types/Weather";
import { WeatherData } from "../../types/Weather";
import { fetchWeather } from "../weatherActions";

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { clearWeather } = weatherSlice.actions;

// Export reducer
export default weatherSlice.reducer;
