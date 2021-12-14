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

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    title: '',
    message: '',
    type: '',
  });
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);
  const [stage, setStage] = useState('email');

  const getToken = async () => {
    if (email === '') {
      setIsAlert(true);
      setAlertMsg({
        title: 'חסרים פרטים',
        message: 'אנא הכנס אימייל תקין',
        type: 'fail',
      });
    }
    setLoading(true);
    const data = { email };
    const res = await axios.post(
      `https://goals-65106.herokuapp.com/users/forgot-password`,
      data
    );
    if (res.data.status === 'fail') {
      setIsAlert(true);
      setAlertMsg({
        title: 'אירעה שגיאה',
        message: 'לא הצלחנו לשלוח את האימייל, אנא בדוק את הפרטים ונסה שנית',
        type: 'fail',
      });
    } else {
      setStage('token');
      setAlertMsg({
        title: 'אימייל נשלח',
        message: 'בדוק את האימייל שלך להמשך ',
        type: 'success',
      });
    }
    setLoading(false);
  };

  const sendToken = async () => {
    if (token === '') {
      setIsAlert(true);
      setAlertMsg({
        title: 'חסרים פרטים',
        message: 'אנא הכנס את הקוד שקיבלת באימייל',
        type: 'fail',
      });
    }
    setLoading(true);
    const data = { token };
    const res = await axios.post(
      `https://goals-65106.herokuapp.com/users/reset-password`,
      data
    );
    if (res.data.status === 'fail') {
      setIsAlert(true);
      setAlertMsg({
        title: 'אירעה שגיאה',
        message: 'לא הצלחנו לאמת את החשבון שלך, נסה שוב',
        type: 'fail',
      });
    } else {
      setUser(res.data.data);
      setStage('password');
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    setIsLoading(true);
    const data = { password };
    dispatch(updatePassword(data));
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.body}>
        <Alert
          message={alertMsg.message}
          title={alertMsg.title}
          type={alertMsg.type}
          isAlert={isAlert}
          setIsAlert={setIsAlert}
        />

        {stage === 'email' && (
          <>
            <Text style={styles.title}>הכנס את האימייל שלך</Text>
            <TextInput
              style={styles.input}
              placeholder="אימייל"
              value={email}
              autoFocus
              returnKeyType="done"
              onChangeText={(value) => setEmail(value.toLowerCase())}
            />
            <TouchableOpacity style={styles.btn} onPress={getToken}>
              <Text style={styles.btnText}>
                {loading ? 'שולח...' : 'שלח סיסמא'}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </>
        )}
        {stage === 'token' && (
          <>
            <Text style={styles.title}>הכנס את הקוד שקיבלת</Text>
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
                {loading ? 'שולח...' : 'שלח קוד'}
              </Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
          </>
        )}

        {stage === 'password' && (
          <>
            <Text style={styles.title}>בחר סיסמא חדשה</Text>
            <TextInput
              style={styles.input}
              placeholder="סיסמא חדשה"
              value={password}
              autoFocus
              returnKeyType="done"
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity style={styles.btn} onPress={sendToken}>
              <Text style={styles.btnText}>
                {loading ? 'מעדכן...' : 'עדכן סיסמא'}
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
