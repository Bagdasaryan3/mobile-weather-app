import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookIcon } from 'phosphor-react-native';
import { useBookStore } from '@/src/store/useBookStore';
import SavedCityCard from '@/src/components/savedCityCard';
import { useEffect } from 'react';
import { useSettingsStore } from '@/src/store/useSettingsStore';
import { getWeather } from '@/src/api/getWeather';
import { useColorTheme } from '@/src/hooks/useColorTheme';
import { pageStyles } from '@/styles/page';

const Book = () => {
  const books = useBookStore();

  const showIn = useSettingsStore((state) => state.showIn);
  useEffect(() => {
    const setAll = async () => {
      const result = await Promise.all(
        books.cities.map((city) =>
          getWeather(city, showIn ? 'units=standard' : 'units=metric'),
        ),
      );
      books.setCitiesWeather(result);
    };
    setAll();
  }, [books.cities, showIn]);

  /**Тема!! */
  const theme = useColorTheme();

  return (
    <View
      style={{
        ...pageStyles.container,
        backgroundColor: theme.screen,
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={pageStyles.header}>
          <View style={pageStyles.headerTextContainer}>
            <BookIcon size={24} weight="fill" color={theme.main_text} />
            <Text
              style={{
                ...pageStyles.dateText,
                color: theme.main_text,
              }}
            >
              Weather Book
            </Text>
          </View>
        </View>

        <View
          style={{
            ...pageStyles.contentContainer,
            backgroundColor: theme.background,
          }}
        >
          {books.citiesWeather.length ? (
            <FlatList
              style={{
                width: '100%',
                padding: 20,
              }}
              showsVerticalScrollIndicator={false}
              data={books.citiesWeather}
              renderItem={({ item }) => (
                <SavedCityCard
                  cityName={item.city.name}
                  temp={item.list[0].main.temp}
                  icon={item.list[0].weather[0].icon}
                />
              )}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                paddingTop: 120,
                gap: 20,
              }}
            >
              <Image
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
                source={require('@/images/work.png')}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: theme.main_text,
                  fontWeight: 600,
                }}
              >
                Weather Book is Empty
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Book;
