import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import axios from 'axios';
import { LinearProgress } from 'react-native-elements';

import Alert from '../globals/components/Overlay';
import colors from '../globals/styles/colors';

const UpdatePasswordModal = ({ showModal, setShowModal, id }) => {
  const [formData, setFormData] = useState({ password: '' });
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    title: '',
    message: '',
    type: '',
  });
  const containerStyle = {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 10,
    padding: 20,
  };

  const updateChildPassword = async () => {
    setIsLoading(true);
    const res = await axios.post(
      `https://goals-65106.herokuapp.com/users/update-password/child/${id}`,
      formData
    );
    setIsLoading(false);
    if (res.data.status === 'success') {
      setIsAlert(true);
      setAlertMsg({
        title: '',
        message: 'סיסמא שונתה בהצלחה!',
        type: 'success',
      });
    } else {
      setIsAlert(true);
      setAlertMsg({
        title: 'אירעה שגיאה',
        message: 'לא הצלחנו לשנות את הסיסמא. אנא נסה שנית.',
        type: 'fail',
      });
    }
    setShowModal(false);
  };

  return (
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={containerStyle}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Alert
          message={alertMsg.message}
          title={alertMsg.title}
          type={alertMsg.type}
          isAlert={isAlert}
          setIsAlert={setIsAlert}
        />
        <Text style={styles.label}>סיסמא חדשה:</Text>
        <TextInput
          style={styles.input}
          autoFocus
          value={formData.email}
          returnKeyType="done"
          onChangeText={(value) => setFormData({ password: value })}
        />
        <TouchableOpacity style={styles.btn} onPress={updateChildPassword}>
          <Text style={styles.btnText}> {isLoading ? 'מעדכן' : 'עדכן'}</Text>
          {isLoading && (
            <LinearProgress color="#fff" style={{ marginTop: 1 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setShowModal(false)}
        >
          <Text style={styles.cancelBtnText}> ביטול</Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
};

export default UpdatePasswordModal;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.primary,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 25,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#f4f9ec',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelBtnText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 20,
  },
});
