import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';

export default function NoGoals() {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal}  />
      <Text style={styles.text}> רשימת המטרות שלך ריקה</Text>
      <FAB
        color={colors.primary}
        size="large"
        title="צור מטרה ראשונה"
        onPress={() => {
          setShowModal(true);
        }}
      />
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
