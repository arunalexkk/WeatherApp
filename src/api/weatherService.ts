import axiosClient from './axiosClient';
import { WeatherData } from '../types/Weather';
import { ICON_URL } from '../utils/constants';
import { handleApiError } from '../utils/handleApiError';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axiosClient.get('/', {
      params: { q: city },
    });

    const data = response.data;

    return {
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: `${ICON_URL}${data.weather[0].icon}.png`,
    };
  } catch (error: any) {
    throw new Error(handleApiError(error));
  }
};
