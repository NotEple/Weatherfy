import { useState } from "react";
import { CURRENT_API } from "../api/api";
import { API_KEY } from "../api/apiKey";

export const useLocationData = (): UseLocationData => {
  const [data, setData] = useState<WeatherLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const requestLocationData = async (location: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: Response = await fetch(
        `${CURRENT_API}?key=${API_KEY}&q=${location}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const results: Weather = await response.json();
      setData(results.location);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request: requestLocationData };
};
