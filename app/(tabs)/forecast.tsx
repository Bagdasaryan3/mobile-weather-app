import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponseStore } from '@/src/store/useResponseStore';
import { CalendarDotsIcon } from 'phosphor-react-native';
import ForecastCard from '@/src/components/forecastCard';
import { useDegreeStore } from '@/src/store/useDegreeStore';

const Forecast = () => {
  const forecastList = useResponseStore((state) => state.response?.list);
  const isDarkTheme = useDegreeStore((state) => state.isDarkTheme);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkTheme ? '#1b1e27' : '#fafafa',
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <CalendarDotsIcon
              size={24}
              weight="fill"
              color={isDarkTheme ? '#E8EEFF' : '#313131'}
            />
            <Text
              style={{
                ...styles.dateText,
                color: isDarkTheme ? '#E8EEFF' : '#313131',
              }}
            >
              Forecast
            </Text>
          </View>
        </View>

        <View
          style={{
            ...styles.forecastContainer,
            backgroundColor: isDarkTheme ? '#101217' : '#f4f4f4',
          }}
        >
          <FlatList
            style={{ width: '100%', padding: 20 }}
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
  },
  header: {
    width: '100%',
    padding: 20,
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
  forecastContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 130,
  },
});

export default Forecast;
