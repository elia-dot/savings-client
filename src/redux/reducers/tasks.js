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
  loding: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t._id !== payload.taskId ? t : { ...t, completed: true }
        ),
        loding: false,
      };
    default:
      return state;
  }
}
