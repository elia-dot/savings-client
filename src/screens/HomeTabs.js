import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Goals from './Goals';
import Savings from './Savings';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#9cc95a',
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Goals') {
            iconName = 'bullseye';
            size = focused ? 25 : 20;
          } else if (route.name === 'Savings') {
            iconName = 'piggy-bank';
            size = focused ? 25 : 20;
          } else if (route.name === 'Settings') {
            iconName = 'cog';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Savings" component={Savings} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
}
