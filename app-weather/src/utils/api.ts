import { WeatherData } from "../types/WeatherData";

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData | null> {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("天気情報の取得に失敗しました");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("エラー:", error);
    return null;
  }
}