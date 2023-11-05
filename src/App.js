import "./App.scss";
import WeatherScreen from "./Component/WeatherScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };
  // added this function to change the theme base on current timing
  // user still can choose base on their preference
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours(); // added t
    if (currentHour >= 6 && currentHour <= 18) {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div className={`App ${isDarkMode ? "theme-dark" : "theme-default"}`}>
      <WeatherScreen isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
