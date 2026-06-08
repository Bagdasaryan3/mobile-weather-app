import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Forecast = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View>
          <Text style={styles.dateText}>Forecast</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: '100%',
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#313131',
  },
  weatherContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 60,
  },
  map: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperInfo: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#FAFAFA',
  },
  upperInfoMainText: {
    fontSize: 24,
    fontWeight: 500,
    color: '#313131',
  },
  upperInfoDescText: {
    fontSize: 16,
    color: '#848484',
  },
  weatherInfo: {
    width: '100%',
    /*backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'white',*/
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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

export default Forecast;
