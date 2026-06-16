import { create } from 'zustand';
import * as Location from 'expo-location';

interface IPlaceNameStore {
  placeNameText: string;
  placeName: string;
  lastPlaceName: string;
  locationName: string;

  getLocation: () => void;
  setLocationName: (name: string) => void;
  setPlaceNameText: (name: string) => void;
  setPlaceName: (name: string) => void;
  setLastPlaceName: (name: string) => void;
}

const usePlaceNameStore = create<IPlaceNameStore>((set) => ({
  placeNameText: '',
  placeName: 'new york',
  lastPlaceName: '',
  locationName: 'new york',

  setLocationName: (name) => set({ locationName: name }),
  setPlaceNameText: (name) => set({ placeNameText: name }),
  setPlaceName: (name) => set({ placeName: name }),
  setLastPlaceName: (name) => set({ lastPlaceName: name }),

  getLocation: async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      let location;

      try {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      } catch (error) {
        console.log(error);
        return;
      }

      const result = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (!result.length) {
        return;
      }

      const address = result[0];

      const name =
        address.city ||
        address.subregion ||
        address.district ||
        address.region ||
        'Unknown location';

      set({ locationName: name });
      set({ placeName: name });
    } catch (error) {
      console.error('Turn on Location. Getting location went wrong', error);
      set({ locationName: 'new york' });
      return;
    }
  },
}));

export { usePlaceNameStore };
