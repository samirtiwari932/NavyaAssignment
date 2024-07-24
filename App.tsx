import React from 'react';
import { StyleSheet } from 'react-native';
import AppContainer from './component/AppContainer';
import { color } from './component/utilis/color';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AppContainer>
      <AppNavigator />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
});
