import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import mockData from './src/data/chatRoom.mock.json';
import { useEffect } from 'react';
import { chatUtil } from './src/utils/chatUtil.ts';
import AppRouter from './src/route/appRouter.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    chatUtil.init(mockData, true);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppRouter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
