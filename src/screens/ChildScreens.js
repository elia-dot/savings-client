import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Goals from './Goals';
import Tasks from '../components/Tasks';
import colors from '../globals/styles/colors';
import History from '../components/History';

const Tab = createMaterialTopTabNavigator();

const ChildScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0.5,
          borderTopColor: colors.secondary,
          direction: 'ltr',
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarIndicatorStyle: { backgroundColor: colors.secondary },
        tabBarLabelStyle: {fontWeight: '700', fontSize: 18}
      }}
    >
      <Tab.Screen name="מטרות" component={Goals} />
      <Tab.Screen name="משימות" component={Tasks} />
      <Tab.Screen name="עובר ושב" component={History} />
    </Tab.Navigator>
  );
};

export default ChildScreens;

const styles = StyleSheet.create({});
