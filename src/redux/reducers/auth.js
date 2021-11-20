import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOAD_USER,
  LOAD_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: payload,
        loading: false,
      };
    case LOAD_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
