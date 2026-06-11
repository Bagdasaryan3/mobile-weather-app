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
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <ClockIcon size={18} color="#172c3d" weight="bold" />
        <Text style={{ color: '#172c3d', fontWeight: 600, fontSize: 18 }}>
          {dt_txt}
        </Text>
      </View>

      <View
        style={{
          gap: 6,
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 12,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <IconComponent size={20} weight="fill" color="#313131" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: '#313131',
            }}
          >
            {weather[0].main}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: '#848484',
          }}
        >
          {weather[0].description}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 44,
              color: main.temp > 0 ? '#B65050' : '#5074B6',
            }}
          >{`${Math.round(main.temp)}°`}</Text>

          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
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
        <Image
          source={WeatherImage}
          style={{ height: 120, width: 120, resizeMode: 'contain' }}
        />
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

/**    
            <Text>{weather[0].main}</Text>
      <Text>{weather[0].description}</Text>*/

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
});

export default ForecastCard;
