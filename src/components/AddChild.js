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

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';
import { addChild } from '../redux/actions/auth';
import { finishLoading, startLoading } from '../redux/actions/globals';

const AddChild = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.globals);
  const [isAlert, setIsAlert] = useState(false);
  const [addChildRes, setAddChildRes] = useState({
    message: '',
    type: '',
    title: '',
  });
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
      setIsAlert(true);
      setAddChildRes({
        title: 'שגיאה!',
        message: 'שם המשתמש תפוס. נא בחר שם משתמש אחר',
        type: 'fail',
      });
    } else if (
      error === 'Child password must be different from the parent password'
    ) {
      setIsAlert(true);
      setAddChildRes({
        title: 'שגיאה!',
        message: 'אנא בחר סיסמא שונה מהסיסמא שלך',
        type: 'fail',
      });
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
    dispatch(startLoading());
    await dispatch(addChild(formData));
    dispatch(finishLoading());
  };

  const renderInputs = () => (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>שם:</Text>
      <TextInput
        style={styles.input}
        ref={nameRef}
        autoFocus
        onSubmitEditing={() => usernameRef.current.focus()}
        blurOnSubmit={false}
        placeholder="שם הילד"
        returnKeyType="next"
        placeholderTextColor="#cccccc"
        value={formData.name}
        onChangeText={(value) => setFormData({ ...formData, name: value })}
      />
      <Text style={styles.label}>בחר שם משתמש:</Text>
      <TextInput
        style={styles.input}
        ref={usernameRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        placeholder="שם משתמש"
        returnKeyType="next"
        placeholderTextColor="#cccccc"
        value={formData.username}
        onChangeText={(value) =>
          setFormData({ ...formData, username: value.toLowerCase() })
        }
      />

      <Text style={styles.label}>בחר סיסמא:</Text>
      <TextInput
        style={styles.input}
        ref={passwordRef}
        onSubmitEditing={() => profitRef.current.focus()}
        blurOnSubmit={false}
        placeholder="סיסמא"
        placeholderTextColor="#cccccc"
        textContentType="password"
        returnKeyType="next"
        value={formData.password}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
      />

      <Text style={styles.label}>אחוז ריבית חודשית:</Text>
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
          {loading ? 'מעדכן חשבון...' : 'עדכן'}
        </Text>

        {loading && <LinearProgress color="#fff" style={{ marginTop: 1 }} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => setShowModal(false)}
      >
        <Text style={[styles.btnText, styles.cancelBtnText]}>ביטול</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <Alert
          isAlert={isAlert}
          setIsAlert={setIsAlert}
          title={addChildRes.title}
          message={addChildRes.message}
          type={addChildRes.type}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>הוסף חשבון ילד</Text>
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
