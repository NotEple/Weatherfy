import { ChangeEvent, FormEvent, useState } from "react";
import { useForecast } from "../hooks/useForecast";

export const GetWeather = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const { forecast, loading, error, request } = useForecast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    request(search);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request(search);
  };

  if (error) {
    return (
      <div>
        An error occurred while fetching the weather data. Please try again.
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="search_box"
          aria-label="Search for a location"
          value={search}
          onChange={handleChange}
        />
        <button className="search_submit" type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {forecast ? (
            <div>
              <div>{forecast.location.name}</div>
              <div>{forecast.location.country}</div>
              <div>{forecast.location.localtime}</div>
              <div>{forecast.current.condition.text}</div>
              <div>{forecast.current.humidity}</div>
              <div>{forecast.current.feelslike_c}</div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};
