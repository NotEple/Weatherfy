import {
  useState,
  useEffect,
  FunctionComponent,
  ReactNode,
  ReactElement,
} from "react";
import { apiKey } from "../api/apiKey";
import { forecast_api } from "../api/weatherApi";
import Cloud from "../images/clouds.png";
import Sun from "../images/sun.png";
import Rain from "../images/rain2.gif";
import Snow from "../images/snow.gif";

interface weather {
  time: number;
}

export default function ForecastWeather() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const getWeather = async () => {
    try {
      setLoading(true);
      setForecastData([]);
      setWeatherData(null);
      setLocationData(null);

      const req = await fetch(
        forecast_api + apiKey + `&q=${searchParam}&aqi=no`
      );
      const res = await req.json();

      if (
        req.status === 400 &&
        res.error.message === "Parameter q is missing."
      ) {
        throw Error("You need to add a location...");
      }

      if (
        req.status === 400 &&
        res.error.message === "No matching location found."
      ) {
        throw Error("We did not find that location...");
      }

      setLocationData(res.location);
      setWeatherData(res.current);
      setForecastData(res.forecast.forecastday[0].hour);

      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ForecastDate = forecastData.filter((time: weather) => {
    if (time.time) {
      const forecastTime = time.time;
      const localTime = locationData.localtime;
      return forecastTime >= localTime;
    }
    return true;
  });

  function wind_degree(degree: number) {
    if (degree > 337.5) return "Northe";
    if (degree > 292.5) return "North West";
    if (degree > 247.5) return "West";
    if (degree > 202.5) return "South West";
    if (degree > 157.5) return "South";
    if (degree > 122.5) return "South Easte";
    if (degree > 67.5) return "East";
    if (degree > 22.5) {
      return "North East";
    }
    return true;
  }

  return (
    <>
      <section className="container">
        <div className="header_container">
          <h1 className="header">Weatherfy</h1>
          <h2 className="sub_header">Get the weather on the fly</h2>
        </div>
        <form
          className="search_form"
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          {error && <span className="error">{error}</span>}
          <span className="search_header">Search for a location</span>
          <input
            className="search_box"
            aria-label="Search for a location"
            onChange={(e) => {
              setSearchParam(e.target.value);
              setError(null);
            }}
          />
          <button className="search_submit" onClick={getWeather}>
            Search
          </button>
        </form>
      </section>
      {forecastData && locationData && weatherData ? (
        <section className="weather_container">
          <h3 className="weather_header">
            Weather for {locationData.name}, {locationData.country}
          </h3>
          {ForecastDate.map((forecast: any, index: number) => (
            <div key={index} className="weather_div">
              <p className="weather_time">{forecast.time.slice(10)}</p>
              <hr />
              <p className="weather_condition">{forecast.condition.text}</p>
              <hr />
              <div className="test">
                <img src={forecast.condition.icon} alt="weather icon" />
                {/* <p>{wind_degree(forecast.wind_degree)}</p>
                <p>{forecast.wind_kph} KM/h</p> */}
                <p className="weather_temp">{forecast.temp_c}°C</p>
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </>
  );
}
