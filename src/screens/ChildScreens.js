import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

import Goals from './Goals';
import Tasks from '../components/Tasks';
import colors from '../globals/styles/colors';
import History from '../components/History';

const Tab = createMaterialTopTabNavigator();

const ChildScreens = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const incompletedTasks = tasks.filter((task) => !task.completed);
    setTasksCount(incompletedTasks.length);
  }, [tasks]);

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
        tabBarLabelStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Tab.Screen name="מטרות" component={Goals} />
      <Tab.Screen
        name="משימות"
        component={Tasks}
        options={{
          tabBarBadge: () => (
            <View style={styles.badge}>
              <Text style={styles.badgeNumber}>{tasksCount}</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="עובר ושב" component={History} />
    </Tab.Navigator>
  );
};

export default ChildScreens;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: 6,
    end: 25,
    width: 16,
    height: 16,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  badgeNumber: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
});
