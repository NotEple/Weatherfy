{
  weatherData ? (
    <>
      <div className="city">
        {weatherData.name} {weatherData.region}
      </div>
      <div className="country">{weatherData.country}</div>
    </>
  ) : null;
}
{
  locationData ? (
    <>
      <div className="temperature">{locationData.temp_c}</div>
    </>
  ) : null;
}
