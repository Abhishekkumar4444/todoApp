import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/todoSlice';
import todoSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(todoSaga);

export default store;
