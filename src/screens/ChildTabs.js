import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { FAB } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '../globals/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoals } from '../redux/actions/goals';
import { logout } from '../redux/actions/auth';
import Goal from '../components/Goal';
import GoalForm from '../components/GoalForm';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import NoGoals from '../components/NoGoals';
import Loader from '../globals/components/Loader';
import { finishLoading, startLoading } from '../redux/actions/globals';
import { getHour } from '../utils/getHour';

const ChildTabs = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { goals } = useSelector((state) => state.goals);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getAllGoals());
    dispatch(finishLoading());
  }, [dispatch]);

  return (
    <View style={styles.body}>
      <Loader />
      <GoalForm showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.top}>
        <Text style={styles.greet}>
          {getHour()}, {user.name.split(' ')[0]}
        </Text>
        <Text style={styles.topText}>
          החיסכון שלך: {(user.saving + user.profit).toLocaleString()}
        </Text>
        {user.profit > 0 && (
          <Text style={styles.topText}>
            מתוכם: {user.profit.toLocaleString()} ריבית
          </Text>
        )}
      </View>
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
};

export default ChildTabs;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  top: {
    backgroundColor:
      'linear-gradient(83deg, rgba(156,201,90,1) 0%, rgba(232,243,216,1) 44%, rgba(156,201,90,1) 100%)',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
  },
  greet: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 15,
  },
  topText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 30,
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
