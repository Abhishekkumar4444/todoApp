import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} from './todoSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetch Todos
function* fetchTodos() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTodosSuccess(response.data.slice(0,4)));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Add a Todo
function* addTodo(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addTodoSuccess(response.data));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

// Update a Todo
function* updateTodo(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updateTodoSuccess(response.data));
  } catch (error) {
    yield put(updateTodoFailure(error.message));
  }
}

// Delete a Todo
function* deleteTodo(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

// Watcher saga
export default function* todoSaga() {
  yield takeEvery(fetchTodosRequest.type, fetchTodos);
  yield takeEvery(addTodoRequest.type, addTodo);
  yield takeEvery(updateTodoRequest.type, updateTodo);
  yield takeEvery(deleteTodoRequest.type, deleteTodo);
}
