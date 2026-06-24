import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookIcon } from 'phosphor-react-native';
import { useBookStore } from '@/src/store/useBookStore';
import SavedCityCard from '@/src/components/savedCityCard';
import { useEffect } from 'react';
import { useDegreeStore } from '@/src/store/useDegreeStore';
import { getWeather } from '@/src/api/getWeather';
import { useColorTheme } from '@/src/hooks/useColorTheme';

const Book = () => {
  const cities = useBookStore((state) => state.cities);
  const setCitiesWeather = useBookStore((state) => state.setCitiesWeather);
  const citiesWeather = useBookStore((state) => state.citiesWeather);
  const showIn = useDegreeStore((state) => state.showIn);
  useEffect(() => {
    const setAll = async () => {
      const result = await Promise.all(
        cities.map((city) =>
          getWeather(city, showIn ? 'units=standard' : 'units=metric'),
        ),
      );
      setCitiesWeather(result);
    };
    setAll();
  }, [cities, showIn]);

  /**Тема!! */
  const theme = useColorTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.screen,
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <BookIcon size={24} weight="fill" color={theme.main_text} />
            <Text
              style={{
                ...styles.dateText,
                color: theme.main_text,
              }}
            >
              Weather Book
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
            paddingBottom: 140,
          }}
        >
          {citiesWeather.length ? (
            <FlatList
              style={{
                width: '100%',
                padding: 20,
              }}
              showsVerticalScrollIndicator={false}
              data={citiesWeather}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 700,
  },
  forecastContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 140,
  },
});
export default Book;
