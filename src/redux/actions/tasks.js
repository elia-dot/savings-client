import axios from 'axios';
import {
  GET_TASKS,
  COMPLETE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK,
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
      payload: res.data.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
