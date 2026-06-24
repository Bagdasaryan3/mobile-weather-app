import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponseStore } from '@/src/store/useResponseStore';
import { CalendarDotsIcon } from 'phosphor-react-native';
import ForecastCard from '@/src/components/forecastCard';
import { useColorTheme } from '@/src/hooks/useColorTheme';
import { pageStyles } from '@/styles/page';

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
        <View style={pageStyles.header}>
          <View style={pageStyles.headerTextContainer}>
            <CalendarDotsIcon size={24} weight="fill" color={theme.main_text} />
            <Text
              style={{
                ...pageStyles.dateText,
                color: theme.main_text,
              }}
            >
              Forecast
            </Text>
          </View>
        </View>

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
