import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from 'react-native-elements';

import colors from '../globals/styles/colors';
import { completeTask } from '../redux/actions/tasks';

const TaskMenu = ({ showMenu, setShowMenu, task }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
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
            <TouchableOpacity style={styles.btn} onPress={handleComplete}>
              <Text style={styles.btnText}> אשר השלמת משימה</Text>
              {loading && (
                <LinearProgress color="#fff" style={{ marginTop: 1 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}> שלח תזכורת</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}>
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
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
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
