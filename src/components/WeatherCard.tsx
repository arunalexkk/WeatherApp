// This component displays the weather information for a specific city.
// It receives the weather data as props and renders the city name, temperature, condition, and an icon.
import React from "react";
import { View, Text, Image } from "react-native";
import { WeatherData } from "../types/Weather";
import { styles } from "./style";

interface WeatherCardProps {
  weather: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <View style={styles.card}>
      <Text testID="city" style={styles.city}>
        {weather.city}
      </Text>
      <Text testID="temp" style={styles.temp}>
        {weather.temp}°C
      </Text>
      <Text testID="condition" style={styles.condition}>
        {weather.condition}
      </Text>
      <Image
        testID="image"
        source={{ uri: weather.icon }}
        style={styles.icon}
      />
    </View>
  );
};

export default WeatherCard;
