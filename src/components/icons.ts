import {
  SunIcon,
  MoonIcon,
  CloudSunIcon,
  CloudMoonIcon,
  CloudIcon,
  DropIcon,
  CloudRainIcon,
  CloudLightningIcon,
  CloudSnowIcon,
  CloudFogIcon,
} from 'phosphor-react-native';

export const weatherIconMap = {
  '01d': SunIcon, // Ясно (день)
  '01n': MoonIcon, // Ясно (ночь)
  '02d': CloudSunIcon, // Малооблачно (день)
  '02n': CloudMoonIcon,
  '03d': CloudIcon, // Облачно
  '03n': CloudIcon,
  '04d': CloudIcon, // Пасмурно
  '04n': CloudIcon,
  '09d': CloudRainIcon, // Ливень
  '09n': CloudRainIcon,
  '10d': DropIcon, // Дождь
  '10n': DropIcon,
  '11d': CloudLightningIcon, // Гроза
  '11n': CloudLightningIcon,
  '13d': CloudSnowIcon, // Снег
  '13n': CloudSnowIcon,
  '50d': CloudFogIcon, // Туман
  '50n': CloudFogIcon,
};
