import { useState, FormEvent, ChangeEvent } from "react";
import { useForecast } from "../hooks/useForecast";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import { AnimateEntry } from "./AnimateEntry";

export default function ForecastWeather() {
  const [search, setSearch] = useState<string>("");
  const { forecast, loading, error, request } = useForecast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    request(search);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const forecastDate = forecast?.forecast.forecastday[0].hour.filter(
    (day: any) => {
      if (day.time) {
        const forecastTime = day.time;
        const localTime = forecast.location.localtime;
        return forecastTime >= localTime;
      }
      return;
    }
  );

  return (
    <>
      <section className="flex flex-col items-center gap-4 w-full">
        <form
          className="bg-gray-200 gap-4 rounded-md flex flex-col p-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl text-dark-blue font-semibold">Weatherfy</h1>
            <h2 className="text-3xl text-dark-blue">
              Get the weather on the fly
            </h2>
          </div>
          {error.status && (
            <span className="bg-red-600 text-gray-200 p-2 rounded-md font-semibold">
              {error.message}
            </span>
          )}
          <input
            className="rounded-md placeholder:text-dark-blue h-12 placeholder:font-semibold border-dark-blue caret-dark-blue text-dark-blue bg-gray-200 border-2 focus:outline-2 focus:outline-dark-blue pl-1 text-2xl"
            aria-label="Search for a location"
            placeholder="Search for a location"
            type="search"
            onChange={handleChange}
          />
          <button
            className={twMerge(
              "bg-dark-blue w-full h-12 rounded-md text-gray-200 text-2xl hover:cursor-pointer border-2 border-gray-200 hover:outline-2 hover:outline-dark-blue"
            )}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex flex-row gap-1 justify-center w-full">
                <div className="bg-gray-200 rounded-full w-4 h-4 animate-pulse-delay-200"></div>
                <div className="bg-gray-200 rounded-full w-4 h-4 animate-pulse-delay-400"></div>
                <div className="bg-gray-200 rounded-full w-4 h-4 animate-pulse-delay-600"></div>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </section>
      <AnimatePresence initial={false}>
        {!error.status && !loading ? (
          <div className="flex rounded-md max-w-md overflow-x-hidden">
            {forecast && (
              <motion.div
                initial={{ opacity: 0, y: -50, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <section className="bg-gray-200 items-center flex w-full max-w-md">
                  <div className="flex flex-col w-[500px] text-black bg-gray-200 h-full">
                    <h3 className="text-center text-3xl font-semibold text-dark-blue pb-10 pt-10">
                      Weather for {forecast.location.name},{" "}
                      {forecast.location.country}
                    </h3>
                    <div className="gap-4 flex flex-col w-full px-4 pb-4">
                      {forecastDate!.map((forecast, index: number) => (
                        <AnimateEntry index={index}>
                          <Card forecast={forecast} />
                        </AnimateEntry>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
