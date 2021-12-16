import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';

import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';
import { sendPushNotification } from '../utils/sendNotification';

export default function NoGoals({ userGoal }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, child } = useSelector((state) => state.auth);

  const sendMessage = async () => {
    setLoading(true);
    const body = {
      userId: child._id,
      title: 'תזכורת',
      body: `זוהי תזכורת להצבת המטרה הראשונה שלך`,
    };
    await sendPushNotification(body);
    setLoading(false);
  };

  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} />
      {user.type === 'child' ? (
        <>
          <Text style={styles.text}> רשימת המטרות שלך ריקה</Text>
          <FAB
            color={colors.primary}
            size="large"
            title="צור מטרה ראשונה"
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}> רשימת המטרות של {userGoal.name} ריקה</Text>
          <FAB
            color={colors.primary}
            size="large"
            title="שלח תזכורת"
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
