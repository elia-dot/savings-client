import { START_LOADING, FINISH_LOADING } from '../actions/types';

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
