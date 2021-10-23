import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import Splash from './src/screens/Splash';
import HomeTabs from './src/screens/HomeTabs';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import {Store} from './src/redux/store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store = {Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="Login" component={Login} options = {{headerBackTitleVisible: false, title: 'Log In'}}/>
        <Stack.Screen name="Signup" component={Signup} options = {{headerBackTitleVisible: false, title: 'Sign Up'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
