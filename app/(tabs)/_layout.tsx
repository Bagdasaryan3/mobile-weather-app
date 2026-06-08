import { Tabs } from 'expo-router';
import {
  CloudSunIcon,
  BooksIcon,
  CalendarDotsIcon,
} from 'phosphor-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0088ff',
        tabBarInactiveTintColor: '#a5a5a5',
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
          tabBarIcon: ({ color }) => <BooksIcon color={color} weight="fill" />,
        }}
      />
    </Tabs>
  );
}
