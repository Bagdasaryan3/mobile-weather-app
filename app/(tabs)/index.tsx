import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
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
  MagnifyingGlassIcon,
} from 'phosphor-react-native';
import WeatherMap from '@/src/components/weatherMap';
import { weatherIconMap } from '@/src/components/icons';
import { weatherImageMap } from '@/src/components/imgs';
import { useResponseStore } from '@/src/store/useResponseStore';
import { usePlaceNameStore } from '@/src/store/usePlaceNameStore';

export default function Index() {
  const placeNameText = usePlaceNameStore((state) => state.placeNameText);
  const setPlaceNameText = usePlaceNameStore((state) => state.setPlaceNameText);
  const placeName = usePlaceNameStore((state) => state.placeName);
  const setPlaceName = usePlaceNameStore((state) => state.setPlaceName);
  const setLastPlaceName = usePlaceNameStore((state) => state.setLastPlaceName);

  const getResponse = useResponseStore((state) => state.getResponse);

  const city = useResponseStore((state) => state.response?.city.name);
  const temp = useResponseStore((state) => state.response?.list[0].main.temp);
  const feelsLike = useResponseStore(
    (state) => state.response?.list[0].main.feels_like,
  );
  const humidity = useResponseStore(
    (state) => state.response?.list[0].main.humidity,
  );
  const main = useResponseStore(
    (state) => state.response?.list[0].weather[0].main,
  );
  const condition = useResponseStore(
    (state) => state.response?.list[0].weather[0].description,
  );
  const wind = useResponseStore((state) => state.response?.list[0].wind.speed);
  const iconId = useResponseStore(
    (state) => state.response?.list[0].weather[0].icon,
  );
  const lat = useResponseStore((state) => state.response?.city.coord.lat);
  const lon = useResponseStore((state) => state.response?.city.coord.lon);

  const IconComponent =
    weatherIconMap[iconId as keyof typeof weatherIconMap] || CloudWarningIcon;
  const WeatherImage =
    weatherImageMap[iconId as keyof typeof weatherImageMap] ||
    require('../../images/err.png');

  const submitCity = () => {
    setPlaceName(placeNameText);
    setLastPlaceName(placeNameText);
    getResponse();
    setPlaceNameText('');
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <IconComponent size={24} weight="fill" color="#313131" />
            <Text style={styles.dateText}>{city}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.weatherContainer}>
            <View style={styles.upperInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={{
                    width: '90%',
                    backgroundColor: '#f2f2f2',
                    borderRadius: 20,
                    padding: 8,
                  }}
                  placeholder="Enter place name"
                  onChangeText={(text) => setPlaceNameText(text)}
                  value={placeNameText}
                />
                <TouchableOpacity
                  onPress={submitCity}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}
                >
                  <MagnifyingGlassIcon size={22} color="#0088ff" />
                </TouchableOpacity>
              </View>

              <Text style={styles.upperInfoMainText}>{main}</Text>

              <Text style={styles.upperInfoDescText}>{condition}</Text>
            </View>

            <View style={styles.weatherInfo}>
              <View style={{ gap: 10 }}>
                <View
                  style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}
                >
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
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <PersonSimpleSwimIcon
                      weight="regular"
                      size={20}
                      color="#cc9797"
                    />
                    <Text style={{ fontSize: 16, color: '#cc9797' }}>
                      Feels like
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#cc9797',
                      fontWeight: '500',
                      fontSize: 20,
                    }}
                  >
                    {`${Math.round(feelsLike ?? 0)} C`}
                  </Text>
                </View>
              </View>
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={WeatherImage}
              />
            </View>

            <View style={{ gap: 12, width: '100%' }}>
              <View style={styles.infoCard}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <DropHalfIcon weight="fill" size={20} color="#6C78B3" />
                  <Text style={{ ...styles.infoCardText, color: '#6C78B3' }}>
                    Humidity
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#6C78B3',
                    fontWeight: '700',
                    fontSize: 22,
                  }}
                >
                  {humidity ?? 0}%
                </Text>
              </View>

              <View style={styles.infoCard}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <WindIcon weight="fill" size={20} color="#6ca8b3" />
                  <Text style={{ ...styles.infoCardText, color: '#6ca8b3' }}>
                    Wind Speed
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#6ca8b3',
                    fontWeight: '700',
                    fontSize: 22,
                  }}
                >
                  {wind ?? 0} km/h
                </Text>
              </View>
            </View>

            <View style={styles.map}>
              <WeatherMap
                latitude={lat ?? 0}
                longitude={lon ?? 0}
                cityName={city ?? 'Wait'}
                temp={Math.round(temp ?? 0)}
              />
            </View>
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
  },
  dateText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#313131',
  },
  weatherContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 60,
  },
  map: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperInfo: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#FAFAFA',
  },
  upperInfoMainText: {
    fontSize: 24,
    fontWeight: 500,
    color: '#313131',
  },
  upperInfoDescText: {
    fontSize: 16,
    color: '#848484',
  },
  weatherInfo: {
    width: '100%',
    /*backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'white',*/
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCard: {
    gap: 6,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    height: 70,
    padding: 12,
    borderRadius: 20,
  },
  infoCardText: {
    fontSize: 18,
    fontWeight: 500,
  },
});
