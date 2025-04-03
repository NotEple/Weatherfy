import { formatDate } from "../utils/formatDate";

export const Card = ({ forecast }: { forecast: any }): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-between py-2 px-4 border-2 border-gray-400 rounded-md">
      <p className="weather_time">
        {formatDate(forecast.time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <hr />
      <p className="">{forecast.condition.text}</p>
      <hr />
      <div className="flex flex-col items-center">
        <img src={forecast.condition.icon} alt="weather icon" />
        <p className="weather_temp">{forecast.temp_c}°C</p>
        {/* <p>{forecast.wind_degree}</p> */}
        {/* <p>{forecast.wind_kph} KM/h</p> */}
      </div>
    </div>
  );
};
