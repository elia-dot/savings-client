import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearProgress } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Goal from '../components/Goal';
import NoGoals from '../components/NoGoals';
import { useAuth } from '../context/authContext';
import { capitalize } from '../utils/capitalize';
import { createGoal, getAllGoals } from '../api';
import Alert from '../components/Overlay';

export default function Goals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', price: '', icon: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const userId = user._id.toString();

  const { data, isLoading } = useQuery(['goals', userId], () =>
    getAllGoals(userId)
  );

  useEffect(() => {
    data && setGoals(data.data);
  }, [data]);

  const { mutateAsync } = useMutation(createGoal);
  const queryClient = useQueryClient();

  const categories = [
    { label: 'Other', value: 'question', key: '0' },
    { label: 'Home', value: 'home', key: '1' },
    { label: 'Entertainment', value: 'gamepad', key: '2' },
    { label: 'Vacation', value: 'plane', key: '3' },
  ];

  useEffect(() => {}, []);

  const handleCreate = async () => {
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
    const res = await mutateAsync(formData);
    queryClient.invalidateQueries('goals');
    if (res.data.status === 'fail') {
      setErrorMsg(res.data.error);
    }
    setLoading(false);
    setShowModal(false);
  };
  return (
    <View style={styles.body}>
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
              value={formData.price}
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
              onPress={() => handleCreate()}
            >
              <Text style={styles.btnText}>
                {loading ? 'Please wait...' : 'Create Goal'}
              </Text>
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
      <View>
        <View style={styles.totalSavings}>
          <Text style={styles.title}>
            {capitalize(user.name)}, you've already saved:
          </Text>
          <Text style={styles.savings}>
            {user.saving.toLocaleString()}
            <Text style={styles.currency}> $</Text>
          </Text>
        </View>
      </View>
      {goals.length > 0 && (
        <>
          <FlatList
            data={goals}
            renderItem={({ item }) => <Goal goal={item} />}
            keyExtractor={(item) => item._id}
          />
          <FAB
            placement="right"
            color="#9cc95a"
            size="large"
            icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </>
      )}
      {goals.length === 0 && !isLoading && <NoGoals />}
      {isLoading && (
        <LinearProgress
          color="#9cc95a"
          style={{ marginTop: 100, width: '75%', marginLeft: '12.5%' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
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
  title: {
    fontSize: 20,
  },
  totalSavings: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 50,
  },
  savings: {
    fontSize: 60,
    fontWeight: '800',
    marginTop: 15,
  },
  currency: {
    fontSize: 25,
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
