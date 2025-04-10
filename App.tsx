// App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import HomeScreen from "./src/screens/HomeScreen";
import { ThemeProvider } from "./src/context/ThemeContext";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  </Provider>
);

export default App;
