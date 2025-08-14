import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from '../HomeScreen';
import { ThemeContext } from '../../context/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';
import { fetchWeather } from '../../redux/slices/weather/weatherActions';
import { useNetInfo } from '../../hooks/useNetInfo';

jest.mock('../../hooks/useNetInfo');
jest.mock('../../redux/slices/weather/weatherActions');

const mockStore = configureStore([]);
const initialState = {
  weather: {
    data: null,
    loading: false,
    error: null,
  },
};

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    (useNetInfo as jest.Mock).mockReturnValue(true);
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: lightTheme, toggleTheme: jest.fn() }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(getByText('Enter a city to get current weather:')).toBeTruthy();
    expect(getByTestId('city-input')).toBeTruthy();
    expect(getByTestId('btnWeather')).toBeTruthy();
    expect(getByTestId('mode')).toBeTruthy();
  });

  it('handles city input and fetches weather data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: lightTheme, toggleTheme: jest.fn() }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </Provider>
    );

    const cityInput = getByTestId('city-input');
    const getWeatherButton = getByTestId('btnWeather');

    fireEvent.changeText(cityInput, 'New York');
    fireEvent.press(getWeatherButton);

    await waitFor(() => {
      expect(fetchWeather).toHaveBeenCalledWith('New York');
    });
  });

  it('shows error message when city name is invalid', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: lightTheme, toggleTheme: jest.fn() }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </Provider>
    );

    const getWeatherButton = getByTestId('btnWeather');
    fireEvent.press(getWeatherButton);

    expect(getByText('Please enter a valid city name')).toBeTruthy();
  });

  it('displays no internet connection message when offline', () => {
    (useNetInfo as jest.Mock).mockReturnValue(false);

    const { getByText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: lightTheme, toggleTheme: jest.fn() }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(getByText('No Internet Connection')).toBeTruthy();
  });

  it('toggles theme when switch is pressed', () => {
    const toggleThemeMock = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: lightTheme, toggleTheme: toggleThemeMock }}>
          <HomeScreen />
        </ThemeContext.Provider>
      </Provider>
    );

    const themeSwitch = getByTestId('Switch');
    fireEvent(themeSwitch, 'valueChange', true);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});