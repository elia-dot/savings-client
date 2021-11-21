import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootRedusers from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootRedusers,
  initialState,
  applyMiddleware(...middleware)
);

export default store
