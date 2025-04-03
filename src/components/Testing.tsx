import React, { ChangeEvent, FormEvent, useState } from "react";
import { useCurrentData } from "../hooks/useCurrentData";
import { useWeather } from "../hooks/useWeather";
import debounce from "lodash.debounce";

export default function Testing() {
  const [search, setSearch] = useState<string>("");
  const { location, current, loading, error, request } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    request(search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search_box"
          aria-label="Search for a location"
          value={search}
          onChange={handleChange}
        />
        <button className="search_submit" type="button" onClick={handleSubmit}>
          Search
        </button>
      </form>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <>{location?.country}</>
          <>{current?.condition.text}</>
        </>
      )}
    </div>
  );
}
