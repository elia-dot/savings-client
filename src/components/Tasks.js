import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import Task from './Task';

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks}
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
    overflow: 'hidden'
  },
});
