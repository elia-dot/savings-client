import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import axios from 'axios';
import i18n from 'i18n-js';

import Alert from '../globals/components/Alert';
import colors from '../globals/styles/colors';
import { updatePassword } from '../redux/actions/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ msg: '', type: '' });
  const dispatch = useDispatch();
  const [stage, setStage] = useState('email');

  const getToken = async () => {
    setAlertMsg({ msg: '', type: '' });
    if (email === '') {
      setAlertMsg({
        msg: i18n.t('forgotPasswordScreen.noEmailError'),
        type: 'error',
      });
      return;
    }
    setLoading(true);
    const data = { email };
    try {
      await axios.post(
        `https://goals-65106.herokuapp.com/users/forgot-password`,
        data
      );
      setAlertMsg({
        msg: i18n.t('forgotPasswordScreen.emailSent'),
        type: 'success',
      });
      setStage('token');
    } catch (error) {
      console.log(error);
      setAlertMsg({
        msg: i18n.t('forgotPasswordScreen.emailError'),
        type: 'error',
      });
    }
    setLoading(false);
  };

  const sendToken = async () => {
    setLoading(true);
    setAlertMsg({ msg: '', type: '' });
    if (token === '') {
      setAlertMsg({
        msg: i18n.t('forgotPasswordScreen.noTokenError'),
        type: 'error',
      });
      setLoading(false);
    }

    try {
      const data = { token };
      const res = await axios.post(
        `https://goals-65106.herokuapp.com/users/reset-password`,
        data
      );
      setUser(res.data.data);
      setStage('password');
    } catch (error) {
      console.log(error);
      setAlertMsg({
        msg: i18n.t('forgotPasswordScreen.tokenError'),
        type: 'error',
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const update = async () => {
    setLoading(true);
    const data = { password };
    await dispatch(updatePassword(data, user._id));
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.body}>
        {stage === 'email' && (
          <>
            <Text style={styles.title}>
              {i18n.t('forgotPasswordScreen.emailTitle')}
            </Text>
            {alertMsg.msg !== '' && (
              <View style={{ marginBottom: 30 }}>
                <Alert type={alertMsg.type} msg={alertMsg.msg} />
              </View>
            )}
            <TextInput
              style={styles.input}
              value={email}
              keyboardType="email-address"
              autoFocus
              returnKeyType="done"
              onChangeText={(value) => setEmail(value.toLowerCase())}
            />
            <TouchableOpacity style={styles.btn} onPress={getToken}>
              <Text style={styles.btnText}>
                {loading
                  ? i18n.t('forgotPasswordScreen.loadingTextBtn')
                  : i18n.t('forgotPasswordScreen.textBtn')}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </>
        )}
        {stage === 'token' && (
          <>
            <Text style={styles.title}>
              {i18n.t('forgotPasswordScreen.tokenTitle')}
            </Text>
            {alertMsg.msg !== '' && (
              <View style={{ marginBottom: 30 }}>
                <Alert type={alertMsg.type} msg={alertMsg.msg} />
              </View>
            )}
            <TextInput
              style={styles.input}
              value={token}
              keyboardType="numeric"
              autoFocus
              returnKeyType="done"
              onChangeText={(value) => setToken(value.toString())}
            />
            <TouchableOpacity style={styles.btn} onPress={sendToken}>
              <Text style={styles.btnText}>
                {loading
                  ? i18n.t('forgotPasswordScreen.loadingTextBtn')
                  : i18n.t('forgotPasswordScreen.textBtn')}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </>
        )}

        {stage === 'password' && (
          <>
            <Text style={styles.title}>
              {i18n.t('forgotPasswordScreen.passwordTitle')}
            </Text>
            <TextInput
              style={styles.input}
              value={password}
              autoFocus
              returnKeyType="done"
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity style={styles.btn} onPress={update}>
              <Text style={styles.btnText}>
                {loading
                  ? i18n.t('forgotPasswordScreen.loadingTextBtn')
                  : i18n.t('forgotPasswordScreen.textBtn')}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 25,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 75,
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
});
