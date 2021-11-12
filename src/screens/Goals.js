import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FAB, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from 'react-query';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';
import { getAllGoals } from '../api';
import GoalForm from '../components/GoalForm';

export default function Goals() {
  const { user, saving, currency } = useAuth();
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userId = user._id.toString();

  const { data, isLoading } = useQuery(['goals', userId], () =>
    getAllGoals(userId)
  );

  useEffect(() => {
    data && setGoals(data.data);
  }, [data]);

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
    color: '#9cc95a',
  },
});
