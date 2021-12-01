import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useSelector } from 'react-redux';
import colors from '../globals/styles/colors';
import Task from './Task';

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['הכל', 'הושלמו', 'לא הושלמו'];

  useEffect(() => {
    let filtered;
    if (selectedIndex === 0) setFilteredTasks(tasks);
    if (selectedIndex === 1) {
      filtered = tasks.filter((task) => task.completed);
      setFilteredTasks(filtered);
    }
    if (selectedIndex === 2) {
      filtered = tasks.filter((task) => !task.completed);
      setFilteredTasks(filtered);
    }
  }, [tasks, selectedIndex]);
  return (
    <View style={styles.body}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(i) => setSelectedIndex(i)}
        containerStyle={{
          width: '70%',
          marginStart: '50%',
          transform: [{ translateX: '130%' }],
          marginBottom: 20,
        }}
        textStyle={{
          color: colors.primary,
        }}
        selectedButtonStyle={{ backgroundColor: colors.primary }}
      />
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => <Task task={item} />}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10, marginStart: 15 }}
      />
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 15,
    overflow: 'hidden',
  },
});
