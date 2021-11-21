import { GET_ALL_GOALS, DELETE_GOAL, GOALS_ERROR } from '../actions/types';

const initialState = {
  goals: null,
  loading: true,
  error: null
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
        goals: goals.filter((goal) => goal._id !== payload),
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
