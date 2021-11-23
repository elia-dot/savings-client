import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../styles/colors';

export default function Alert({ title, message, type, isAlert, setIsAlert }) {

  return (
    <View>
      <Overlay
        isVisible={isAlert}
        overlayStyle={styles.overlay}
        onBackdropPress={() => setIsAlert(false)}
      >
        {type === 'fail' ? (
          <View style={[styles.icon, styles.fail]}>
            <FontAwesome name="close" color="#fff" size={40} />
          </View>
        ) : type === 'success' ? (
          <View style={[styles.icon, styles.success]}>
            <FontAwesome5 name="check" color="#fff" size={30} />
          </View>
        ) : null}

        <Text style={styles.overlayTitle}>{title}</Text>
        <Text style={styles.overlayText}>{message}</Text>
        {type === 'fail' ? (
          <TouchableOpacity
            style={[styles.button, styles.fail]}
            onPress={() => setIsAlert(false)}
          >
            <Text style={styles.buttonText}>הבנתי</Text>
          </TouchableOpacity>
        ) : type === 'success' ? (
          <TouchableOpacity
            style={[styles.button, styles.success]}
            onPress={() => setIsAlert(false)}
          >
            <Text style={styles.buttonText}>הבנתי</Text>
          </TouchableOpacity>
        ) : null}
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    position: 'relative',
    width: 280,
  },
  icon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    transform: [{ translateX: 15 }, { translateY: -30 }],
  },
  fail: {
    backgroundColor: colors.fail,
  },
  success: {
    backgroundColor: colors.success,
  },
  overlayText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 35,
  },
  overlayTitle: {
    fontSize: 25,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
});
