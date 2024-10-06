import {combineReducers} from 'redux';
import todoSlice from '../redux/todoSlice';

const rootreducers = combineReducers({
  todos: todoSlice,
});

export default rootreducers;
