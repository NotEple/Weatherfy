import { useState } from "react";
import { API_KEY } from "../api/apiKey";
import { FORECAST_API } from "../api/api";
import { hasNumber } from "../utils/hasNumber";

type ErrorTest = {
  status: boolean;
  message: string;
};

export const useForecast = (): UseForecast => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorTest>({ status: false, message: "" });

  const requestForecaseData = async (searchLocation: string): Promise<void> => {
    setLoading(true);
    setError({ status: false, message: "" });

    if (searchLocation.length === 0) {
      setError({ status: true, message: "You need to add a location..." });
      setLoading(false);
      return;
    }

    if (hasNumber(searchLocation)) {
      setError({ status: true, message: "Search can not include numbers" });
      setLoading(false);
      return;
    }

    try {
      const response: Response = await fetch(
        `${FORECAST_API}?key=${API_KEY}&q=${searchLocation}&aqi=no`
      );

      if (!response.ok) {
        setError({ status: true, message: "Network response was not ok" });
        throw new Error("Network response was not ok");
      }

      const results: Forecast = await response.json();

      setForecast(results);
    } catch (error) {
      console.error("Fetching weather data failed:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return { forecast, loading, error, request: requestForecaseData };
};
