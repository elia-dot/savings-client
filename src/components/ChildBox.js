import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import UpdatePasswordModal from '../components/UpdatePasswordModal';
import colors from '../globals/styles/colors';

const ChildBox = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.childBox}>
      <UpdatePasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={item._id}
      />
      <View style={styles.row}>
        <Text style={styles.text}>שם הילד:</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>שם משתמש: </Text>
        <Text style={styles.text}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.centeredRow}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.centeredText}>עדכן סיסמא</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChildBox;

const styles = StyleSheet.create({
  childBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  centeredRow: {
    padding: 10,
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  text: {
    fontSize: 20,
  },
});
