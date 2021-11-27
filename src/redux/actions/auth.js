import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LOAD_ERROR,
  LOAD_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

const setStorage = async (userId, userType) => {
  try {
    await AsyncStorage.multiSet([
      ['userId', userId],
      ['type', userType],
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, data, config);
    const userType = res.data.data.user.type;
    setStorage(res.data.data.user._id, userType);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const userId = await AsyncStorage.multiGet(['userId']);
    const userType = await AsyncStorage.multiGet(['userType']);
    if (userId) {
      try {
        let res;
        if (userType === 'parent')
          res = await axios(`${baseUrl}/users/${userId}`);
        else res = await axios(`${baseUrl}/users/child/${userId[0][1]}`);
        dispatch({
          type: LOAD_USER,
          payload: res.data.data.data,
        });
      } catch (error) {
        console.log(error.data);
        dispatch({
          type: LOAD_ERROR,
        });
      }
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.multiRemove(['userId', 'type']);
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
