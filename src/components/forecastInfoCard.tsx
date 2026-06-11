import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'phosphor-react-native';

interface IProps {
  WeatherIcon: Icon;
  text: string;
  infoText: string;
  color: string;
}

export default function ForecastInfoCard({
  WeatherIcon,
  text,
  infoText,
  color,
}: IProps) {
  return (
    <View style={styles.infoCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <WeatherIcon weight="fill" size={18} color={color} />
        <Text style={{ ...styles.infoCardText, color: color }}>{text}</Text>
      </View>
      <Text
        style={{
          color: color,
          fontWeight: '600',
          fontSize: 18,
        }}
      >
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
    backgroundColor: '#f4f4f4',
    height: 60,
    padding: 12,
    borderRadius: 20,
  },
  infoCardText: {
    fontSize: 16,
    fontWeight: 500,
  },
});
