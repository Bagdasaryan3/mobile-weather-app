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
} from 'phosphor-react-native';
import WeatherMap from '@/src/components/weatherMap';
import { weatherIconMap } from '@/src/data/icons';
import { weatherImageMap } from '@/src/data/imgs';
import { useResponseStore } from '@/src/store/useResponseStore';
import { usePlaceNameStore } from '@/src/store/usePlaceNameStore';
import UpperInfo from '@/src/components/upperInfo';
import InfoCard from '@/src/components/infoCard';

export default function Index() {
  const getResponse = useResponseStore((state) => state.getResponse);

  const placeName = usePlaceNameStore((state) => state.placeName);
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
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <IconComponent size={24} weight="fill" color="#313131" />
            <Text style={styles.dateText}>{city}</Text>
          </View>

          <TouchableOpacity
            style={styles.returnToLocationBtn}
            onPress={() => {
              setPlaceName(locationName);
              getResponse();
            }}
          >
            <MapPinAreaIcon size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: '100%',
    paddingBottom: 24,
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
    color: '#313131',
  },
  returnToLocationBtn: {
    flexDirection: 'row',
    backgroundColor: '#5d8cd8',
    height: 35,
    width: 35,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 60,
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
