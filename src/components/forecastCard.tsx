import { View, Text, StyleSheet } from 'react-native';
import type { WeatherForecastItem } from '../types/datacontext.types';

const ForecastCard = (props: WeatherForecastItem) => {
  const { main, weather, wind, dt_txt } = props;
  return (
    <View style={styles.card}>
      <Text>{dt_txt}</Text>
      <Text>{weather[0].main}</Text>
      <Text>{weather[0].description}</Text>
      <Text>{`${Math.round(main.temp)}°`}</Text>
      <Text>{`Feels Like ${Math.round(main.feels_like)}°`}</Text>
      <Text>{`Humidity ${main.humidity}%`}</Text>
      <Text>{`Wind Speed ${wind.speed} m/h`}</Text>
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
    marginBottom: 12,
  },
});

export default ForecastCard;
