import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponseStore } from '@/src/store/useResponseStore';
import { CalendarDotsIcon } from 'phosphor-react-native';
import ForecastCard from '@/src/components/forecastCard';
import { useState } from 'react';

const Forecast = () => {
  const cityName = useResponseStore((state) => state.response?.city.name);
  const forecastList = useResponseStore((state) => state.response?.list);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <CalendarDotsIcon size={24} weight="fill" color="#313131" />
            <Text style={styles.dateText}>{`Forecast for ${cityName}`}</Text>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <FlatList
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            data={forecastList}
            renderItem={({ item }) => (
              <ForecastCard
                dt={item.dt}
                main={item.main}
                weather={item.weather}
                clouds={item.clouds}
                wind={item.wind}
                visibility={item.visibility}
                pop={item.pop}
                sys={item.sys}
                dt_txt={item.dt_txt}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

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
  dateText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#313131',
  },
  forecastContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 80,
  },
});

export default Forecast;
