import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOAD_USER,
  LOAD_ERROR,
  LOGOUT,
  ADD_CHILD_ERROR,
  ADD_CHILD,
  GET_CHILD,
  UPDATE_TOTAL,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: true,
  child: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
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
    case SIGNUP_FAILED:
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
    case ADD_CHILD:
      return {
        ...state,
        error: null,
        user: { ...state.user, children: [...state.user.children, payload] },
        loading: false,
      };
    case GET_CHILD:
      return {
        ...state,
        error: null,
        child: payload,
        loading: false,
      };
    case ADD_CHILD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        child: { ...state.child, saving: payload },
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
