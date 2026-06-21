import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { usePlaceNameStore } from '../store/usePlaceNameStore';
import { BookmarkSimpleIcon } from 'phosphor-react-native';
import { useResponseStore } from '../store/useResponseStore';
import { MagnifyingGlassIcon } from 'phosphor-react-native';
import { useBookStore } from '../store/useBookStore';

export default function UpperInfo() {
  const placeNameText = usePlaceNameStore((state) => state.placeNameText);
  const setPlaceNameText = usePlaceNameStore((state) => state.setPlaceNameText);
  const setPlaceName = usePlaceNameStore((state) => state.setPlaceName);
  const setLastPlaceName = usePlaceNameStore((state) => state.setLastPlaceName);
  const getResponse = useResponseStore((state) => state.getResponse);
  const main = useResponseStore(
    (state) => state.response?.list[0].weather[0].main,
  );
  const condition = useResponseStore(
    (state) => state.response?.list[0].weather[0].description,
  );

  const submitCity = () => {
    setPlaceName(placeNameText);
    setLastPlaceName(placeNameText);
    getResponse();
    setPlaceNameText('');
  };

  return (
    <View style={styles.upperInfo}>
      <View style={styles.placeSearchField}>
        <TextInput
          style={styles.placeSearchTextInput}
          placeholder="Enter place name"
          onChangeText={(text) => setPlaceNameText(text)}
          value={placeNameText}
        />
        <TouchableOpacity onPress={submitCity} style={styles.searchButton}>
          <MagnifyingGlassIcon size={22} color="#0088ff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={styles.upperInfoMainText}>{main}</Text>

          <Text style={styles.upperInfoDescText}>{condition}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  upperInfo: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    gap: 4,

    backgroundColor: '#f9f9f9',
  },

  placeSearchField: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  placeSearchTextInput: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 8,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
});
