import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';

import { deleteSaving } from '../api';
import { useAuth } from '../context/authContext';

export default function Saving({ saving }) {
  const queryClient = useQueryClient();
  const { setSaving } = useAuth();
  const createdAt = moment(saving.createdAt).calendar();

  const { mutateAsync } = useMutation(deleteSaving);

  const confirmDelete = () => {
    Alert.alert(
      'Delete Saving',
      'Are you sure you want to delete this saving?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => handleDelete() }]
    );
    setSaving((prev) => prev - saving.amount)
  };

  const handleDelete = async () => {
    await mutateAsync(saving._id);
    queryClient.invalidateQueries('savings');
  };

  return (
    <TouchableOpacity style={styles.body} onPress={confirmDelete}>
      <Text>{saving.amount.toLocaleString()}$</Text>
      <Text>{createdAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 0.5,
  },
});
