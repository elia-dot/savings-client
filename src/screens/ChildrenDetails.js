import I18n from 'i18n-js';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import ChildBox from '../components/ChildBox';

const ChildrenDetails = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <View style={styles.body}>
      <Text style={styles.title}> {I18n.t('childrenDetails.title')}</Text>
      <FlatList
        data={user.children}
        renderItem={({ item }) => <ChildBox item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default ChildrenDetails;

const styles = StyleSheet.create({
  body: {
    paddingTop: 70,
    paddingHorizontal: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 70,
  },
});
