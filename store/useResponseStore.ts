import { create } from 'zustand';

interface IResponseStore {
  responseStatus: boolean;
  toggleResponseStatus: (status: boolean) => void;
}

const useResponseStore = create<IResponseStore>((set) => ({
  responseStatus: false,
  toggleResponseStatus: (status: boolean) => set({ responseStatus: status }),
}));

export { useResponseStore };
