import React, { useState } from "react";
import { fetchWeatherData } from "./utils/api";
import { WeatherData } from "./types/WeatherData";
import WeatherInfo from "./components/WeatherInfo";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleGetWeather = async () => {
    if (location && date) {
      const data = await fetchWeatherData(location, date);
      setWeatherData(data);
    }
  };

  return (
    <div className="App">
      <h1>天気情報</h1>
      <label>
        場所:
        <input type="text" value={location} onChange={handleLocationChange} />
      </label>
      <label>
        日付:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <button onClick={handleGetWeather}>検索</button>
      <WeatherInfo weatherData={weatherData} />
    </div>
  );
};

export default App;