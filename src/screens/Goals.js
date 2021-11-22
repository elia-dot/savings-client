import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FAB, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import { capitalize } from '../utils/capitalize';
import GoalForm from '../components/GoalForm';
import colors from '../globals/styles/colors';


export default function Goals() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goals);

 

  return (
    <View style={styles.body}>
      <GoalForm showModal={showModal} setShowModal={setShowModal} goal={null} />

      <View>
        <View style={styles.totalSavings}>
          <Text style={styles.title}>
            {capitalize(user.name)}, You've already saved:
          </Text>
          <Text style={styles.savings}>
            {saving.toLocaleString()}
            <Text style={styles.currency}> {currency}</Text>
          </Text>
        </View>
      </View>
      <Divider
        color="#9cc95a"
        width={2}
        inset={true}
        insetType="middle"
        style={{ marginBottom: 20 }}
      />
      {goals.length > 0 && (
        <>
          <FlatList
            data={goals}
            renderItem={({ item }) => <Goal goal={item} />}
            keyExtractor={(item) => item._id}
          />
          <FAB
            placement="right"
            color="#9cc95a"
            size="large"
            icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      )}
      {goals.length === 0 && !isLoading && <NoGoals />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  totalSavings: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 50,
  },
  savings: {
    fontSize: 60,
    fontWeight: '800',
    marginTop: 15,
  },
  currency: {
    fontSize: 25,
    color: colors.primary,
  },
});
