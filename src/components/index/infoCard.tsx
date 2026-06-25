import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'phosphor-react-native';
import { useColorTheme } from '@/src/hooks/useColorTheme';
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
  const theme = useColorTheme();
  return (
    <View
      style={{
        ...styles.infoCard,
        backgroundColor: theme.card_color,
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
