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
import { createTask } from '../redux/actions/tasks';
import i18n from 'i18n-js';

const TaskModal = ({ openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({ title: '', price: '' });
  const [loading, setLoading] = useState(false);
  const { child } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const save = async () => {
    setLoading(true);
    await dispatch(createTask(child._id, formData));
    setLoading(false);
    setFormData({ title: '', price: '' });
    setOpenModal(false);
  };
  return (
    <Modal visible={openModal} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>
            {' '}
            {i18n.t('tasks.createTaskTitle')}
          </Text>
          <Text style={styles.label}>{i18n.t('tasks.descriptionLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#cccccc"
            value={formData.title}
            onChangeText={(value) => setFormData({ ...formData, title: value })}
          />
          <Text style={styles.label}>{i18n.t('tasks.priceLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#cccccc"
            value={formData.price.toString()}
            keyboardType="numeric"
            onChangeText={(value) => setFormData({ ...formData, price: value })}
          />
          <TouchableOpacity
            style={styles.createBtn}
            disabled={formData.title === '' || formData.price === ''}
            onPress={() => save()}
          >
            <Text style={styles.btnText}>
              {loading
                ? i18n.t('tasks.loadingCreateBtn')
                : i18n.t('tasks.createBtn')}
            </Text>

            {loading && (
              <LinearProgress color="#fff" style={{ marginTop: 1 }} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setOpenModal(false)}
          >
            <Text style={[styles.btnText, styles.cancelBtnText]}>
              {i18n.t('tasks.cancelBtn')}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TaskModal;

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
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.primary,
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
