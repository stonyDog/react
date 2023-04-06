import axios from "axios";
import { WeatherData } from "../types/WeatherData";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = async (
  location: string,
  date: string
): Promise<WeatherData> => {
  const params = {
    q: location,
    dt: new Date(date).getTime() / 1000,
    appid: apiKey,
    units: "metric",
    lang: "ja",
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    console.log(response);
    const data: WeatherData = {
      weather: response.data.weather[0].main,
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};