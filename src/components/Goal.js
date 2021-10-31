import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';

export default function Goal({ goal }) {
  const { user } = useAuth();
  const createdAt = moment(goal.createdAt).fromNow();

  const calculateProgress = () => {
    if ((user.saving * 1) / (goal.price * 1) >= 1) return 1;
    return (user.saving * 1) / (goal.price * 1);
  };
  const progress = calculateProgress();

  return (
    <View style={styles.body}>
      <View style={styles.goalDetails}>
        <View style={styles.icon}>
          <FontAwesome5
            name={user.icon ? iconName : 'question'}
            color="#9cc95a"
            size = {20}
          />
        </View>
        <View>
          <Text style={styles.goalTitle}>{capitalize(goal.title)}</Text>
          <Text>{createdAt}</Text>
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
  },
  icon: {
    backgroundColor: '#f4f9ec',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginRight: 15,
    borderRadius: 10
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
