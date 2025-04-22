import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { COLORS } from './src/utils/colors';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Bỏ qua một số cảnh báo không cần thiết
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;