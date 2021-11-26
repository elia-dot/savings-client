import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GET_ALL_GOALS,
  CREATE_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
  GOALS_ERROR,
} from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

export const getAllGoals = () => async (dispatch) => {
  let userId;
  try {
    userId = await AsyncStorage.getItem('userId');
  } catch (error) {
    console.log('goals error', error);
  }
  try {
    const res = await axios(`${baseUrl}/goals/users/${userId}`);
    dispatch({
      type: GET_ALL_GOALS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GOALS_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const createGoal = (userId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/goals/${userId}`,data, config);
    dispatch({
      type: CREATE_GOAL,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GOALS_ERROR,
      payload: error,
    });
  }
};

export const updateGoal = (goalId, data) => async (dispatch) => {
  try {
    const res = await axios.patch(`${baseUrl}/goals/${goalId}`, data, config);
    dispatch({
      type: UPDATE_GOAL,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GOALS_ERROR,
      payload: error,
    });
  }
};

export const deleteGoal = (goalId) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/goals/${goalId}`);
    dispatch({
      type: DELETE_GOAL,
      payload: goalId,
    });
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: GOALS_ERROR,
      payload: error,
    });
  }
};
