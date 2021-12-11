import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LOAD_ERROR,
  LOAD_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  LOGOUT,
  ADD_CHILD,
  GET_CHILD,
  ADD_CHILD_ERROR,
  SIGNUP_SUCCESS,
} from './types';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

const setStorage = async (userId, userType) => {
  try {
    await AsyncStorage.multiSet([
      ['userId', userId],
      ['userType', userType],
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
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const signup = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/signup`, data, config);
    const userType = res.data.data.user.type;
    setStorage(res.data.data.user._id, userType);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  const userId = await AsyncStorage.getItem('userId');
  const userType = await AsyncStorage.getItem('userType');
  if (userId) {
    try {
      let res;
      if (userType === 'parent')
        res = await axios(`${baseUrl}/users/${userId}`);
      else if (userType === 'child')
        res = await axios(`${baseUrl}/users/child/${userId}`);
      dispatch({
        type: LOAD_USER,
        payload: res.data.data.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: LOAD_ERROR,
      });
    }
  } else {
    dispatch({
      type: LOAD_ERROR,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.multiRemove(['userId', 'userType']);
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addChild = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/add-child`, data, config);
    dispatch({
      type: ADD_CHILD,
      payload: res.data.data.newChild,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CHILD_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const getChild = (id) => async (dispatch) => {
  try {
    const res = await axios(`${baseUrl}/users/child/${id}`);
    dispatch({
      type: GET_CHILD,
      payload: res.data.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateChildPassword = (pass, id) => async (dispatch) => {
//   try {
//     await axios.patch(`${baseUrl}/child/${id}`, pass, config)
//   } catch (error) {
//     console.log(error);
//   }
// }