import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../globals/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoals } from '../redux/actions/goals';
import { getTasks } from '../redux/actions/tasks';
import { finishLoading, startLoading } from '../redux/actions/globals';
import { getHour } from '../utils/getHour';
import ChildScreens from './ChildScreens';
import currency from '../globals/styles/currency';

const ChildTabs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getAllGoals());
    dispatch(getTasks(user._id));
    dispatch(finishLoading());
  }, [dispatch]);

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <Text style={styles.greet}>
          {getHour()}, {user.name.split(' ')[0]}
        </Text>
        <Text style={styles.topText}>
          עד עכשיו חסכת {(user.saving + user.profit).toLocaleString()}
          {currency.NIS}
        </Text>
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
    height: 250,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
    zIndex: -99,
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
