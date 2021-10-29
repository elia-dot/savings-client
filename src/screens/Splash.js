import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LinearProgress } from 'react-native-elements';

export default function Splash({ navigation }) {
  return (
    <View style={styles.body}>
      <Image source={require('../../assets/logo.png')} style={styles.img} />
      <LinearProgress color="#9cc95a" style = {{width: '50%', marginTop: 20}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 150,
    height: 150,
  },
  btnsGroup: {
    flexDirection: 'row',
    marginTop: 200,
  },
  btn: {
    margin: 20,
    backgroundColor: '#9cc95a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
});
