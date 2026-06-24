import { create } from 'zustand';
import type { OpenWeatherApiResponse } from '../types/datacontext.types';

interface IBookStore {
  cities: string[];
  setCities: (name: string) => void;
  citiesWeather: OpenWeatherApiResponse[];
  toggleSavedCity: (name: string) => void;
  removeSaved: (name: string) => void;
  setCitiesWeather: (list: OpenWeatherApiResponse[]) => void;
}

const useBookStore = create<IBookStore>((set) => ({
  cities: [],
  citiesWeather: [],

  setCities: (name): void => {
    set((state) => ({
      cities: [...state.cities, name],
    }));
  },

  setCitiesWeather: (list) => {
    set({ citiesWeather: list });
  },

  removeSaved: (name) => {
    set((state) => ({
      cities: state.cities.filter((item) => item !== name),
    }));
  },

  toggleSavedCity: (name) => {
    set((state) => {
      const exists = state.cities.includes(name);

      return {
        cities: exists
          ? state.cities.filter((item) => item !== name)
          : [...state.cities, name],
      };
    });
  },
}));

export { useBookStore };

/**как этот код реализовать в зустанд?

const [citiesWeather, setCitiesWeather] = useState([]);

const cities = ["Kyiv", "London", "Paris", "Berlin"];

const loadCitiesWeather = async () => {

  const results = await Promise.all(
    cities.map(city =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      ).then(res => res.json())
    )
  );
  setCitiesWeather(results);
}; */
