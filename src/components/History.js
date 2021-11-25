import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHistory } from '../redux/actions/savings';
import SavingItem from './SavingItem';

const History = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.savings);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getHistory(user._id));
  }, [dispatch]);

  return (
    <View style={styles.body}>
      <FlatList
        data={history}
        renderItem={({ item }) => <SavingItem item={item} />}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
  },
});
