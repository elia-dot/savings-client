import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Alert = ({ msg, type }) => {
  return (
    <View style={type === 'error' ? styles.error : styles.success}>
      <Text style={{ fontSize: 16 }}>{msg}</Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#ffb3b3',
  },
});
