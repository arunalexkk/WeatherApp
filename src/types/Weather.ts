// This file defines the types used in the Weather component
export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: any | null;
}
