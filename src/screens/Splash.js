import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Splash({ navigation }) {
  return (
    <View style={styles.body}>
      <Image source={require('../../assets/logo.png')} style={styles.img} />
      <View style={styles.btnsGroup}>
        <TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('Login')}>
          <Text style = {styles.btnText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('Signup')}>
          <Text style = {styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 200
  },
  btn : {
    margin: 20,
    backgroundColor: '#9cc95a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnText : {
    color :'white',
    fontSize: 25,
    fontWeight: '500'
  }
});
