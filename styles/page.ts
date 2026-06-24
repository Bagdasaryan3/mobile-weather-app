import { StyleSheet } from 'react-native';

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 20,
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
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 130,
  },
});

export { pageStyles };
