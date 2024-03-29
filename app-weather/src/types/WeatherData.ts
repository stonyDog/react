export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherData {
  weather: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  // 必要に応じて他のプロパティも追加できるよ
}