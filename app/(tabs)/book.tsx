import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Book = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image
            style={{ width: 300, height: 300, resizeMode: 'contain' }}
            source={require('../../images/work.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              padding: 6,
              textAlign: 'center',
              color: '#313131',
            }}
          >
            {`Arsen is working on this page right now :)`}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Book;
