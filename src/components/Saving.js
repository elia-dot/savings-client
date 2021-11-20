import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';

import { deleteSaving } from '../api';
import { useAuth } from '../context/authContext';
import colors from '../globals/styles/colors';

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
    setSaving((prev) => prev - saving.amount);
  };

  const handleDelete = async () => {
    await mutateAsync(saving._id);
    queryClient.invalidateQueries('savings');
  };

  return (
    <TouchableOpacity style={styles.body} onPress={confirmDelete}>
      <View>
        <Text>{saving.amount.toLocaleString()}$</Text>
        <Text style={{ color: '#888' }}>{saving.target.title}</Text>
      </View>
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
    alignItems: 'center',
    padding: 15,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.5,
  },
});
