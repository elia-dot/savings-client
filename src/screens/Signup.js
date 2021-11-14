import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearProgress } from 'react-native-elements';

import { useAuth } from '../context/authContext';
import Alert from '../components/Overlay';

export default function Signup({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmd: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const { signup, setIsAuth, loadUser } = useAuth();

  const handleSignup = async () => {
    setLoading(true);
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.passwordConfirmd === ''
    ) {
      setErrorMsg('Please fill all the fields!');
      setIsError(true);
      setLoading(false);
      return;
    } else if (formData.password !== formData.passwordConfirmd) {
      setErrorMsg('Passwords do not match!');
      setIsError(true);
      setLoading(false);
      return;
    } else if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters!');
      setIsError(true);
      setLoading(false);
      return;
    }
    const res = await signup(formData);
    if (res.data) {
      await AsyncStorage.multiSet([
        ['token', res.data.token],
        ['userId', res.data.data.user._id],
      ]);
      setIsAuth(true);
    } else {
      setErrorMsg(res.errors);
      setIsError(true);
    }
    loadUser();
    setLoading(false);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.body}>
      <Alert errorMsg={errorMsg} isError={isError} setIsError={setIsError} />
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) =>
          setFormData({ ...formData, name: value.toLowerCase() })
        }
      />
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
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.passwordConfirmd}
        textContentType="password"
        secureTextEntry={!showPassword}
        onChangeText={(value) =>
          setFormData({ ...formData, passwordConfirmd: value.toLowerCase() })
        }
      />
      <CheckBox
        title="Show Password"
        checked={showPassword}
        checkedColor="#9cc95a"
        containerStyle={{ backgroundColor: 'none', padding: 0, borderWidth: 0 }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handleSignup()}>
        <Text style={styles.btnText}>
          {loading ? 'Please wait...' : 'Sign Up'}
        </Text>
        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>

      <Text style={styles.text}>
        Allready have an account?
        <TouchableOpacity
          onPress={() => {
            navigateToLogin();
          }}
        >
          <Text style={styles.link}> Log In</Text>
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
});
