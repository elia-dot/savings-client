import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';

import { capitalize } from '../utils/capitalize';
import GoalForm from './GoalForm';
import colors from '../globals/styles/colors';
import { deleteGoal } from '../redux/actions/goals';
import Loader from '../globals/components/Loader';
import { startLoading, finishLoading } from '../redux/actions/globals';
import i18n from 'i18n-js';
import { isRTL } from 'expo-localization';

export default function Goal({ goal, user }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const calculateProgress = () => {
    if ((user.savings * 1) / (goal.price * 1) >= 1) return 1;
    return (user.saving * 1) / (goal.price * 1);
  };

  const moneyLeft = () => {
    if (goal.price - (user.saving + user.profit) < 0)
      return i18n.t('goals.completed');
    return i18n.t('goals.amountLeft', {
      amount: (goal.price - (user.saving + user.profit)).toLocaleString(),
    });
  };

  const progress = calculateProgress();

  const confirmDelete = () => {
    Alert.alert(i18n.t('goals.deleteTitle'), i18n.t('goals.deleteText'), [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => handleDelete() },
    ]);
  };

  const handleDelete = async () => {
    dispatch(startLoading());
    await dispatch(deleteGoal(goal._id));
    dispatch(finishLoading());
  };

  const updateGoal = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} goal={goal} />
      <Loader title={i18n.t('goals.deletingGoal')} />
      <View style={styles.goalDetails}>
        <View style={styles.goalName}>
          <View style={styles.icon}>
            <FontAwesome5
              name={goal.icon ? goal.icon : 'question'}
              color={colors.primary}
              size={20}
            />
          </View>
          <View>
            <Text style={styles.goalTitle}>{capitalize(goal.title)}</Text>
            <Text>{moneyLeft()}</Text>
          </View>
        </View>
        <View>
          <View style={styles.goalsActions}>
            <FontAwesome5
              name="pen"
              color={colors.primary}
              size={20}
              onPress={updateGoal}
            />
            <FontAwesome5
              name="trash"
              color={colors.primary}
              size={20}
              style={{ marginLeft: 15 }}
              onPress={confirmDelete}
            />
          </View>
        </View>
      </View>
      <LinearProgress
        value={progress}
        variant="determinate"
        color={colors.primary}
        style={styles.progressBar}
      />
      <View style={styles.progressNumbers}>
        <Text>{goal.price.toLocaleString()}</Text>

        <Text>{(user.saving + user.profit).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
  },
  goalDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  goalName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  goalsActions: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 5,
    height: 15,
    borderRadius: 10,
  },
  progressNumbers: {
    flex: 1,
    flexDirection: `${isRTL ? 'row' : 'row-reverse'}`,
    justifyContent: 'space-between',
  },
});
