import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';

export default combineReducers({ auth, goals });