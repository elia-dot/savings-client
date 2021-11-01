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
import { useMutation, useQueryClient } from 'react-query';

import { createGoal, update } from '../api';
import Alert from '../components/Overlay';

const GoalForm = ({ showModal, setShowModal, goal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    price: goal?.price || '',
    icon: goal?.icon || '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const { mutateAsync } = useMutation(createGoal);
  const { mutateAsync: updateAsync } = useMutation(update);
  const queryClient = useQueryClient();

  const categories = [
    { label: 'Other', value: 'question', key: '0' },
    { label: 'Home', value: 'home', key: '1' },
    { label: 'Entertainment', value: 'gamepad', key: '2' },
    { label: 'Vacation', value: 'plane', key: '3' },
  ];

  const createNewGoal = async () => {
    const res = await mutateAsync(formData);
    queryClient.invalidateQueries('goals');
    if (res.data.status === 'fail') {
      setErrorMsg(res.data.error);
    }
  };

  const updateGoal = async () => {
    const res = await updateAsync({ id: goal._id, data: formData });
    queryClient.invalidateQueries('goals');
    if (res.data.status === 'fail') {
      setErrorMsg(res.data.error);
    }
  };

  const handlePress = async () => {
    if (
      formData.title === '' ||
      formData.price === '' ||
      formData.icon === ''
    ) {
      setErrorMsg('Please fill all the fields!');
      setIsError(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    if (goal) {
      await updateGoal();
    } else {
      await createNewGoal();
    }

    setFormData({
      title: goal?.title || '',
      price: goal?.price || '',
      icon: goal?.icon || '',
    });
    setLoading(false);
    setShowModal(false);
  };
  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <Alert errorMsg={errorMsg} isError={isError} setIsError={setIsError} />
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Let's create your saving goal!</Text>
          <View style={styles.form}>
            <Text>{errorMsg}</Text>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal title"
              placeholderTextColor="#cccccc"
              value={formData.title}
              onChangeText={(value) =>
                setFormData({ ...formData, title: value.toLowerCase() })
              }
            />
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal price"
              placeholderTextColor="#cccccc"
              value={formData.price.toString()}
              keyboardType="number-pad"
              onChangeText={(value) =>
                setFormData({ ...formData, price: value })
              }
            />
            <Text style={styles.label}>Category:</Text>
            <RNPickerSelect
              items={categories}
              onValueChange={(value) =>
                setFormData({ ...formData, icon: value })
              }
              placeholder={{ label: 'Please select category', value: null }}
              style={pickerSelectStyles}
            />

            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => handlePress()}
            >
              {goal ? (
                <Text style={styles.btnText}>
                  {loading ? 'Please wait...' : 'Update Goal'}
                </Text>
              ) : (
                <Text style={styles.btnText}>
                  {loading ? 'Please wait...' : 'Create Goal'}
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
              <Text style={[styles.btnText, styles.cancelBtnText]}>Cancel</Text>
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
    fontSize: 25,
    fontWeight: '500',
  },
  form: {
    marginTop: 100,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: '#9cc95a',
  },
  input: {
    backgroundColor: '#eee',
    borderBottomColor: '#9cc95a',
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  createBtn: {
    backgroundColor: '#9cc95a',
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
    color: '#9cc95a',
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
