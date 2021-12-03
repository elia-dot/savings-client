import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { Router } from './src/components/Router';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar />
        <View style={styles.app}>
          <Router />
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    direction: 'rtl',
  },
});
