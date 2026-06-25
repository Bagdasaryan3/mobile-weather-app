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
import WeatherMap from '@/src/components/index/weatherMap';
import { weatherIconMap } from '@/src/data/icons';
import { weatherImageMap } from '@/src/data/imgs';
import { useResponseStore } from '@/src/store/useResponseStore';
import { usePlaceNameStore } from '@/src/store/usePlaceNameStore';
import { useSettingsStore } from '@/src/store/useSettingsStore';
import UpperInfo from '@/src/components/index/upperInfo';
import InfoCard from '@/src/components/index/infoCard';
import Mock from '@/src/components/mock';
import { StatusBar } from 'react-native';
import { useColorTheme } from '@/src/hooks/useColorTheme';
import { pageStyles } from '@/styles/page';
import Header from '@/src/components/header';

export default function Index() {
  const isDarkTheme = useSettingsStore((state) => state.isDarkTheme);
  const theme = useColorTheme();

  const response = useResponseStore();
  const place = usePlaceNameStore();

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
    place.getLocation();
  }, []);

  useEffect(() => {
    response.getResponse();
  }, [place.locationName]);

  return (
    <View
      style={{
        ...pageStyles.container,
        backgroundColor: theme.screen,
      }}
    >
      <SafeAreaView edges={['top']}>
        <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />

        <Header
          IconComponent={IconComponent}
          screenName={city}
          isIndex={true}
        />

        {response.responseStatus ? (
          <Mock />
        ) : (
          <ScrollView
            style={{ backgroundColor: theme.background }}
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
                  place.setPlaceName(place.locationName);
                  response.getResponse();
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
  returnToLocationBtn: {
    flexDirection: 'row',
    backgroundColor: '#0088ff',
    height: 46,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
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
