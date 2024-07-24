import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}
const AppContainer = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
