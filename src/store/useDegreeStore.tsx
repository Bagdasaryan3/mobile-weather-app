import { create } from 'zustand';

interface IDegreeStore {
  showIn: boolean;
  toggleShowIn: () => void;
}

const useDegreeStore = create<IDegreeStore>((set) => ({
  showIn: false,
  toggleShowIn: () => {
    set((state) => ({ showIn: !state.showIn }));
  },
}));

export { useDegreeStore };
