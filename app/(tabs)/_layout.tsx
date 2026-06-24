import { Tabs } from 'expo-router';
import {
  CloudSunIcon,
  BookIcon,
  CalendarDotsIcon,
  GearFineIcon,
} from 'phosphor-react-native';
import { useSettingsStore } from '@/src/store/useSettingsStore';

export default function TabsLayout() {
  const isDarkTheme = useSettingsStore((state) => state.isDarkTheme);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0088ff',
        tabBarInactiveTintColor: isDarkTheme ? '#585D6B' : '#a5a5a5',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: isDarkTheme ? '#1b1e27' : 'white',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <CloudSunIcon color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: 'Forecast',
          tabBarIcon: ({ color }) => (
            <CalendarDotsIcon color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color }) => <BookIcon color={color} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <GearFineIcon color={color} weight="regular" />
          ),
        }}
      />
    </Tabs>
  );
}
