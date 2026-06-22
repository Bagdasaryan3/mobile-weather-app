import { create } from 'zustand';

interface IDegreeStore {
  showIn: boolean;
  toggleShowIn: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const useDegreeStore = create<IDegreeStore>((set) => ({
  showIn: false,
  toggleShowIn: () => {
    set((state) => ({ showIn: !state.showIn }));
  },

  isDarkTheme: false,
  toggleTheme: () => {
    set((state) => ({ isDarkTheme: !state.isDarkTheme }));
  },
}));

export { useDegreeStore };
