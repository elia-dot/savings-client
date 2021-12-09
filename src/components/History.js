import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FAB, ButtonGroup } from 'react-native-elements';
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredHistory, setFilteredHistory] = useState(history);
  const buttons = ['הכל', 'הפקדות', 'משיכות'];

  useEffect(() => {
    let filtered;
    if (selectedIndex === 0) setFilteredHistory(history);
    if (selectedIndex === 1) {
      filtered = history.filter((h) => h.amount > 0);
      setFilteredHistory(filtered);
    }
    if (selectedIndex === 2) {
      filtered = history.filter((h) => h.amount < 0);
      setFilteredHistory(filtered);
    }
  }, [history, selectedIndex]);

  useEffect(() => {
    const id = route.params?.userId || user._id;
    dispatch(getHistory(id));
  }, [route.params, dispatch]);

  return (
    <View style={styles.body}>
      <SavingModal openModal={openModal} setOpenModal={setOpenModal} />
      {user.type === 'parent' && (
        <View style={styles.historyTop}>
          <Text style={styles.historyText}>היתרה של {child.name}: </Text>
          <Text style={styles.historyNumber}>
            <Text style={styles.historyText}>{currency.NIS}</Text>
            {(child.saving + child.profit).toLocaleString()}
          </Text>
        </View>
      )}
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(i) => setSelectedIndex(i)}
        containerStyle={{
          width: '70%',
          marginStart: '50%',
          transform: [{ translateX: '130%' }],
          marginBottom: 20,
          marginTop: 20,
        }}
        textStyle={{
          color: colors.primary,
        }}
        selectedButtonStyle={{ backgroundColor: colors.primary }}
      />
      <FlatList
        data={filteredHistory}
        renderItem={({ item }) => <SavingItem item={item} />}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
      {user.type === 'parent' && (
        <FAB
          color="#9cc95a"
          size="large"
          icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
          onPress={() => setOpenModal(true)}
          placement="left"
        />
      )}
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
