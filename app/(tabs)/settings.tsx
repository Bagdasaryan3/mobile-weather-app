import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GearFineIcon } from 'phosphor-react-native';
import { useSettingsStore } from '@/src/store/useSettingsStore';
import { useResponseStore } from '@/src/store/useResponseStore';
import { useColorTheme } from '@/src/hooks/useColorTheme';
import { pageStyles } from '@/styles/page';

const Settings = () => {
  const settings = useSettingsStore();

  const getResponse = useResponseStore((state) => state.getResponse);

  const toggleSetting = () => {
    settings.toggleShowIn();
    getResponse();
  };

  const theme = useColorTheme();

  return (
    <View
      style={{
        ...pageStyles.container,
        backgroundColor: theme.background,
      }}
    >
      <SafeAreaView edges={['top']}>
        <View style={pageStyles.header}>
          <View style={pageStyles.headerTextContainer}>
            <GearFineIcon size={24} weight="regular" color={theme.main_text} />
            <Text
              style={{
                ...pageStyles.dateText,
                color: theme.main_text,
              }}
            >
              Settings
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ width: '100%', height: '100%', paddingHorizontal: 20 }}
        >
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
              <Switch value={settings.showIn} onValueChange={toggleSetting} />
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
              <Switch
                value={settings.isDarkTheme}
                onValueChange={settings.toggleTheme}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
