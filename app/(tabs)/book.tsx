import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Book = () => {
  return (
    <View>
      <SafeAreaView edges={['top']}>
        <Text>Book</Text>
      </SafeAreaView>
    </View>
  );
};

export default Book;
