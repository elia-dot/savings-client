import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const Alert = ({ msg, type }) => {
  return (
    <View style={type === 'error' ? styles.error : styles.success}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{msg}</Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  error: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#ffb3b3',
  },
  success: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
});
