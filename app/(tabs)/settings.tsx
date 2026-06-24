import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GearFineIcon } from 'phosphor-react-native';
import { useDegreeStore } from '@/src/store/useDegreeStore';
import { useResponseStore } from '@/src/store/useResponseStore';
import { useColorTheme } from '@/src/hooks/useColorTheme';

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

  const theme = useColorTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <GearFineIcon size={24} weight="regular" color={theme.main_text} />
            <Text
              style={{
                ...styles.dateText,
                color: theme.main_text,
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
                backgroundColor: theme.card_color,
                borderColor: theme.card_border_color,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.main_text,
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
                backgroundColor: theme.card_color,
                borderColor: theme.card_border_color,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.main_text,
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
