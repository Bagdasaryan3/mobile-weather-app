import { View, Text, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GearFineIcon } from 'phosphor-react-native';
import { useDegreeStore } from '@/src/store/useDegreeStore';
import { useResponseStore } from '@/src/store/useResponseStore';

const Settings = () => {
  const showIn = useDegreeStore((state) => state.showIn);
  const toggleShowIn = useDegreeStore((state) => state.toggleShowIn);
  const getResponse = useResponseStore((state) => state.getResponse);

  const toggleSetting = () => {
    toggleShowIn();
    getResponse();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <GearFineIcon size={24} weight="regular" color="#313131" />
            <Text style={styles.dateText}>Settings</Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fafafa',
              borderWidth: 1,
              borderColor: 'white',
              padding: 12,
              borderRadius: 18,
            }}
          >
            <Text style={{ fontSize: 18 }}>Show in Fahrenheits</Text>

            <Switch value={showIn} onValueChange={toggleSetting} />
          </View>
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
});

export default Settings;
