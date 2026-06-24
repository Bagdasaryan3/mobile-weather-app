import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponseStore } from '@/src/store/useResponseStore';
import { CalendarDotsIcon } from 'phosphor-react-native';
import ForecastCard from '@/src/components/forecastCard';
import { useColorTheme } from '@/src/hooks/useColorTheme';

const Forecast = () => {
  const forecastList = useResponseStore((state) => state.response?.list);
  const theme = useColorTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.screen,
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <CalendarDotsIcon size={24} weight="fill" color={theme.main_text} />
            <Text
              style={{
                ...styles.dateText,
                color: theme.main_text,
              }}
            >
              Forecast
            </Text>
          </View>
        </View>

        <View
          style={{
            ...styles.forecastContainer,
            backgroundColor: theme.background,
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
