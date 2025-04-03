import { useState } from "react";
import { API_KEY } from "../api/apiKey";
import { CURRENT_API } from "../api/api";

export const useWeather = (): UseWeather => {
  const [location, setLocation] = useState<Weather["location"] | null>(null);
  const [current, setCurrent] = useState<Weather["current"] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const requestWeatherData = async (searchLocation: string): Promise<void> => {
    setLoading(true);
    setError(false);

    try {
      const response: Response = await fetch(
        `${CURRENT_API}?key=${API_KEY}&q=${searchLocation}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const results: Weather = await response.json();

      setLocation(results.location);
      setCurrent(results.current);
    } catch (error) {
      console.error("Fetching weather data failed:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { location, current, loading, error, request: requestWeatherData };
};
