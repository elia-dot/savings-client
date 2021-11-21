import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
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
import validator from 'validator';

import Alert from '../globals/components/Overlay';
import { login } from '../redux/actions/auth';
import colors from '../globals/styles/colors';

export default function Login({ navigation }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ title: '', message: '' });
  const [isAlert, setIsAlert] = useState(false);

  const dispacth = useDispatch();
  const { error, user, isAuthenticated } = useSelector((state) => state.auth);
  const handleLogin = async () => {
    setLoading(true);
    if (formData.email === '' || formData.password === '') {
      setErrorMsg({
        title: 'Missing Details',
        message: 'Please fill all the fields!',
      });
      setIsAlert(true);
      setLoading(false);
      return;
    }

    let data = { password: formData.password };
    //check if its username or email
    validator.isEmail(formData.email)
      ? (data.email = formData.email)
      : (data.username = formData.email);

    await dispacth(login(data));
    if (error) {
      setErrorMsg({
        title: 'Incorent Details',
        message: 'Please check your input and try again',
      });
      setIsAlert(true);
    }
    setLoading(false);
  };

  const navigateToRegister = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.body}>
      <Image source={require('../../assets/logo.png')} style={styles.img} />
      <Alert
        message={errorMsg.message}
        title={errorMsg.title}
        type="fail"
        isAlert={isAlert}
        setIsAlert={setIsAlert}
      />
      <Text style={styles.label}>שם משתמש/מייל</Text>
      <TextInput
        style={styles.input}
        placeholder="שם משתמש או מייל"
        value={formData.email}
        onChangeText={(value) =>
          setFormData({ ...formData, email: value.toLowerCase() })
        }
      />
      <Text style={styles.label}>סיסמא:</Text>
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        value={formData.password}
        textContentType="password"
        secureTextEntry={!showPassword}
        onChangeText={(value) =>
          setFormData({ ...formData, password: value.toLowerCase() })
        }
      />
      <CheckBox
        title="הצג סיסמא"
        checked={showPassword}
        checkedColor="#9cc95a"
        containerStyle={{ backgroundColor: 'none', padding: 0, borderWidth: 0 }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
        <Text style={styles.btnText}>{loading ? 'מתחבר...' : 'התחבר'}</Text>
        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateToRegister();
        }}
      >
        <Text style={styles.text}>
        משתמש חדש?{'  '}
          <Text style={styles.link}>הירשם{'  '}</Text>
        </Text>
      </TouchableOpacity>
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
    color: colors.primary,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: colors.primary,
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
    color: colors.primary,
    fontSize: 23,
    fontWeight: '600'
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
