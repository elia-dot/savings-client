import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootRedusers from './reducers';

const initialState = {};
const middlewares = [thunk]

const store = createStore(rootRedusers, initialState, applyMiddleware(...middlewares));

export default store;
