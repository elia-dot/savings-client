import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FAB } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { getHistory } from '../redux/actions/savings';
import SavingItem from './SavingItem';
import SavingModal from './SavingModal';
import colors from '../globals/styles/colors';
import currency from '../globals/styles/currency';

const History = ({ route }) => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.savings);
  const { user, child } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const id = route.params?.userId || user._id;
    dispatch(getHistory(id));
  }, [route.params, dispatch]);

  return (
    <View style={styles.body}>
      <SavingModal openModal={openModal} setOpenModal={setOpenModal} />
      <View style={styles.historyTop}>
        <Text style={styles.historyText}>היתרה של {child.name}: </Text>
        <Text style={styles.historyNumber}>
          <Text style={styles.historyText}>{currency.NIS}</Text>
          {(child.saving + child.profit).toLocaleString()}
        </Text>
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => <SavingItem item={item} />}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
      <FAB
        color="#9cc95a"
        size="large"
        icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
        onPress={() => setOpenModal(true)}
        placement="left"
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  historyTop: {
    backgroundColor: colors.primary,
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    color: colors.secondary,
    fontSize: 16,
  },
  historyNumber: {
    color: colors.secondary,
    fontSize: 35,
    fontWeight: '600',
  },
});
