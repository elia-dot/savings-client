import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Splash from '../screens/Splash';
import HomeTabs from '../screens/HomeTabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import { useAuth } from '../context/authContext';

const Stack = createStackNavigator();

export const Router = () => {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer >
      {isAuth ? (
        <Stack.Navigator initialRouteName = "HomeTabs">
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerShown: false,
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName = "Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerBackTitleVisible: false, title: 'Log In' }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerBackTitleVisible: false, title: 'Sign Up' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
