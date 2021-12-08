import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from 'react-native-elements';

import colors from '../globals/styles/colors';
import { addSaving } from '../redux/actions/savings';

const SavingModal = ({ openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({ amount: '', description: '' });
  const [loading, setLoading] = useState(false);
  const { child } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const save = async () => {
    setLoading(true);
    await dispatch(addSaving(child._id, formData));
    setLoading(false);
    setFormData({ amount: '', description: '' });
    setOpenModal(false);
  };
  return (
    <Modal visible={openModal} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>פרטי ההפקדה או המשיכה</Text>
          <TextInput
            style={styles.input}
            placeholder="סכום ההפקדה/משיכה"
            placeholderTextColor="#cccccc"
            value={formData.amount.toString()}
            keyboardType="numbers-and-punctuation"
            onChangeText={(value) =>
              setFormData({ ...formData, amount: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="תיאור"
            placeholderTextColor="#cccccc"
            value={formData.description}
            onChangeText={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
          <TouchableOpacity style={styles.createBtn} onPress={() => save()}>
            <Text style={styles.btnText}>
              {loading ? 'מעדכן...' : 'עדכן סכום'}
            </Text>

            {loading && (
              <LinearProgress color="#fff" style={{ marginTop: 1 }} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setOpenModal(false)}
          >
            <Text style={[styles.btnText, styles.cancelBtnText]}>ביטול</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SavingModal;

const styles = StyleSheet.create({
  modalBody: {
    paddingTop: 125,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 100,
    textAlign: 'center',
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
