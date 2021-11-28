import {
  GET_TASKS,
  COMPLETE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK,
} from '../actions/types';

const initialState = {
  tasks: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    default:
      return state;
  }
}
