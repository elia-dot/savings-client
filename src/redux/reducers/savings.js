import { GET_HISTORY } from '../actions/types';

const initialState = {
  history: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HISTORY:
      return {
        ...state,
        history: payload,
      };
    default:
      return state;
  }
}
