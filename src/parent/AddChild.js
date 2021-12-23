import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import I18n from 'i18n-js';

import Alert from '../globals/components/Alert';
import colors from '../globals/styles/colors';
import { addChild } from '../redux/actions/auth';
import { finishLoading, startLoading } from '../redux/actions/globals';

const AddChild = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.globals);
  const [addChildRes, setAddChildRes] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    profit: '',
  });
  const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const profitRef = useRef();

  useEffect(() => {
    if (error === 'this username already exsits') {
      setAddChildRes(I18n.t('addChildScreen.usernameError'));
    } else if (
      error === 'Child password must be different from the parent password'
    ) {
      setAddChildRes(I18n.t('addChildScreen.passwordError'));
    } else {
      setFormData({
        name: '',
        username: '',
        password: '',
        profit: '',
      });
      setShowModal(false);
    }
  }, [error]);

  const handlePress = async () => {
    setAddChildRes('');
    if (
      formData.name === '' ||
      formData.username === '' ||
      formData.password === ''
    ) {
      setAddChildRes(I18n.t('addChildScreen.missingFields'));
      return;
    }
    dispatch(startLoading());
    await dispatch(addChild(formData));
    dispatch(finishLoading());
  };

  const renderInputs = () => (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>{I18n.t('addChildScreen.nameLabel')}</Text>
      <TextInput
        style={styles.input}
        ref={nameRef}
        autoFocus
        onSubmitEditing={() => usernameRef.current.focus()}
        blurOnSubmit={false}
        returnKeyType="next"
        placeholderTextColor="#cccccc"
        value={formData.name}
        onChangeText={(value) => setFormData({ ...formData, name: value })}
      />
      <Text style={styles.label}>{I18n.t('addChildScreen.usernameLabel')}</Text>
      <TextInput
        style={styles.input}
        ref={usernameRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        returnKeyType="next"
        placeholderTextColor="#cccccc"
        value={formData.username}
        onChangeText={(value) =>
          setFormData({ ...formData, username: value.toLowerCase() })
        }
      />

      <Text style={styles.label}>{I18n.t('addChildScreen.passwordLabel')}</Text>
      <TextInput
        style={styles.input}
        ref={passwordRef}
        onSubmitEditing={() => profitRef.current.focus()}
        blurOnSubmit={false}
        placeholderTextColor="#cccccc"
        textContentType="password"
        returnKeyType="next"
        value={formData.password}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
      />

      <Text style={styles.label}>{I18n.t('addChildScreen.profitLabel')}</Text>
      <TextInput
        style={styles.input}
        placeholder="0-100"
        ref={profitRef}
        keyboardType="numeric"
        placeholderTextColor="#cccccc"
        value={formData.profit}
        returnKeyType="done"
        onChangeText={(value) => setFormData({ ...formData, profit: value })}
      />

      <TouchableOpacity style={styles.createBtn} onPress={handlePress}>
        <Text style={styles.btnText}>
          {loading
            ? I18n.t('addChildScreen.loadingAddBtn')
            : I18n.t('addChildScreen.addBtn')}
        </Text>

        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => setShowModal(false)}
      >
        <Text style={[styles.btnText, styles.cancelBtnText]}>
          {I18n.t('addChildScreen.cancelBtn')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>
              {I18n.t('addChildScreen.title')}
            </Text>
            {addChildRes !== '' && (
              <View style={{ marginTop: 25, marginBottom: -25 }}>
                <Alert msg={addChildRes} type="error" />
              </View>
            )}
            {Platform.OS === 'android' ? (
              renderInputs()
            ) : (
              <KeyboardAvoidingView behavior="padding">
                {renderInputs()}
              </KeyboardAvoidingView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddChild;

const styles = StyleSheet.create({
  modalBody: {
    paddingTop: 125,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    marginTop: 70,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.primary,
  },
  input: {
    backgroundColor: '#eee',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  createBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 50,
  },
  cancelBtn: {
    backgroundColor: '#f4f9ec',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelBtnText: {
    color: colors.primary,
  },
});
