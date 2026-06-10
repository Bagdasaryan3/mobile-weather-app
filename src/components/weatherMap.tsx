import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useResponseStore } from '../store/useResponseStore';

interface WeatherMapProps {
  cityName: string;
  temp: number;
}

export default function WeatherMap({ cityName, temp }: WeatherMapProps) {
  const lat = useResponseStore((state) => state.response?.city.coord.lat);
  const lon = useResponseStore((state) => state.response?.city.coord.lon);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={{
          latitude: lat ?? 0,
          longitude: lon ?? 0,
          latitudeDelta: 0.8,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{ latitude: lat ?? 0, longitude: lon ?? 0 }}
          title={cityName}
          description={`${temp}C`}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 450,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
