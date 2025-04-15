// Description: This file contains the function to fetch weather data from the OpenWeatherMap API.

import axios from "axios";
import { WeatherData } from "../types/Weather";
import { API_KEY, BASE_URL, ICON_URL } from "../utils/constants";

export const fetchWeatherFromAPI = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return {
      city: response?.data?.name,
      temp: response?.data?.main?.temp,
      condition: response?.data?.weather[0]?.main,
      icon: ICON_URL + `${response?.data?.weather[0]?.icon}.png`,
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error?.response?.data?.message || "City not found");
    } else if (error.request) {
      throw new Error("Network error. Please try again.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
