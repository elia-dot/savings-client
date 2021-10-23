import { LOGIN, SIGNUP, LOGIN_FAILED, SIGNUP_FAILED } from '../actions';

const initialState = {
  user: null,
  isAuthenticated: false,
  errors: null,
};

export default userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return { ...state, user: payload, isAuthenticated: true };
    case SIGNUP:
      return { ...state, user: payload, isAuthenticated: true };
    case LOGIN_FAILED:
      return { ...state, user: null, isAuthenticated: false, errors: payload };
    case SIGNUP_FAILED:
      return { ...state, user: null, isAuthenticated: false, errors: payload };
    default:
      return state;
  }
};
