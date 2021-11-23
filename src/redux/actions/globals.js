import { FINISH_LOADING, START_LOADING } from './types';

export const startLoading = () => (dispatch) => {
  dispatch({
    type: START_LOADING,
  });
};

export const finishLoading = () => (dispatch) => {
  dispatch({
    type: FINISH_LOADING,
  });
};
