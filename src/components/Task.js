import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../globals/styles/colors';
import currency from '../globals/styles/currency';
import { sendPushNotification } from '../utils/sendNotification';
import TaskMenu from './TaskMenu';
import { startLoading, finishLoading } from '../redux/actions/globals';
import Loader from '../globals/components/Loader';

const Task = ({ task }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const markAsCompleted = async () => {
    dispatch(startLoading());
    const body = {
      userId: user.parent,
      title: 'משימה הושלמה!',
      body: `${user.name} סיים את המשימה: ${task.title}`,
    };
    await sendPushNotification(body);
    dispatch(finishLoading());
  };
  const handlePress = () => {
    user.type === 'parent' ? setShowMenu(true) : markAsCompleted();
  };

  return (
    <View style={styles.body}>
      <Loader title="שולח להורה.." />
      <TaskMenu showMenu={showMenu} setShowMenu={setShowMenu} task={task} />
      <View style={[styles.taskColumn]}>
        <CheckBox
          onPress={handlePress}
          checked={task.completed}
          checkedColor={colors.primary}
          containerStyle={{
            backgroundColor: 'none',
            padding: 0,
            borderWidth: 0,
          }}
        />
      </View>
      <View style={[styles.taskColumn, styles.taskDesc]}>
        <Text style={styles.taskText}>{task.title}</Text>
      </View>
      <View style={[styles.taskColumn]}>
        <Text>
          {task.price}
          {currency.NIS}
        </Text>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.secondary,
    borderBottomWidth: 0.5,
  },
  taskColumn: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  taskDesc: {
    width: '65%',
  },
  taskText: {
    textAlign: 'left',
  },
});
