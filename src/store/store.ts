// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../redux/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
