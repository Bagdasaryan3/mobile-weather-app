import { create } from 'zustand';

interface ISettingsStore {
  showIn: boolean;
  toggleShowIn: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const useSettingsStore = create<ISettingsStore>((set) => ({
  showIn: false,
  toggleShowIn: () => {
    set((state) => ({ showIn: !state.showIn }));
  },

  isDarkTheme: false,
  toggleTheme: () => {
    set((state) => ({ isDarkTheme: !state.isDarkTheme }));
  },
}));

export { useSettingsStore };
