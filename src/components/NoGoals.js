import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import { useSelector } from 'react-redux';

import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';

export default function NoGoals({ name }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
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
          <Text style={styles.text}> רשימת המטרות של {name} ריקה</Text>
          <FAB
            color={colors.primary}
            size="large"
            title="שלח תזכורת"
            //TODO: notification
          />
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
