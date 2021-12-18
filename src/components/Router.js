import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import i18n from 'i18n-js';

import Splash from '../screens/Splash';
import ParentTabs from '../screens/ParentTabs';
import ParentScreens from '../screens/ParentScreens';
import ChildTabs from '../screens/ChildTabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { loadUser } from '../redux/actions/auth';
import GoBackButton from '../globals/components/GoBackButton';
import ChildrenDetails from '../screens/ChildrenDetails';
import ForgotPassword from '../screens/ForgotPassword';

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
            name="ChildrenDetails"
            component={ChildrenDetails}
            options={{
              headerBackTitleVisible: false,
              headerTitle: '',
              headerLeft: () => <GoBackButton />,
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
              title: i18n.t('loginScreen.title'),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="forgot password"
            component={ForgotPassword}
            options={{
              headerBackTitleVisible: false,
              title: 'שחזור סיסמא',
              headerTitleAlign: 'center',
              headerLeft: () => <GoBackButton />,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerBackTitleVisible: false,
              title: i18n.t('signupScreen.title'),
              headerTitleAlign: 'center',
              headerLeft: () => <GoBackButton />,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
