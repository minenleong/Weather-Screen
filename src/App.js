import "./App.scss";
import WeatherScreen from "./Component/WeatherScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <WeatherScreen /> 
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
