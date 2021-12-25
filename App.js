import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { isRTL } from 'expo-localization';
import AppLoading from 'expo-app-loading';

import { he, en } from './src/utils/languages';
import { Router } from './src/Router';
import store from './src/redux/store';
import registerForPushNotifications from './src/utils/registerForPushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

i18n.fallbacks = true;
i18n.translations = { en, he };
i18n.locale =
  Localization.locale.search(/-|_/) !== -1
    ? Localization.locale.slice(0, 2)
    : Localization.locale;

const currentLocale = i18n.currentLocale();

I18nManager.allowRTL(isRTL);

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotifications().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  if (!isReady) {
    <AppLoading />;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar />
        <View style={styles.app}>
          <Router isRTL={isRTL} />
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
