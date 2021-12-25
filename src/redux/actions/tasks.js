import axios from 'axios';
import {
  GET_TASKS,
  COMPLETE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK,
  UPDATE_TOTAL,
} from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

export const getTasks = (userId) => async (dispatch) => {
  try {
    const res = await axios(`${baseUrl}/tasks/users/${userId}`);
    dispatch({
      type: GET_TASKS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (userId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/tasks/${userId}`, data, config);
    console.log(res.data);
    dispatch({
      type: CREATE_TASK,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const completeTask = (taskId, userId, data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${baseUrl}/tasks/${userId}/${taskId}`,
      data,
      config
    );
    dispatch({
      type: COMPLETE_TASK,
      payload: taskId,
    });
    dispatch({
      type: UPDATE_TOTAL,
      payload: res.data.totalSaving,
    });
  } catch (error) {
    console.log(error);
  }
};
