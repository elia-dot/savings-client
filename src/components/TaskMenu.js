import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from 'react-native-elements';

import colors from '../globals/styles/colors';
import { completeTask } from '../redux/actions/tasks';
import { sendPushNotification } from '../utils/sendNotification';

const TaskMenu = ({ showMenu, setShowMenu, task }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [remindLoading, setRemindLoading] = useState(false);
  const dispatch = useDispatch();
  const containerStyle = {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 10,
    padding: 20,
  };

  const handleComplete = async () => {
    const data = { amount: task.price, description: 'השלמת משימה' };
    setLoading(true);
    await dispatch(completeTask(task._id, task.assignTo, data));
    setLoading(false);
    setShowMenu(false);
  };

  const uncompleteTask = async () => {
    const data = { amount: task.price * -1, description: 'ביטול השלמת משימה' };
    setLoading(true);
    await dispatch(completeTask(task._id, task.assignTo, data));
    setLoading(false);
    setShowMenu(false);
  };

  const sendReminder = async () => {
    setRemindLoading(true);
    const body = {
      userId: user._id,
      title: 'תזכורת',
      body: ` ${task.title}:זוהי תזכורת להשלמת המשימה `,
    };
    sendPushNotification(body);
    setRemindLoading(false);
  };
  return (
    <Portal>
      <Modal
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        contentContainerStyle={containerStyle}
        style={{ flex: 1, alignItems: 'center' }}
      >
        {user.type === 'parent' && (
          <>
            {!task.completed ? (
              <TouchableOpacity style={styles.btn} onPress={handleComplete}>
                <Text style={styles.btnText}> אשר השלמת משימה</Text>
                {loading && (
                  <LinearProgress color="#fff" style={{ marginTop: 1 }} />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btn} onPress={uncompleteTask}>
                <Text style={styles.btnText}> בטל השלמת משימה</Text>
                {loading && (
                  <LinearProgress color="#fff" style={{ marginTop: 1 }} />
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btn} onPress={sendReminder}>
              <Text style={styles.btnText}> שלח תזכורת</Text>
              {remindLoading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.cancelBtnText}> ביטול</Text>
            </TouchableOpacity>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default TaskMenu;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 25,
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
