import { create } from 'zustand';

interface IPlaceNameStore {
  placeNameText: string;
  placeName: string;
  lastPlaceName: string;

  setPlaceNameText: (name: string) => void;
  setPlaceName: (name: string) => void;
  setLastPlaceName: (name: string) => void;
}

const usePlaceNameStore = create<IPlaceNameStore>((set) => ({
  placeNameText: '',
  placeName: 'miami',
  lastPlaceName: '',

  setPlaceNameText: (name) => set({ placeNameText: name }),
  setPlaceName: (name) => set({ placeName: name }),
  setLastPlaceName: (name) => set({ lastPlaceName: name }),
}));

export { usePlaceNameStore };
