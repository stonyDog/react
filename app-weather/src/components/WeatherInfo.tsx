import React from "react";
import { WeatherData } from "../types/WeatherData";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <p>データを読み込み中...</p>;
  }

  const { main, name,weather } = weatherData;
  const cityName = name;
  const temperature = main.temp;
  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;

  return (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt={weatherDescription}
        />
        <p>場所：{cityName}</p>
        <p>気温：{temperature}℃</p>
        <p>天気：{weatherDescription}</p>
      </div>
    );
  };
  
  export default WeatherInfo;