import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GearFineIcon } from 'phosphor-react-native';
import { useDegreeStore } from '@/src/store/useDegreeStore';
import { useResponseStore } from '@/src/store/useResponseStore';

const Settings = () => {
  const showIn = useDegreeStore((state) => state.showIn);
  const toggleShowIn = useDegreeStore((state) => state.toggleShowIn);

  const isDarkTheme = useDegreeStore((state) => state.isDarkTheme);
  const toggleTheme = useDegreeStore((state) => state.toggleTheme);

  const getResponse = useResponseStore((state) => state.getResponse);

  const toggleSetting = () => {
    toggleShowIn();
    getResponse();
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkTheme ? '#101217' : '#f4f4f4',
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <GearFineIcon
              size={24}
              weight="regular"
              color={isDarkTheme ? '#E8EEFF' : '#313131'}
            />
            <Text
              style={{
                ...styles.dateText,
                color: isDarkTheme ? '#E8EEFF' : '#313131',
              }}
            >
              Settings
            </Text>
          </View>
        </View>

        <ScrollView style={{ width: '100%', height: '100%' }}>
          <View>
            <View
              style={{
                ...styles.settingItem,
                backgroundColor: isDarkTheme ? '#171921' : '#fafafa',
                borderColor: isDarkTheme ? '#1B1D25' : 'white',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: isDarkTheme ? '#E8EEFF' : '#313131',
                }}
              >
                Show in Fahrenheits
              </Text>
              <Switch value={showIn} onValueChange={toggleSetting} />
            </View>
          </View>

          <View>
            <View
              style={{
                ...styles.settingItem,
                backgroundColor: isDarkTheme ? '#171921' : '#fafafa',
                borderColor: isDarkTheme ? '#1B1D25' : 'white',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: isDarkTheme ? '#E8EEFF' : '#313131',
                }}
              >
                Dark theme
              </Text>
              <Switch value={isDarkTheme} onValueChange={toggleTheme} />
            </View>
          </View>
        </ScrollView>
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
    alignItems: 'center',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dateText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#313131',
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 12,
    borderRadius: 18,
    marginBottom: 14,
  },
});

export default Settings;
