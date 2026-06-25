import { create } from 'zustand';
import type { OpenWeatherApiResponse } from '../types/response.types';
import { getWeather } from '../api/getWeather';
import { usePlaceNameStore } from './usePlaceNameStore';
import { useSettingsStore } from './useSettingsStore';
interface IResponseStore {
  responseStatus: boolean;
  response: OpenWeatherApiResponse | null;
  getResponse: () => void;
}

const useResponseStore = create<IResponseStore>((set) => ({
  responseStatus: true,
  response: null,
  getResponse: async () => {
    const { placeName, lastPlaceName, setPlaceName } =
      usePlaceNameStore.getState();
    const { showIn } = useSettingsStore.getState();

    try {
      const res = await getWeather(
        placeName,
        showIn ? 'units=standard' : 'units=metric',
      );
      set({
        response: res,
        responseStatus: false,
      });
    } catch (error) {
      console.log(`Unknown City: ${error}`);
      setPlaceName(lastPlaceName);
      set({ responseStatus: false });
    }
  },
}));

export { useResponseStore };
