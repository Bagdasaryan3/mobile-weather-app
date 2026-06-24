import { themes } from '../themes/theme';
import { useSettingsStore } from '../store/useSettingsStore';

const useColorTheme = () => {
  const isDarkTheme = useSettingsStore((state) => state.isDarkTheme);
  return isDarkTheme ? themes.dark : themes.light;
};

export { useColorTheme };
