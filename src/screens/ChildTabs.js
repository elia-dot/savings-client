import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../globals/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoals } from '../redux/actions/goals';
import { finishLoading, startLoading } from '../redux/actions/globals';
import { getHour } from '../utils/getHour';
import Goals from './Goals';
import ChildScreens from './ChildScreens';

const ChildTabs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getAllGoals());
    dispatch(finishLoading());
  }, [dispatch]);

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <Text style={styles.greet}>
          {getHour()}, {user.name.split(' ')[0]}
        </Text>
        <Text style={styles.topText}>
          החיסכון שלך: {(user.saving + user.profit).toLocaleString()}
        </Text>
        {user.profit > 0 && (
          <Text style={styles.topText}>
            מתוכם: {user.profit.toLocaleString()} ריבית
          </Text>
        )}
      </View>
      <ChildScreens />
    </View>
  );
};

export default ChildTabs;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  top: {
    backgroundColor: colors.primary,
    height: 280,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
  },
  greet: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 15,
  },
  topText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 30,
  },
});
