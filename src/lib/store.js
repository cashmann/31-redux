import {createStore} from 'redux';
import catReducer from '../reducer/category';

export default ()=> createStore(catReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
