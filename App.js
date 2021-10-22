import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Splash from './src/screens/Splash';
import HomeTabs from './src/screens/HomeTabs';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
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
        <Stack.Screen name="Login" component={Login} options = {{headerBackTitleVisible: false}}/>
        <Stack.Screen name="Signup" component={Signup} options = {{headerBackTitleVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
