import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';

import { useAuth } from '../context/authContext';
import Alert from '../components/Overlay';

export default function Login({ navigation }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const { login, setIsAuth, loadUser } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    if (formData.email === '' || formData.password === '') {
      setErrorMsg('Please fill all the fields!');
      setIsError(true);
      setLoading(false)
      return;
    }
    const res = await login(formData);
    if (res.data) {
      await AsyncStorage.multiSet([['token', res.data.token], ['userId', res.data.data.user._id]]);
      loadUser()
      setIsAuth(true);
    } else {
      setErrorMsg(res.error);
      setIsError(true);
    }
    setLoading(false);
  };

  const navigateToRegister = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.body}>
      <Image source={require('../../assets/logo.png')} style={styles.img} />
      <Alert errorMsg={errorMsg} isError={isError} setIsError={setIsError} />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) =>
          setFormData({ ...formData, email: value.toLowerCase() })
        }
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        textContentType="password"
        secureTextEntry={!showPassword}
        onChangeText={(value) =>
          setFormData({ ...formData, password: value.toLowerCase() })
        }
      />
      <CheckBox
        title="Show Password"
        checked={showPassword}
        checkedColor="#9cc95a"
        containerStyle={{ backgroundColor: 'none', padding: 0, borderWidth: 0 }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
        <Text style={styles.btnText}>{loading ? 'Please wait...' : 'Log In'}</Text>
        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account yet?{' '}
        <TouchableOpacity
          onPress={() => {
            navigateToRegister();
          }}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
        !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 25,
    flex: 1,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 60,
    marginTop: 30,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: '#9cc95a',
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: '#9cc95a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 25,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#9cc95a',
    fontWeight: '600',
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxLabel: {
    margin: 8,
  },
});
