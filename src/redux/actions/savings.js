import axios from 'axios';
import { ADD_SAVING, GET_HISTORY, UPDATE_TOTAL } from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

export const getHistory = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/savings/users/${userId}`);
    dispatch({
      type: GET_HISTORY,
      payload: res.data.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSaving = (userId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/savings/${userId}`, data, config);
    dispatch({
      type: ADD_SAVING,
      payload: res.data.data,
    });
    dispatch({
      type : UPDATE_TOTAL,
      payload: res.data.totalSaving
    })
  } catch (error) {
    console.log(error);
  }
};
