import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Splash({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000)
    }, [])
  return (
    <View style={styles.body}>
      <Image source={require('../assets/logo.png')} style={styles.img} />
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
    width: 100,
    height: 100,
  },
});
