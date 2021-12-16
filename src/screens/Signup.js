import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';
import { signup } from '../redux/actions/auth';

export default function Signup({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmd: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ title: '', message: '' });
  const [isAlert, setIsAlert] = useState(false);

  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const passwordRef = useRef();
  const confirmRef = useRef();

  useEffect(() => {
    if (error === 'User already exist with this email!') {
      setErrorMsg({
        title: 'שגיאה',
        message: 'קיים משתמש המקושר לאימייל זה',
      });
      setIsAlert(true);
    }
  }, [error]);

  const handleSignup = async () => {
    setLoading(true);
    if (
      formData.email === '' ||
      formData.password === '' ||
      formData.passwordConfirmd === ''
    ) {
      setErrorMsg({
        title: 'חסרים פרטים',
        message: 'נא מלא את כל השדות',
      });
      setIsAlert(true);
      setLoading(false);
      return;
    } else if (formData.password !== formData.passwordConfirmd) {
      setErrorMsg({
        title: 'שגיאה בפרטים',
        message: 'סיסמאות לא תואמות',
      });
      setIsAlert(true);
      setLoading(false);
      return;
    } else if (formData.password.length < 6) {
      setErrorMsg({
        title: 'שגיאה בפרטים',
        message: 'הסיסמא חייבת להיות לפחות 6 תווים',
      });
      setIsAlert(true);
      setLoading(false);
      return;
    }
    await dispatch(signup(formData));
    setLoading(false);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const renderInputs = () => (
    <ScrollView>
      <Alert
        message={errorMsg.message}
        title={errorMsg.title}
        type="fail"
        isAlert={isAlert}
        setIsAlert={setIsAlert}
      />
      <Text style={styles.label}>אימייל:</Text>
      <TextInput
        style={styles.input}
        placeholder="אימייל"
        returnKeyType="next"
        autoFocus
        onSubmitEditing={() => passwordRef.current.focus()}
        value={formData.email}
        onChangeText={(value) =>
          setFormData({ ...formData, email: value.toLowerCase() })
        }
      />
      <Text style={styles.label}>סיסמא:</Text>
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        ref={passwordRef}
        onSubmitEditing={() => confirmRef.current.focus()}
        value={formData.password}
        returnKeyType="next"
        textContentType="password"
        secureTextEntry={!showPassword}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
      />
      <Text style={styles.label}>אשר סיסמא:</Text>
      <TextInput
        style={styles.input}
        placeholder="אשר סיסמא"
        value={formData.passwordConfirmd}
        returnKeyType="done"
        textContentType="password"
        ref={confirmRef}
        secureTextEntry={!showPassword}
        onChangeText={(value) =>
          setFormData({ ...formData, passwordConfirmd: value })
        }
      />
      <CheckBox
        title="הצג סיסמא"
        checked={showPassword}
        checkedColor="#9cc95a"
        containerStyle={{ backgroundColor: 'none', padding: 0, borderWidth: 0 }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handleSignup()}>
        <Text style={styles.btnText}>
          {loading ? 'יוצר חשבון' : 'צור חשבון'}
        </Text>
        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.body}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {Platform.OS === 'android' ? (
          renderInputs()
        ) : (
          <KeyboardAvoidingView behavior="padding">
            {renderInputs()}
          </KeyboardAvoidingView>
        )}
      </TouchableWithoutFeedback>
      <Text style={styles.text}>
        יש לך כבר חשבון?
        <TouchableOpacity
          onPress={() => {
            navigateToLogin();
          }}
        >
          <Text style={styles.link}> התחבר</Text>
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
    justifyContent: 'center',
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
    fontWeight: '600',
    fontSize: 20,
  },
});
