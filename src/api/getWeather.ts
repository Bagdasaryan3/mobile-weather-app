const place = (placeName: string, showIn: string) => {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&${showIn}&appid=3ef04bc0804d9af4ce4e63c162ed8ef0`;
};

import type { OpenWeatherApiResponse } from '../types/datacontext.types';

export const getWeather = async (name: string, showIn: string) => {
  const url = place(name, showIn);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Не найдено`);
  }

  const data: OpenWeatherApiResponse = await res.json();
  return data;
};
