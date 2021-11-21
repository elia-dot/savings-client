import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootRedusers from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootRedusers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store
