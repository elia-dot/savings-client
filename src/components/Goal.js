import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useMutation, useQueryClient } from 'react-query';

import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';
import { deleteGoal } from '../api';

export default function Goal({ goal }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const createdAt = moment(goal.createdAt).fromNow();

  const calculateProgress = () => {
    if ((user.saving * 1) / (goal.price * 1) >= 1) return 1;
    return (user.saving * 1) / (goal.price * 1);
  };
  const progress = calculateProgress();

  const { mutateAsync } = useMutation(deleteGoal);

  const handleDelete = async () => {
    await mutateAsync(goal._id);
    queryClient.invalidateQueries('goals');
  };

  return (
    <View style={styles.body}>
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
            <FontAwesome5 name="pen" color="#9cc95a" size={20} />
            <FontAwesome5
              name="trash"
              color="#9cc95a"
              size={20}
              style={{ marginLeft: 15 }}
              onPress={handleDelete}
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
        <Text>{user.saving.toLocaleString()}$</Text>
        <Text>{goal.price.toLocaleString()}$</Text>
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
