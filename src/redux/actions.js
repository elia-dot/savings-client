import axios from 'axios';

const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const LOGIN_FAILED = 'LOGIN_FAILED';
const SIGNUP_FAILED = 'SIGNUP_FAILED';

const baseUrl = 'https://goals-65106.herokuapp.com/users';

export const login = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${baseUrl}/login`, data, config);
    dispatch({
      type: LOGIN,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.error,
    });
  }
};
