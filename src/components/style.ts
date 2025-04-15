import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e53935',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 26,
  },
  condition: {
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
