// 1. Описание вложенных объектов погоды (дождь, облака, ветер и т.д.)
interface WeatherCondition {
  id: number;
  main: string; // Например: "Rain", "Clouds", "Clear"
  description: string; // Например: "light rain", "overcast clouds"
  icon: string; // Код иконки для картинок, например: "10d"
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WindData {
  speed: number;
  deg: number;
  gust: number;
}

interface CloudsData {
  all: number;
}

interface RainData {
  '3h': number; // Кавычки нужны, потому что ключ начинается с цифры
}

interface SysData {
  pod: string;
}

// 2. Описание одного элемента из массива list (одна точка времени из 40)
interface WeatherForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[]; // Массив, потому что сервер так отдает
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  pop: number;
  rain?: RainData; // Опционально, потому что дождь есть не во всех элементах
  sys: SysData;
  dt_txt: string; // Строка даты, например: "2026-06-04 15:00:00"
}

// 3. Описание объекта города в конце JSON
interface CityData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// 4. Главный интерфейс всего ответа от сервера
export interface OpenWeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastItem[];
  city: CityData;
}
