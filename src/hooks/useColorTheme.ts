import { themes } from '../themes/theme';
import { useDegreeStore } from '../store/useDegreeStore';

const useColorTheme = () => {
  const isDarkTheme = useDegreeStore((state) => state.isDarkTheme);
  return isDarkTheme ? themes.dark : themes.light;
};

export { useColorTheme };
