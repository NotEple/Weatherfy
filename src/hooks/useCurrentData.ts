import { useEffect, useState } from "react";
import { CURRENT_API } from "../api/api";
import { API_KEY } from "../api/apiKey";

export const useCurrentData = (location: string): UseCurrentData => {
  const [data, setData] = useState<WeatherCurrent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const requestCurrentData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response: Response = await fetch(
        CURRENT_API + `?key=${API_KEY}` + `&q=${location}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const results: Weather = await response.json();

      setData(results.current);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCurrentData();
  }, []);

  return { data, loading, error, refetch: requestCurrentData };
};
