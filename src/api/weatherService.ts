import axiosClient from "./axiosClient";
import { WeatherData } from "../types/Weather";
import { ICON_URL } from "../utils/constants";

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axiosClient.get("/", {
      params: { city: city },
    });

    const data = response.data;

    return {
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: `${ICON_URL}${data.weather[0].icon}.png`,
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "City not found");
    } else if (error.request) {
      throw new Error("Network error. Please try again.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
