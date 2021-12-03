import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';
import { addChild } from '../redux/actions/auth';
import { finishLoading, startLoading } from '../redux/actions/globals';

const AddChild = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  // const { loading } = useSelector((state) => state.globals);
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

  useEffect(() => {
    if (error === 'this username already exsits') {
      setIsAlert(true);
      setAddChildRes({
        title: 'שגיאה!',
        message: 'שם המשתמש תפוס. נא בחר שם משתמש אחר',
        type: 'fail',
      });
      return;
    }
    if (error === 'Child password must be different from the parent password') {
      setIsAlert(true);
      setAddChildRes({
        title: 'שגיאה!',
        message: 'אנא בחר סיסמא שונה מהסיסמא שלך',
        type: 'fail',
      });
      return;
    }
  }, [error]);

  const handlePress = async () => {
    await dispatch(addChild(formData));
    if (!loading && !error) setShowModal(false);
  };
  console.log(loading);

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
            <View style={styles.form}>
              <Text style={styles.label}>שם:</Text>
              <TextInput
                style={styles.input}
                placeholder="שם הילד"
                placeholderTextColor="#cccccc"
                value={formData.name}
                onChangeText={(value) =>
                  setFormData({ ...formData, name: value })
                }
              />
              <Text style={styles.label}>בחר שם משתמש:</Text>
              <TextInput
                style={styles.input}
                placeholder="שם משתמש"
                placeholderTextColor="#cccccc"
                value={formData.username}
                onChangeText={(value) =>
                  setFormData({ ...formData, username: value })
                }
              />

              <Text style={styles.label}>בחר סיסמא:</Text>
              <TextInput
                style={styles.input}
                placeholder="סיסמא"
                placeholderTextColor="#cccccc"
                textContentType="password"
                value={formData.password}
                onChangeText={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />

              <Text style={styles.label}>אחוז ריבית חודשית:</Text>
              <TextInput
                style={styles.input}
                placeholder="0-100"
                keyboardType="numeric"
                placeholderTextColor="#cccccc"
                value={formData.profit}
                onChangeText={(value) =>
                  setFormData({ ...formData, profit: value })
                }
              />

              <TouchableOpacity style={styles.createBtn} onPress={handlePress}>
                <Text style={styles.btnText}>
                  {loading ? 'מעדכן חשבון...' : 'עדכן'}
                </Text>

                {loading && (
                  <LinearProgress color="#fff" style={{ marginTop: 1 }} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.btnText, styles.cancelBtnText]}>
                  ביטול
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 100,
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
    marginTop: 100,
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
