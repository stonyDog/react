import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./utils/api";
import { WeatherData } from "./types/WeatherData";
import WeatherInfo from "./components/WeatherInfo";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const latitude = 35.6895;
      const longitude = 139.6917;
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
      console.log(data);
    }

    fetchData();

  }, []);

  return (
    <div className="App">
      <h1>天気情報</h1>
      <WeatherInfo weatherData={weatherData} />
    </div>
  );
};

export default App;