import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import colors from '../globals/styles/colors';
import currency from '../globals/styles/currency';

const Task = ({ task }) => {
  return (
    <View style={styles.body}>
      <View style={[styles.taskColumn]}>
        <CheckBox
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
    width: '68%',
  },
  taskText: {
    textAlign: 'left',
  },
});
