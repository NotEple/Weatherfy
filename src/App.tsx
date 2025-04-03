import "./App.css";
import WeatherNow from "./components/WeatherNow";
import ForecastWeather from "./components/ForecastWeather";
import { GetWeather } from "./components/GetWeather";
import Testing from "./components/Testing";

function App() {
  return (
    <div className="App">
      <ForecastWeather />
      {/* <WeatherNow /> */}
      {/* <GetWeather /> */}
      {/* <Testing /> */}
    </div>
  );
}

export default App;
