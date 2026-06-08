import { Slot } from 'expo-router';
import { DataProvider } from '../src/context/DataContext';

export default function RootLayout() {
  return (
    <DataProvider>
      <Slot />
    </DataProvider>
  );
}
