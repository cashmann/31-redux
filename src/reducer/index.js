import { combineReducers } from 'redux';

import categories from './category';
import expenses from './expense';
import error from './error';


export default combineReducers({
  categories,
  expenses, 
  error,
});