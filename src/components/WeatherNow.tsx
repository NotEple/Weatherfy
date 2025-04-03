import { useState, useEffect } from "react";
import { apiKey } from "../api/apiKey";
import { current_api, forecast_api } from "../api/api";
import Cloud from "../images/clouds.png";
import Sun from "../images/sun.png";
import Rain from "../images/rain2.gif";
import Snow from "../images/snow.gif";

export default function WeatherNow() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [searchParam, setSearchParam] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  //Weather conditions
  const [Clouds, setClouds] = useState<boolean>(false);
  const [Sunny, setSunny] = useState<boolean>(false);
  const [Clear, setClear] = useState<boolean>(false);
  const [Snowing, setSnow] = useState<boolean>(false);
  const [Raining, setRain] = useState<boolean>(false);
  const [Overcast, setOvercast] = useState<boolean>(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      const req = await fetch(
        current_api + apiKey + `&q=${searchParam}&aqi=no`
      );
      const res = await req.json();
      console.log(res);

      // if (res.error.message === "Parameter q is missing.") {
      //   throw Error("You need to add a place...");
      // }

      // if (res.error.message === "No matching location found.") {
      //   throw Error("We did not find that location...");
      // }

      setLocationData(res.location);
      setWeatherData(res.current);

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

      if (res.current.condition.text === "Partly cloudy") {
        setClouds(true);
        setSunny(true);
        setRain(false);
        setSnow(false);
      }

      if (res.current.condition.text === "Clear") {
        setClear(true);
        setClouds(false);
        setRain(false);
        setSnow(false);
        setOvercast(false);
      }

      if (res.current.condition.text === "Sunny") {
        setClear(true);
        setClouds(false);
        setSunny(true);
        setRain(false);
        setSnow(false);
        setOvercast(false);
      }

      if (res.current.condition.text === "Light rain") {
        setClear(false);
        setClouds(true);
        setSnow(false);
        setRain(true);
        setSunny(false);
        setOvercast(false);
      }

      if (
        res.current.condition.text === "Moderate rain at times" ||
        res.current.condition.text === "Moderate rain"
      ) {
        setClear(false);
        setClouds(true);
        setSnow(false);
        setRain(true);
        setSunny(false);
        setOvercast(true);
      }

      if (res.current.condition.text === "Overcast") {
        setClouds(true);
        setSunny(false);
        setRain(false);
        setSnow(false);
        setClear(false);
        setOvercast(true);
      }

      if (res.current.condition.text === "Moderate or heavy snow showers") {
        setClouds(true);
        setSunny(false);
        setRain(false);
        setSnow(true);
        setClear(false);
        setOvercast(false);
      }

      if (res.current.condition.text === "Light snow showers") {
        setClouds(true);
        setSunny(false);
        setRain(false);
        setSnow(true);
        setClear(false);
        setOvercast(false);
      }

      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function clear() {
    setWeatherData(null);
    setLocationData(null);
    setClouds(false);
    setSunny(false);
    setClear(false);
    setRain(false);
    setOvercast(false);
    setSnow(false);
    setLocationData(null);
    setWeatherData(null);
  }

  return (
    <>
      {Clouds ? (
        <div className="weather_box">
          <img className="cloud" src={Cloud} alt="Grey cloud" />
          <img className="cloud2" src={Cloud} alt="Grey cloud" />
          <img className="cloud3" src={Cloud} alt="Grey cloud" />
        </div>
      ) : null}
      {Sunny ? (
        <div className="weather_box">
          <img className="sun" src={Sun} alt="Sun" />
        </div>
      ) : null}
      {Clear ? (
        <div className="weather_box">
          <img className="sun" src={Sun} alt="Sun" />
        </div>
      ) : null}
      {Raining ? (
        <div className="weather_box">
          <img className="rain" src={Rain} alt="Rain" />
        </div>
      ) : null}
      {Overcast ? (
        <div className="weather_box">
          <img className="cloud" src={Cloud} alt="Grey cloud" />
          <img className="cloud2" src={Cloud} alt="Grey cloud" />
          <img className="cloud3" src={Cloud} alt="Grey cloud" />
        </div>
      ) : null}
      {Snowing ? (
        <div className="weather_box">
          <img className="cloud" src={Cloud} alt="Grey cloud" />
          <img className="cloud2" src={Cloud} alt="Grey cloud" />
          <img className="cloud3" src={Cloud} alt="Grey cloud" />
          <img className="snow" src={Snow} alt="Snow" />
        </div>
      ) : null}
      <section className="container">
        <div className="header_container">
          <h1 className="header">Weatherfy</h1>
          <h2 className="sub_header">Get the weather on the fly</h2>
        </div>
        <form
          className="search_form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {error && <span className="error">{error}</span>}
          <span className="search_header">Search for a location</span>
          <input
            className="search_box"
            aria-label="Search for a location"
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button className="search_submit" onClick={getWeather}>
            Search
          </button>
        </form>
      </section>
      <section className="data_container">
        {loading && (
          <div className="loading_container">
            <div className="loading"></div>
            <div className="loading_text">Loading data...</div>
          </div>
        )}

        {weatherData ? (
          <div className="weather_info">
            <div className="weather_type">{weatherData.condition.text}</div>

            <div className="weather_temp">
              Temprature {weatherData.temp_c}°C
            </div>
            <div className="weather_feels_like_temp">
              Feels like {weatherData.feelslike_c}°C
            </div>
            <div className="weather_wind">
              Wind {weatherData.wind_kph} | Wind direction{" "}
              {weatherData.wind_dir}
            </div>
            <img
              className="weather_icon"
              src={weatherData.condition.icon}
              alt="Weather icon"
            />
          </div>
        ) : null}
        {locationData ? (
          <div className="weather_info">
            <div className="weather_city">
              {locationData.name}, {locationData.region}
            </div>
            <div className="weather_country">{locationData.country}</div>
            <div className="weather_localtime">
              Local time: {locationData.localtime}
            </div>
          </div>
        ) : null}
        {/* {locationData || weatherData ? (
          <button onClick={clear}>Clear data</button>
        ) : null} */}
      </section>
    </>
  );
}
