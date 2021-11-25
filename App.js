import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { Router } from './src/components/Router';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <View style={styles.app}>
        <Router />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    direction: 'rtl',
  },
});
