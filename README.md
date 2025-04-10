# WeatherApp
React Native Weather App using Redux Toolkit# WeatherApp

## React Native Weather App using Redux Toolkit

This is a **React Native** project that fetches and displays weather data from an external API. The app supports both iOS and Android and includes features such as city search, weather details display, state management using Redux Toolkit, and dark mode support via the React Native Appearance API.

---

## Getting Started

> **Note**: Ensure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Clone the Repository

```sh
git clone https://github.com/your-repo/weather-app.git
cd weather-app
```

### Step 2: Install Dependencies

```sh
npm install
# OR
yarn install
```

### Step 3: Start Metro

Metro is the JavaScript build tool for React Native. Run the following command to start Metro:

```sh
npm start
# OR
yarn start
```

### Step 4: Build and Run the App

#### For Android:

```sh
npx react-native run-android
```

#### For iOS:

Make sure CocoaPods dependencies are installed:

```sh
cd ios
pod install
cd ..
```

Then run:

```sh
npx react-native run-ios
```

---

## Features

- **City Search**: Enter a city name to fetch and display real-time weather data.
- **Weather Details**:
  - City Name
  - Current Temperature
  - Weather Condition (e.g., Sunny, Cloudy)
  - Weather Icon
- **Error Handling**: Displays an error message if the city is not found.
- **State Management**: Uses Redux Toolkit for managing app state.
- **Persistent Data**: Stores the last searched city using AsyncStorage.
- **Dark Mode**: Supports light and dark themes using the React Native Appearance API.

---

## Architectural Decisions

### **State Management with Redux Toolkit**

- The app uses **Redux Toolkit** for efficient state management.
- The `weatherSlice.ts` file contains the reducer and actions for fetching and storing weather data.
- The `store.ts` file configures the Redux store and integrates the weather slice.

### **Asynchronous Data Fetching**

- The app fetches weather data from the OpenWeatherMap API using Redux Async Thunks (`fetchWeather`).
- API calls are managed in a separate service file (`weatherService.ts`) for modularity.

### **Dark Mode with React Native Appearance API**

- The app dynamically switches themes based on system preferences.
- Uses `Appearance` API to detect the current color scheme and toggle between light and dark themes.

---

## Troubleshooting

If you encounter issues, refer to:
- [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
- Check for missing dependencies and install them using `npm install` or `yarn install`
- Ensure you have the correct version of Node.js and React Native CLI installed.

---

## Learn More

- [React Native Official Docs](https://reactnative.dev)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)

