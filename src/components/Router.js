import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import Splash from '../screens/Splash';
import ParentTabs from '../screens/ParentTabs';
import ParentScreens from '../screens/ParentScreens';
import ChildTabs from '../screens/ChildTabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { loadUser } from '../redux/actions/auth';
import GoBackButton from '../globals/components/GoBackButton';

const Stack = createStackNavigator();

export const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {isAuthenticated && user.type === 'parent' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="ParentTabs"
            component={ParentTabs}
            options={{
              headerShown: false,
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="ParentScreens"
            component={ParentScreens}
            options={{
              headerBackTitleVisible: false,
              headerTitle: '',
              headerLeft: () => <GoBackButton />,
            }}
          />
        </Stack.Navigator>
      ) : isAuthenticated && user.type === 'child' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabs"
            component={ChildTabs}
            options={{
              headerShown: false,
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackTitleVisible: false,
              title: 'התחברות',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerBackTitleVisible: false,
              title: 'הרשמה',
              headerTitleAlign: 'center',
              headerLeft: () => <GoBackButton />,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
