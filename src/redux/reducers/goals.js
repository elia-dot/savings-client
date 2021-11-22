import {
  GET_ALL_GOALS,
  CREATE_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
  GOALS_ERROR,
} from '../actions/types';

const initialState = {
  goals: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_GOALS:
      return {
        ...state,
        goals: payload,
        loading: false,
      };
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal._id !== payload),
        loading: false,
      };
    case UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map((goal) => (goal._id === payload._id ? payload : goal)),
        loading: false,
      };
    case GOALS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
