import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EditProfile from '../components/EditProfile';

import { useAuth } from '../context/authContext';

export default function Profile() {
  const { user, logOut, currency, setCurrency } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [type, setType] = useState('');

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel' },
      {
        text: 'Logoot',
        onPress: () => {
          logOut();
        },
      },
    ]);
  };

  const handleCurrencyChange = () => {
    setType('currency');
    setShowEdit(true);
  };
  return (
    <View style={styles.body}>
      <EditProfile showEdit={showEdit} setShowEdit={setShowEdit} type={type} />
      <TouchableOpacity style={styles.centeredRow} onPress={handleLogout}>
        <Text style={styles.rowText}>
          <FontAwesome5 name="user" color="#9cc95a" size={20} /> Logged in with:{' '}
          {user.email}
        </Text>
      </TouchableOpacity>
      <Text style={styles.sectionHeader}>my profile</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.leftText}>Name: </Text>
          <Text style={styles.rightText}>{user.name} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={handleCurrencyChange}>
          <Text style={styles.leftText}>Currency: </Text>
          <Text style={styles.rightText}>{currency}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.leftText}>Notification: </Text>
          <Text style={styles.rightText}>Never</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  row: {
    backgroundColor: '#fff',
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 0.5,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredRow: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionHeader: {
    textTransform: 'uppercase',
    color: '#9cc95a',
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: '5%',
  },
  section: {
    borderColor: '#9cc95a',
    borderWidth: 0.5,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  leftText: {
    fontWeight: '600',
  },
  rightText: {
    color: '#c6c6c6',
  },
});
