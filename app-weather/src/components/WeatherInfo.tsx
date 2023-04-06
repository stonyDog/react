import React from "react";
import { WeatherData } from "../types/WeatherData";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <p>データを読み込み中...</p>;
  }

  return (
    <div>
      <p>天気: {weatherData.weather}</p>
      <p>詳細: {weatherData.description}</p>
      <p>気温: {weatherData.temperature} ℃</p>
      <p>湿度: {weatherData.humidity} %</p>
      <p>風速: {weatherData.windSpeed} m/s</p>
    </div>
  );
  };
  
  export default WeatherInfo;