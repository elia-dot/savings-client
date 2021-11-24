import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Goals from './Goals';
import Tasks from '../components/Tasks';
import colors from '../globals/styles/colors';

const Tab = createMaterialTopTabNavigator();

const ChildScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0.5,
          borderTopColor: colors.secondary,
        },
        tabBarActiveTintColor: colors.secondary,
      }}
    >
      <Tab.Screen name="מטרות" component={Goals} />
      <Tab.Screen name="מטלות" component={Tasks} />
    </Tab.Navigator>
  );
};

export default ChildScreens;

const styles = StyleSheet.create({});
