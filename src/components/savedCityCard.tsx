import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { XIcon } from 'phosphor-react-native';
import { useBookStore } from '../store/useBookStore';
import { weatherIconMap } from '../data/icons';
import { CloudWarningIcon } from 'phosphor-react-native';
import { useColorTheme } from '../hooks/useColorTheme';
interface ISCCProps {
  cityName: string;
  temp: number;
  icon: string;
}

const SavedCityCard = ({ cityName, temp, icon }: ISCCProps) => {
  const removeSaved = useBookStore((state) => state.removeSaved);

  const IconComponent =
    weatherIconMap[icon as keyof typeof weatherIconMap] || CloudWarningIcon;

  const theme = useColorTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.card_color,
        borderColor: theme.card_border_color,
      }}
    >
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <IconComponent size={20} weight="fill" color={theme.main_text} />
          <Text
            style={{
              ...styles.cityName,
              color: theme.main_text,
            }}
          >
            {cityName}
          </Text>
        </View>
        <Text
          style={{
            ...styles.temp,
            color: temp > 0 ? '#B65050' : '#5074B6',
          }}
        >
          {Math.floor(temp)}°
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeSaved(cityName)}>
        <XIcon size={16} weight="bold" color="#969696" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  card: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 20,
    fontWeight: 400,
    color: '#313131',
  },
  temp: {
    fontSize: 22,
    fontWeight: 500,
  },
});

export default SavedCityCard;
