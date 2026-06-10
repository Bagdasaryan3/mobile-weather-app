import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'phosphor-react-native';

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
  return (
    <View style={styles.infoCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <WeatherIcon weight="fill" size={20} color={color} />
        <Text style={{ ...styles.infoCardText, color: color }}>{text}</Text>
      </View>
      <Text
        style={{
          color: color,
          fontWeight: '700',
          fontSize: 22,
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
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    height: 70,
    padding: 12,
    borderRadius: 20,
  },
  infoCardText: {
    fontSize: 18,
    fontWeight: 500,
  },
});
