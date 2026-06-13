import { View, Text, Image, StyleSheet } from 'react-native';
import type { WeatherForecastItem } from '../types/datacontext.types';
import { weatherImageMap } from '../data/imgs';
import { weatherIconMap } from '../data/icons';
import {
  ClockIcon,
  WindIcon,
  DropHalfIcon,
  CloudWarningIcon,
} from 'phosphor-react-native';
import { PersonSimpleSwimIcon } from 'phosphor-react-native';
import ForecastInfoCard from './forecastInfoCard';

const ForecastCard = (props: WeatherForecastItem) => {
  const { main, weather, wind, dt_txt } = props;

  const WeatherImage =
    weatherImageMap[weather[0].icon as keyof typeof weatherImageMap] ||
    require('../../images/err.png');

  const IconComponent =
    weatherIconMap[weather[0].icon as keyof typeof weatherIconMap] ||
    CloudWarningIcon;

  return (
    <View style={styles.card}>
      <View style={styles.forecastDate}>
        <ClockIcon size={18} color="#172c3d" weight="bold" />
        <Text style={styles.forecastDateText}>{dt_txt}</Text>
      </View>

      <View style={styles.weatherInfo}>
        <View style={styles.mainDescription}>
          <IconComponent size={20} weight="fill" color="#313131" />
          <Text style={styles.mainDescriptionText}>{weather[0].main}</Text>
        </View>

        <Text style={styles.description}>{weather[0].description}</Text>
      </View>

      <View style={styles.tempInfoContainer}>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 44,
              color: main.temp > 0 ? '#B65050' : '#5074B6',
            }}
          >{`${Math.round(main.temp)}°`}</Text>

          <View style={styles.feelsLikeContainer}>
            <PersonSimpleSwimIcon
              weight="regular"
              size={18}
              color={
                typeof main.temp === 'number' && main.temp > 0
                  ? '#cc9797'
                  : '#97a8cc'
              }
            />
            <Text
              style={{
                fontSize: 14,
                color: main.temp > 0 ? '#cc9797' : '#97a8cc',
              }}
            >{`Feels Like ${Math.round(main.feels_like)}°`}</Text>
          </View>
        </View>
        <Image source={WeatherImage} style={styles.weatherImage} />
      </View>

      <ForecastInfoCard
        WeatherIcon={DropHalfIcon}
        text="Humidity"
        infoText={`${main.humidity}%`}
        color="#6C78B3"
      />
      <ForecastInfoCard
        WeatherIcon={WindIcon}
        text="Wind Speed"
        infoText={`${wind.speed} m/h`}
        color="#6ca8b3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    marginBottom: 20,
    gap: 12,
  },

  forecastDate: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  forecastDateText: {
    color: '#172c3d',
    fontWeight: 600,
    fontSize: 18,
  },

  weatherInfo: {
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
  },
  mainDescription: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  mainDescriptionText: {
    fontSize: 20,
    fontWeight: 500,
    color: '#313131',
  },
  description: {
    fontSize: 15,
    color: '#848484',
  },

  tempInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feelsLikeContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  weatherImage: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
});

export default ForecastCard;
