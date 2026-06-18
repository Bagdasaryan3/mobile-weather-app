import { View, StyleSheet } from 'react-native';

const Mock = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    gap: 8,
  },
  card: {
    height: 250,
    width: '100%',
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
  },
});

export default Mock;
