import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { getWeather } from '../api/getWeather';
import { useEffect } from 'react';
import type { OpenWeatherApiResponse } from '../types/datacontext.types';

export interface CurrentWeatherState {
  city: string | undefined;
  temp: number | undefined;
  feelsLike: number | undefined;
  humidity: number | undefined;
  main: string | undefined;
  condition: string | undefined;
  wind: number | undefined;
  iconId: string | undefined;
  isResponse: boolean;
  lat: number | undefined;
  lon: number | undefined;
  placeName: string;
  setPlaceName: (name: string) => void;
  placeNameText: string;
  setPlaceNameText: (text: string) => void;
  lastPlaceName: string;
  setLastPlaceName: (name: string) => void;
}

export const DataContext = createContext<null | CurrentWeatherState>(null);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [response, setResponse] = useState<null | OpenWeatherApiResponse>(null);
  const [isResponse, setIsResponse] = useState<boolean>(true);

  const [placeNameText, setPlaceNameText] = useState<string>('');
  const [placeName, setPlaceName] = useState<string>('yerevan');
  const [lastPlaceName, setLastPlaceName] = useState<string>('');

  useEffect(() => {
    const getRes = async () => {
      try {
        const apisResponse = await getWeather(placeName);
        setResponse(apisResponse);
        setIsResponse(false);
      } catch (error) {
        console.log(error);
        setPlaceName(lastPlaceName);
        setIsResponse(false);
      }
    };
    getRes();
  }, [placeName]);

  const value: CurrentWeatherState = {
    city: response?.city.name,
    temp: response?.list[0].main.temp,
    feelsLike: response?.list[0].main.feels_like,
    humidity: response?.list[0].main.humidity,
    main: response?.list[0].weather[0].main,
    condition: response?.list[0].weather[0].description,
    wind: response?.list[0].wind.speed,
    iconId: response?.list[0].weather[0].icon,
    isResponse: isResponse,
    lat: response?.city.coord.lat,
    lon: response?.city.coord.lon,
    placeName,
    setPlaceName,
    placeNameText,
    setPlaceNameText,
    lastPlaceName,
    setLastPlaceName,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
