import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import GoalForm from '../components/GoalForm';

export default function NoGoals() {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} goal={null} />
      <Text style={styles.text}> You haven't created any goal yet</Text>
      <FAB
        color="#9cc95a"
        size="large"
        title="Create Your First Goal"
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
    fontSize: 35,
    marginBottom: 50,
  },
});
