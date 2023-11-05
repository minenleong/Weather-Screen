import "./App.scss";
import WeatherScreen from "./Component/WeatherScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };
  return (
      <div className={`App ${isDarkMode ? 'theme-dark' : 'theme-default'}`}>
        <WeatherScreen isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <ToastContainer autoClose={3000} />
      </div>
  );
}

export default App;
