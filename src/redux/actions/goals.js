import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GET_ALL_GOALS, DELETE_GOAL, GOALS_ERROR } from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

const getAllGoals = () => async (dispatch) => {
  let userId;
  try {
    userId = await AsyncStorage.getItem('userId');
  } catch (error) {
    console.log(error);
  }
  try {
    const res = await axios(`${baseUrl}/goals/users/${userId}`);
    dispatch({
      type: GET_ALL_GOALS,
      payload: res.data.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GOALS_ERROR,
      payload: error.response.data.error,
    });
  }
};

const deleteGoal = (goalId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${baseUrl}/goals/${goalId}`);
    console.log(res.data);
    dispatch({
      type: DELETE_GOAL,
      payload: goalId,
    });
  } catch (error) {
    console.log('error', error);
  }
};
