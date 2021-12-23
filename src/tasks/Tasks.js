import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ButtonGroup, FAB } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import i18n from 'i18n-js';

import colors from '../globals/styles/colors';
import { getTasks } from '../redux/actions/tasks';
import Task from './Task';
import TaskModal from './TaskModal';

const Tasks = () => {
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const buttons = [
    i18n.t('tasks.allBtn'),
    i18n.t('tasks.completedBtn'),
    i18n.t('tasks.unCompletedBtn'),
  ];

  useEffect(() => {
    if (user.type === 'child') dispatch(getTasks(user._id));
  }, [dispatch]);

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
  if (loading) return null;
  return (
    <View style={styles.body}>
      <TaskModal openModal={openModal} setOpenModal={setOpenModal} />
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(i) => setSelectedIndex(i)}
        containerStyle={{
          width: '70%',
          marginStart: '15%',
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
        initialNumToRender={10}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: 10 }}
      />
      {user.type === 'parent' && (
        <FAB
          color="#9cc95a"
          size="large"
          icon={<FontAwesome5 name="plus" color="#fff" size={20} />}
          onPress={() => setOpenModal(true)}
          placement="left"
        />
      )}
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
