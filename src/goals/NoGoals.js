import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';
import i18n from 'i18n-js';
import axios from 'axios';

import GoalForm from './GoalForm';
import colors from '../globals/styles/colors';
import Loader from '../globals/components/Loader';

export default function NoGoals({ userGoal }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, child } = useSelector((state) => state.auth);

  const sendMessage = async () => {
    setLoading(true);
    const body = {
      to: child._id,
      title: i18n.t('goals.noGoalsPushTitle'),
      body: i18n.t('goals.noGoalsPushBody'),
    };
    await axios.post(
      'https://goals-65106.herokuapp.com/message/reminder',
      body
    );
    setLoading(false);
  };

  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} />
      {user.type === 'child' ? (
        <>
          <Text style={styles.text}> {i18n.t('goals.noGoalsChild')}</Text>
          <FAB
            color={colors.primary}
            size="large"
            title={i18n.t('goals.noGoalsBtnChild')}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>
            {i18n.t('goals.noGoalsParent', { name: userGoal.name })}
          </Text>
          {loading && <Loader title={i18n.t('tasks.loaderTitle')} />}
          <FAB
            color={colors.primary}
            size="large"
            title={i18n.t('goals.noGoalsBtnParent')}
            onPress={sendMessage}
          >
            {loading && (
              <LinearProgress color="#fff" style={{ marginTop: 1 }} />
            )}
          </FAB>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50,
  },
});
