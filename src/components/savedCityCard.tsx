import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { XIcon } from 'phosphor-react-native';
import { useBookStore } from '../store/useBookStore';

interface ISCCProps {
  cityName: string;
  temp: number;
}

const SavedCityCard = ({ cityName, temp }: ISCCProps) => {
  const cities = useBookStore((state) => state.cities);
  const removeSaved = useBookStore((state) => state.removeSaved);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cityName}>{cityName}</Text>
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '92%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
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
    fontSize: 20,
  },
});

export default SavedCityCard;
