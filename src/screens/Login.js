import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';
import validator from 'validator';
import i18n from 'i18n-js';

import Alert from '../globals/components/Alert';
import { login } from '../redux/actions/auth';
import colors from '../globals/styles/colors';

export default function Login({ navigation }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispacth = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setErrorMsg(i18n.t('loginScreen.loginError'));
    }
  }, [error]);

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    if (formData.email === '' || formData.password === '') {
      setErrorMsg(i18n.t('loginScreen.missingFields'));
      setLoading(false);
      return;
    }

    let data = { password: formData.password };
    //check if its username or email
    validator.isEmail(formData.email)
      ? (data.email = formData.email)
      : (data.username = formData.email);

    await dispacth(login(data));
    setLoading(false);
  };

  const navigateToRegister = () => {
    navigation.navigate('Signup');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.body}>
        <Image source={require('../../assets/logo.png')} style={styles.img} />
        <Text style={{ alignSelf: 'center' }}>
          {errorMsg && <Alert msg={errorMsg} type="error" />}
        </Text>
        <Text style={styles.label}>{i18n.t('loginScreen.nameLabel')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('loginScreen.namePlaceholder')}
          value={formData.email}
          returnKeyType="next"
          onChangeText={(value) =>
            setFormData({ ...formData, email: value.toLowerCase() })
          }
        />
        <Text style={styles.label}>{i18n.t('loginScreen.passwordLabel')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('loginScreen.passwordPlaceholder')}
          value={formData.password}
          returnKeyType="done"
          textContentType="password"
          secureTextEntry={!showPassword}
          onChangeText={(value) =>
            setFormData({ ...formData, password: value })
          }
        />
        <CheckBox
          title={i18n.t('loginScreen.showPassword')}
          checked={showPassword}
          checkedColor="#9cc95a"
          containerStyle={{
            backgroundColor: 'none',
            padding: 0,
            borderWidth: 0,
          }}
          onPress={() => setShowPassword(!showPassword)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('forgot password')}
        >
          <Text style={styles.forgot}>
            {i18n.t('loginScreen.forgotPassword')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
          <Text style={styles.btnText}>
            {loading
              ? i18n.t('loginScreen.loadingLoginBtn')
              : i18n.t('loginScreen.loginBtn')}
          </Text>
          {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigateToRegister();
          }}
        >
          <Text style={styles.text}>
            {i18n.t('loginScreen.loginTextLink')}
            <Text style={styles.link}> {i18n.t('loginScreen.loginLink')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: '600',
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
  forgot: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 20,
  },
});
