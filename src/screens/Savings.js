import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FAB, LinearProgress } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createSaving, getAllSavings, getAllGoals } from '../api';
import Saving from '../components/Saving';
import { useAuth } from '../context/authContext';
import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';

export default function Savings() {
  const { user, setSaving } = useAuth();
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [savingsOrder, setSavingsOrder] = useState(null);
  const [dateOrder, setDateOrder] = useState(null);
  const [goals, setGoals] = useState([]);

  const [formData, setFormData] = useState({ amount: '', target: goals[0] });
  const queryClient = useQueryClient();

  const userId = user._id.toString();

  const { data } = useQuery(['savings', userId], () => getAllSavings(userId));
  const { mutateAsync } = useMutation(createSaving);

  const { data: goalData, refetch } = useQuery(['goals', userId], () =>
    getAllGoals(userId)
  );

  useEffect(() => {
    goalData && setGoals(goalData.data);
  }, [goalData]);

  const openSavingModal = () => {
    refetch();
    if (goals.length === 0) {
      setErrorMsg('You have to set atleast one goal to start saving!');
      setIsError(true);
    } else {
      setShowModal(true);
    }
  };

  const save = async () => {
    if (formData.amount === '' || !formData.target) {
      setErrorMsg('Please fill all the fields!');
      setIsError(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await mutateAsync(formData);
    queryClient.invalidateQueries('savings');
    if (res.data.status === 'fail') {
      setErrorMsg(res.data.error);
    }
    setSaving((prev) => prev + formData.amount * 1);
    setLoading(false);
    setFormData({ amount: '' });
    setShowModal(false);
  };

  //sort by amount

  const ascendingAmount = (data) => {
    data.sort((a, b) =>
      a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
    );
    return data;
  };

  const descendingAmount = (data) => {
    data.sort((a, b) =>
      a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
    );
    return data;
  };

  const sortSavings = () => {
    setDateOrder(null);
    if (savingsOrder === null || savingsOrder === 'descending') {
      const orderdData = ascendingAmount(savings);
      setSavingsOrder('ascending');
      setSavings(orderdData);
    }

    if (savingsOrder === 'ascending') {
      const orderdData = descendingAmount(savings);
      setSavingsOrder('descending');
      setSavings(orderdData);
    }
  };

  //sort by date

  const ascendingDate = (data) => {
    data.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    );
    return data;
  };

  const descendingDate = (data) => {
    data.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0
    );
    return data;
  };

  const sortByDate = () => {
    setSavingsOrder(null);
    if (dateOrder === null || dateOrder === 'descending') {
      const orderdData = ascendingDate(savings);
      setDateOrder('ascending');
      setSavings(orderdData);
    }

    if (dateOrder === 'ascending') {
      const orderdData = descendingDate(savings);
      setDateOrder('descending');
      setSavings(orderdData);
    }
  };

  useEffect(() => {
    data && setSavings(data.data);
  }, [data]);
  return (
    <View style={styles.body}>
      <Alert errorMsg={errorMsg} isError={isError} setIsError={setIsError} />
      <Modal visible={showModal} animationType="slide">
        <Alert errorMsg={errorMsg} isError={isError} setIsError={setIsError} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>How much do you want to save?</Text>
            <Text style={styles.label}>Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="Saving Amount"
              placeholderTextColor="#cccccc"
              value={formData.amount.toString()}
              keyboardType="decimal-pad"
              onChangeText={(value) =>
                setFormData({ ...formData, amount: value })
              }
            />
            <Text style={styles.label}>Select Goal:</Text>
            <Picker
              selectedValue={formData.target}
              onValueChange={(itemValue, itemIndex) =>
                setFormData({ ...formData, target: itemValue })
              }
              style={styles.picker}
            >
              <Picker.Item label="Select Goal" value="Select Goal" key={0} />
              {goals.map((g) => (
                <Picker.Item label={g.title} value={g._id} key={g._id} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.createBtn} onPress={() => save()}>
              <Text style={styles.btnText}>
                {loading ? 'Please wait...' : 'Submit'}
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
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.title}>Savings History:</Text>
      <View style={styles.header}>
        <Text style={styles.headerText} onPress={() => sortSavings()}>
          Amount{' '}
          {
            <FontAwesome5
              name={
                savingsOrder === null
                  ? ''
                  : savingsOrder === 'ascending'
                  ? 'caret-down'
                  : 'caret-up'
              }
            />
          }
        </Text>
        <Text
          style={styles.headerText}
          onPress={() => {
            sortByDate();
          }}
        >
          Date
          {
            <FontAwesome5
              name={
                dateOrder === null
                  ? ''
                  : dateOrder === 'ascending'
                  ? 'caret-down'
                  : 'caret-up'
              }
            />
          }
        </Text>
      </View>
      <FlatList
        data={savings}
        renderItem={({ item }) => <Saving saving={item} />}
        keyExtractor={(item) => item._id}
      />
      <FAB
        color="#9cc95a"
        size="large"
        icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
        onPress={openSavingModal}
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    position: 'relative',
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  headerText: {
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '600',
    marginVertical: 35,
    color: '#c6c6c6',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
  },
  modalBody: {
    paddingTop: 125,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 100,
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
    textAlign: 'left',
    marginBottom: 50,
  },
  picker: {
    marginTop: -84,
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
