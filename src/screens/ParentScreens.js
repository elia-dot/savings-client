import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import I18n from 'i18n-js'

import colors from '../globals/styles/colors';
import Goals from './Goals';
import History from '../components/History';
import Tasks from '../components/Tasks';
import { finishLoading, startLoading } from '../redux/actions/globals';
import { getChild } from '../redux/actions/auth';
import Loader from '../globals/components/Loader';
import { getAllGoals } from '../redux/actions/goals';
import { getHistory } from '../redux/actions/savings';
import { getTasks } from '../redux/actions/tasks';

const Tab = createBottomTabNavigator();

const ParentScreens = ({ route }) => {
  const dispatch = useDispatch();
  const { child } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.globals);

  useEffect(() => {
    const getChildData = async () => {
      dispatch(startLoading());
      await dispatch(getChild(route.params.userId));
      dispatch(finishLoading());
    };
    getChildData();
  }, []);

  useEffect(() => {
    if (child) {
      dispatch(getAllGoals(child._id));
      dispatch(getHistory(child._id));
      dispatch(getTasks(child._id));
    }
  }, [child]);

  if (loading) return <Loader title={'טוען מידע..'} />;
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === I18n.t('goals.title')) {
            iconName = 'bullseye';
            size = focused ? 25 : 20;
          } else if (route.name ===  I18n.t('history.title')) {
            iconName = 'exchange-alt';
            size = focused ? 25 : 20;
          } else if (route.name === 'משימות') {
            iconName = 'tasks';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={I18n.t('goals.title')}
        component={Goals}
        initialParams={{ userId: route.params.userId, user: child }}
        options={{ headerShown: false, headerLeft: () => null }}
      />
      <Tab.Screen
        name={ I18n.t('history.title')}
        component={History}
        initialParams={{ userId: route.params.userId, user: child }}
        options={{ headerShown: false, headerLeft: () => null }}
      />
      <Tab.Screen
        name="משימות"
        component={Tasks}
        initialParams={{ userId: route.params.userId, user: child }}
        options={{ headerShown: false, headerLeft: () => null }}
      />
    </Tab.Navigator>
  );
};

export default ParentScreens;

const styles = StyleSheet.create({});
