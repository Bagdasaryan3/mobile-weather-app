import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'phosphor-react-native';
import { pageStyles } from '@/styles/page';
import { useColorTheme } from '../hooks/useColorTheme';
import { useBookStore } from '../store/useBookStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { BookmarkSimpleIcon } from 'phosphor-react-native';

interface IHeader {
  IconComponent: Icon;
  screenName: string | undefined;
  isIndex?: boolean;
}

const Header = ({ IconComponent, screenName, isIndex = false }: IHeader) => {
  const isDarkTheme = useSettingsStore((state) => state.isDarkTheme);
  const theme = useColorTheme();
  const books = useBookStore();

  /*let city: string | undefined;
  if (isIndex) {
    city = useResponseStore((state) => state.response?.city.name);
  }*/

  return (
    <View style={pageStyles.header}>
      <View style={pageStyles.headerTextContainer}>
        <IconComponent size={24} weight="fill" color={theme.main_text} />
        <Text
          style={{
            ...pageStyles.dateText,
            color: theme.main_text,
          }}
        >
          {screenName}
        </Text>
      </View>

      {isIndex && (
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => books.toggleSavedCity(screenName ?? '')}
        >
          <BookmarkSimpleIcon
            size={28}
            weight="fill"
            color={
              books.cities.some((item) => item === screenName)
                ? '#ebce4f'
                : isDarkTheme
                  ? '#33394a'
                  : '#c9c9c9'
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
