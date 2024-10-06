import {all, call} from 'redux-saga/effects';
import todoSaga from './sagas';

function* rootSaga() {
  yield all([call(todoSaga)]);
}
export default rootSaga;
