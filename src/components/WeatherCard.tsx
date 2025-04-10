// This component displays the weather information for a specific city.
// It receives the weather data as props and renders the city name, temperature, condition, and an icon.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { WeatherData } from "../types/Weather";

interface WeatherCardProps {
  weather: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.city}</Text>
      <Text style={styles.temp}>{weather.temp}°C</Text>
      <Text style={styles.condition}>{weather.condition}</Text>
      <Image source={{ uri: weather.icon }} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, alignItems: "center", backgroundColor: "#fff", borderRadius: 10 },
  city: { fontSize: 22, fontWeight: "bold" },
  temp: { fontSize: 26 },
  condition: { fontSize: 18 },
  icon: { width: 50, height: 50 },
});

export default WeatherCard;
