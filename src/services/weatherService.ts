// Description: This file contains the weather service that fetches weather data from an API.
import axios from "axios";
import { WeatherData } from "../types/Weather";

const API_KEY = "2ac4270c99925f418740bf3ff4ea61dc";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherFromAPI = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  return {
    city: response.data.name,
    temp: response.data.main.temp,
    condition: response.data.weather[0].main,
    icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
  };
};
