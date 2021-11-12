import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';
import { deleteGoal, getAllSavings } from '../api';
import GoalForm from '../components/GoalForm';

export default function Goal({ goal }) {
  const { user, currency } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [goalSaving, setGoalSavings] = useState([]);
  const [savingSum, setSavingSum] = useState(0);

  const createdAt = moment(goal.createdAt).fromNow();

  const userId = user._id.toString();
  const { data } = useQuery(['savings', userId], () => getAllSavings(userId));

  useEffect(() => {
    if (data) {
      const filteredSavings = data.data.filter(
        (saving) => saving.target._id === goal._id
      );
      setGoalSavings(filteredSavings);
    }
  }, [data]);

  useEffect(() => {
    let sum = 0;
    goalSaving.forEach((goal) => {
      sum += goal.amount;
    });
    setSavingSum(sum);
  }, [goalSaving])

  const calculateProgress = () => {
    if ((savingSum * 1) / (goal.price * 1) >= 1) return 1;
    return (savingSum * 1) / (goal.price * 1);
  };
  const progress = calculateProgress();

  const { mutateAsync } = useMutation(deleteGoal);

  const confirmDelete = () => {
    Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => handleDelete() },
    ]);
  };

  const handleDelete = async () => {
    await mutateAsync(goal._id);
    queryClient.invalidateQueries('goals');
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
              color="#9cc95a"
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
              color="#9cc95a"
              size={20}
              onPress={updateGoal}
            />
            <FontAwesome5
              name="trash"
              color="#9cc95a"
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
        color="#9cc95a"
        style={styles.progressBar}
      />
      <View style={styles.progressNumbers}>
        <Text>
          {savingSum.toLocaleString()} {currency}
        </Text>
        <Text>
          {goal.price.toLocaleString()} {currency}
        </Text>
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
    backgroundColor: '#f4f9ec',
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
