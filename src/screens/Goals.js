import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';
import Loader from '../globals/components/Loader';
import { getAllGoals } from '../redux/actions/goals';

export default function Goals({ route }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);
  const { user, child } = useSelector((state) => state.auth);

  const userGoal = user.type === 'child' ? user : child;

  useEffect(() => {
    if (user.type === 'child') dispatch(getAllGoals(user._id));
  }, [dispatch]);

  if (loading) return null;

  return (
    <View style={styles.body}>
      <GoalForm
        showModal={showModal}
        setShowModal={setShowModal}
        userGoal={userGoal}
      />

      {!loading && goals.length === 0 && <NoGoals userGoal={userGoal} />}

      <FlatList
        data={goals}
        renderItem={({ item }) => {
          return <Goal goal={item} user={userGoal} />;
        }}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
      {goals.length > 0 && user.type === 'child' && (
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
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
  },
});
