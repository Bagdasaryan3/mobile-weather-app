import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
  temp: number;
}

export default function WeatherMap({
  latitude,
  longitude,
  cityName,
  temp,
}: WeatherMapProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //scrollEnabled={false}
        // Регион определяет, какая область земли сейчас показана на экране
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.8, // Отвечает за масштаб (выше число — дальше зум)
          longitudeDelta: 0.1,
        }}
      >
        {/* Ставим маркер на сам город */}
        <Marker
          coordinate={{ latitude, longitude }}
          title={cityName}
          description={`${temp}C`}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%', // Выделяем фиксированную область под карту на экране
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
