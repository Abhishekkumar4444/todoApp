import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootreducers from './rootReducer';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootreducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
