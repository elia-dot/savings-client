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
import i18n from 'i18n-js';

const History = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.savings);
  const { user, child } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [refreshing, setRefreshing] = useState(false);
  const buttons = [
    i18n.t('history.allBtn'),
    i18n.t('history.depositBtn'),
    i18n.t('history.withdrawBtn'),
  ];

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
    if (user.type === 'child') dispatch(getHistory(user._id));
  }, [dispatch]);

  const refresh = async () => {
    const id = child ? child._id : user._id;
    setRefreshing(true);
    await dispatch(getHistory(id));
    setRefreshing(false);
  };

  if (loading) return null;
  return (
    <View style={styles.body}>
      <SavingModal openModal={openModal} setOpenModal={setOpenModal} />
      {user.type === 'parent' && (
        <View style={styles.historyTop}>
          <Text style={styles.historyText}>
            {i18n.t('history.topTextParent', { name: child.name })}
          </Text>
          <Text style={styles.historyNumber}>
            {(child.saving + child.profit).toFixed(1).toLocaleString()}
            <Text style={styles.historyText}>{currency.NIS}</Text>
          </Text>
        </View>
      )}
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(i) => setSelectedIndex(i)}
        containerStyle={{
          width: '70%',
          marginStart: '15%',
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
        initialNumToRender={10}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10 }}
        onRefresh={refresh}
        refreshing={refreshing}
      />
      {user.type === 'parent' && (
        <FAB
          color="#9cc95a"
          size="large"
          icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
          onPress={() => setOpenModal(true)}
          placement="end"
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
