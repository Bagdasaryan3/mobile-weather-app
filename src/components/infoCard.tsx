import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'phosphor-react-native';
import { useDegreeStore } from '../store/useDegreeStore';

interface IProps {
  WeatherIcon: Icon;
  text: string;
  infoText: string;
  color: string;
}

export default function InfoCard({
  WeatherIcon,
  text,
  infoText,
  color,
}: IProps) {
  const isDarkTheme = useDegreeStore((state) => state.isDarkTheme);
  return (
    <View
      style={{
        ...styles.infoCard,
        backgroundColor: isDarkTheme ? '#13151b' : '#f9f9f9',
      }}
    >
      <View style={styles.infoCardTextContainer}>
        <WeatherIcon weight="fill" size={20} color={color} />
        <Text style={{ ...styles.infoCardText, color: color }}>{text}</Text>
      </View>
      <Text style={{ ...styles.weatherInfoText, color: color }}>
        {infoText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    gap: 6,
    width: '100%',
    /*borderWidth: 1,
    borderColor: 'white',*/
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    padding: 12,
    borderRadius: 20,
  },
  infoCardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoCardText: {
    fontSize: 18,
    fontWeight: 500,
  },
  weatherInfoText: {
    fontWeight: '700',
    fontSize: 22,
  },
});
