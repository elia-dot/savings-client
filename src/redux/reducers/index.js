import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';
import globals from './globals';
import savings from './savings';

export default combineReducers({ auth, goals, globals, savings });
