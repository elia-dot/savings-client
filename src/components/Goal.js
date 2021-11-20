import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';

import { capitalize } from '../utils/capitalize';
import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';
import { deleteGoal } from '../api';

export default function Goal({ goal }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.goal);

  const createdAt = moment(goal.createdAt).fromNow();

  const calculateProgress = () => {
    if ((user.savings * 1) / (goal.price * 1) >= 1) return 1;
    return (user.saving * 1) / (goal.price * 1);
  };

  const progress = calculateProgress();

  const confirmDelete = () => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => handleDelete() },
    ]);
  };

  const handleDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  const updateGoal = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} goal={goal} />
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
            <Text>{createdAt}</Text>
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
        <Text>{user.saving.toLocaleString()}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
