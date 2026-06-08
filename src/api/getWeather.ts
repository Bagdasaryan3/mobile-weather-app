const place = (placeName: string) => {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&units=metric&appid=3ef04bc0804d9af4ce4e63c162ed8ef0`;
};

import type { OpenWeatherApiResponse } from '../types/datacontext.types';

export const getWeather = async (name: string) => {
  const url = place(name);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Не найдено`);
  }

  const data: OpenWeatherApiResponse = await res.json();
  return data;
};
