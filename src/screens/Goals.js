import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { FAB, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';
import Loader from '../globals/components/Loader';

export default function Goals() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goals);

  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.body}>
      <Loader />
      <GoalForm showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.goalTitleContainer}>
        <Text style={styles.goalTitle}>המטרות שלי</Text>
      </View>
      <Divider
        color={colors.primary}
        width={2}
        inset={true}
        insetType="middle"
        style={{ marginBottom: 20 }}
      />
      {goals.length === 0 && <NoGoals />}
      <FlatList
        data={goals}
        renderItem={({ item }) => <Goal goal={item} />}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
      {goals.length > 0 && (
        <FAB
          placement="left"
          color={colors.primary}
          size="large"
          icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
          onPress={() => {
            setShowModal(true);
          }}
        />
      )}
      <TouchableOpacity onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  goalTitleContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 15,
  },
  goalTitle: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
});
