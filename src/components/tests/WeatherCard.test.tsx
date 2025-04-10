import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../WeatherCard';
import { WeatherData } from '../../types/Weather';

describe('WeatherCard Component', () => {
  const mockWeatherData: WeatherData = {
    city: 'New York',
    temp: 25,
    condition: 'Sunny',
    icon: 'https://example.com/icon.png',
  };

  it('renders correctly with weather data', () => {
    const { getByTestId } = render(<WeatherCard weather={mockWeatherData} />);

    expect(getByTestId('city').props.children).toBe('New York');
    expect(getByTestId('temp').props.children).toEqual([25, '°C']);
    expect(getByTestId('condition').props.children).toBe('Sunny');
    expect(getByTestId('image').props.source.uri).toBe('https://example.com/icon.png');
  });

  it('renders nothing when weather data is null', () => {
    const { queryByTestId } = render(<WeatherCard weather={null} />);

    expect(queryByTestId('city')).toBeNull();
    expect(queryByTestId('temp')).toBeNull();
    expect(queryByTestId('condition')).toBeNull();
    expect(queryByTestId('image')).toBeNull();
  });
  it('renders correctly with different weather conditions', () => {
    const weatherConditions = ['Rainy', 'Cloudy', 'Snowy'];
    weatherConditions.forEach(condition => {
      const { getByTestId } = render(<WeatherCard weather={{ ...mockWeatherData, condition }} />);
      expect(getByTestId('condition').props.children).toBe(condition);
    });
  });

  it('renders correctly with extreme temperature values', () => {
    const extremeTemps = [-30, 0, 50];
    extremeTemps.forEach(temp => {
      const { getByTestId } = render(<WeatherCard weather={{ ...mockWeatherData, temp }} />);
      expect(getByTestId('temp').props.children).toEqual([temp, '°C']);
    });
  });

  it('renders correctly with missing icon URL', () => {
    const { getByTestId } = render(<WeatherCard weather={{ ...mockWeatherData, icon: '' }} />);
    expect(getByTestId('image').props.source.uri).toBe('');
  });
});