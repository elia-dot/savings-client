import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';
import { createGoal, updateGoal } from '../redux/actions/goals';

const GoalForm = ({ showModal, setShowModal, goal, loading, setLoading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    price: goal?.price || '',
    icon: goal?.icon || '',
  });

  const [errorMsg, setErrorMsg] = useState({ title: '', message: '' });
  const [isAlert, setIsAlert] = useState(false);
  console.log(loading);

  const categories = [
    { label: 'Other', value: 'question', key: '0' },
    { label: 'Home', value: 'home', key: '1' },
    { label: 'Entertainment', value: 'gamepad', key: '2' },
    { label: 'Vacation', value: 'plane', key: '3' },
  ];

  const createNewGoal = async () => {
    dispatch(createGoal(user._id, formData));
  };

  const update = () => {
    dispatch(updateGoal(goal._id, formData));
  };

  const handlePress = async () => {
    setLoading(true);
    if (
      formData.title === '' ||
      formData.price === '' ||
      formData.icon === ''
    ) {
      setErrorMsg({
        title: 'Missing Details',
        message: 'Please fill all the fields!',
      });
      setIsAlert(true);
      setLoading(false);
      return;
    }
    setErrorMsg('');

    if (goal) {
      update();
    } else {
      createNewGoal();
    }

    setFormData({
      title: goal?.title || '',
      price: goal?.price || '',
      icon: goal?.icon || '',
    });
    setShowModal(false);
    setLoading(false);
  };

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <Alert
          message={errorMsg.message}
          title={errorMsg.title}
          type="fail"
          isAlert={isAlert}
          setIsAlert={setIsAlert}
        />
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>
            {goal ? 'עדכן פרטי מטרה' : 'צור מטרה חדשה'}
          </Text>
          <View style={styles.form}>
            <Text style={styles.label}>שם:</Text>
            <TextInput
              style={styles.input}
              placeholder="שם המטרה"
              placeholderTextColor="#cccccc"
              value={formData.title}
              onChangeText={(value) =>
                setFormData({ ...formData, title: value.toLowerCase() })
              }
            />
            <Text style={styles.label}>מחיר:</Text>
            <TextInput
              style={styles.input}
              placeholder="מחיר המטרה"
              placeholderTextColor="#cccccc"
              value={formData.price.toString()}
              keyboardType="number-pad"
              onChangeText={(value) =>
                setFormData({ ...formData, price: value })
              }
            />
            <Text style={styles.label}>קטגוריה:</Text>
            <RNPickerSelect
              items={categories}
              onValueChange={(value) =>
                setFormData({ ...formData, icon: value })
              }
              placeholder={{ label: 'בחר קטגוריה', value: null }}
              style={pickerSelectStyles}
            />

            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => handlePress()}
            >
              {goal ? (
                <Text style={styles.btnText}>
                  {loading ? 'מעדכן מטרה...' : 'עדכן מטרה'}
                </Text>
              ) : (
                <Text style={styles.btnText}>
                  {loading ? 'יוצר מטרה...' : 'צור מטרה'}
                </Text>
              )}
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={[styles.btnText, styles.cancelBtnText]}>ביטול</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f4f9ec',
    color: '#000',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#f4f9ec',
    borderRadius: 8,
    color: 'black',
  },
});

export default GoalForm;
