import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponseStore } from '@/src/store/useResponseStore';
import { CalendarDotsIcon } from 'phosphor-react-native';
import ForecastCard from '@/src/components/forecast/forecastCard';
import { useColorTheme } from '@/src/hooks/useColorTheme';
import { pageStyles } from '@/styles/page';
import Header from '@/src/components/header';

const Forecast = () => {
  const forecastList = useResponseStore((state) => state.response?.list);
  const theme = useColorTheme();

  return (
    <View
      style={{
        ...pageStyles.container,
        backgroundColor: theme.screen,
      }}
    >
      <SafeAreaView edges={['top']}>
        <Header IconComponent={CalendarDotsIcon} screenName="Forecast" />

        <View
          style={{
            ...pageStyles.contentContainer,
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

export default Forecast;
