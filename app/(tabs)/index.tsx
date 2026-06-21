import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import {
  ThermometerIcon,
  DropHalfIcon,
  PersonSimpleSwimIcon,
  CloudWarningIcon,
  WindIcon,
  MapPinAreaIcon,
  BookmarkSimpleIcon,
} from 'phosphor-react-native';
import WeatherMap from '@/src/components/weatherMap';
import { weatherIconMap } from '@/src/data/icons';
import { weatherImageMap } from '@/src/data/imgs';
import { useResponseStore } from '@/src/store/useResponseStore';
import { usePlaceNameStore } from '@/src/store/usePlaceNameStore';
import { useBookStore } from '@/src/store/useBookStore';
import UpperInfo from '@/src/components/upperInfo';
import InfoCard from '@/src/components/infoCard';
import Mock from '@/src/components/mock';
import { StatusBar } from 'react-native';

export default function Index() {
  StatusBar.setBarStyle('dark-content');

  const getResponse = useResponseStore((state) => state.getResponse);

  const responseStatus = useResponseStore((state) => state.responseStatus);

  const setPlaceName = usePlaceNameStore((state) => state.setPlaceName);
  const locationName = usePlaceNameStore((state) => state.locationName);

  const getLocation = usePlaceNameStore((state) => state.getLocation);

  const city = useResponseStore((state) => state.response?.city.name);
  const temp = useResponseStore((state) => state.response?.list[0].main.temp);
  const feelsLike = useResponseStore(
    (state) => state.response?.list[0].main.feels_like,
  );
  const humidity = useResponseStore(
    (state) => state.response?.list[0].main.humidity,
  );

  const wind = useResponseStore((state) => state.response?.list[0].wind.speed);
  const iconId = useResponseStore(
    (state) => state.response?.list[0].weather[0].icon,
  );

  const toggleSavedCity = useBookStore((state) => state.toggleSavedCity);
  const cities = useBookStore((state) => state.cities);

  const IconComponent =
    weatherIconMap[iconId as keyof typeof weatherIconMap] || CloudWarningIcon;
  const WeatherImage =
    weatherImageMap[iconId as keyof typeof weatherImageMap] ||
    require('../../images/err.png');

  useEffect(() => {
    getLocation();
  });

  useEffect(() => {
    getResponse();
  }, [locationName]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <StatusBar
          barStyle="dark-content" // иконки чёрные (и iOS тоже)
        />

        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <IconComponent size={24} weight="fill" color="#313131" />
            <Text style={styles.dateText}>{city}</Text>
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => toggleSavedCity(city ?? '')}
          >
            <BookmarkSimpleIcon
              size={28}
              weight="fill"
              color={
                cities.some((item) => item === city) ? '#ebce4f' : '#c9c9c9'
              }
            />
          </TouchableOpacity>
        </View>

        {responseStatus ? (
          <Mock />
        ) : (
          <ScrollView
            style={{ backgroundColor: '#f4f4f4' }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.weatherContainer}>
              <UpperInfo />

              <View style={styles.weatherInfo}>
                <View style={{ gap: 10 }}>
                  <View style={styles.tempInfoContainer}>
                    <Text
                      style={{
                        fontSize: 50,
                        color:
                          typeof temp === 'number' && temp > 0
                            ? '#B65050'
                            : '#5074B6',
                      }}
                    >
                      {Math.round(temp ?? 0)}
                    </Text>
                    <ThermometerIcon
                      size={36}
                      weight="fill"
                      color={
                        typeof temp === 'number' && temp > 0
                          ? '#B65050'
                          : '#5074B6'
                      }
                    />
                  </View>
                  <View style={styles.feelsLikeTextContainer}>
                    <PersonSimpleSwimIcon
                      weight="regular"
                      size={20}
                      color={
                        typeof temp === 'number' && temp > 0
                          ? '#cc9797'
                          : '#97a8cc'
                      }
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          typeof temp === 'number' && temp > 0
                            ? '#cc9797'
                            : '#97a8cc',
                      }}
                    >
                      {`Feels like ${Math.round(feelsLike ?? 0)}°`}
                    </Text>
                  </View>
                </View>
                <Image style={styles.weatherImage} source={WeatherImage} />
              </View>

              <View style={{ gap: 12, width: '100%' }}>
                <InfoCard
                  WeatherIcon={DropHalfIcon}
                  text="Humidity"
                  infoText={`${humidity}%`}
                  color="#6C78B3"
                />
                <InfoCard
                  WeatherIcon={WindIcon}
                  text="Wind Speed"
                  infoText={`${wind} m/h`}
                  color="#6ca8b3"
                />
              </View>

              <WeatherMap
                cityName={city ?? 'Wait'}
                temp={Math.round(temp ?? 0)}
              />
              <TouchableOpacity
                style={styles.returnToLocationBtn}
                onPress={() => {
                  setPlaceName(locationName);
                  getResponse();
                }}
              >
                <MapPinAreaIcon size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>
                  Back to your Location
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#313131',
  },
  returnToLocationBtn: {
    flexDirection: 'row',
    backgroundColor: '#0088ff',
    height: 46,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#a9d7ff',
  },
  saveBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 140,
  },
  weatherInfo: {
    width: '100%',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tempInfoContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  feelsLikeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
