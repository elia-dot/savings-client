import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons' 

export default function Alert({ errorMsg, isError, setIsError }) {
  return (
    <View>
      <Overlay
        isVisible={isError}
        overlayStyle={styles.overlay}
        onBackdropPress={() => setIsError(false)}
      >
        <Ionicons
        name = "warning-outline"
        color = "#ff4d4d"
        size = {55}
        style = {{textAlign : 'center', marginBottom: 10}}
        />
        <Text style={styles.overlayText}>{errorMsg}</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  overlayText: {
    textAlign: 'center',
    fontSize: 20,
  },
  overlayTitle: {
    fontSize: 35,
    marginBottom: 10,
  },
});
