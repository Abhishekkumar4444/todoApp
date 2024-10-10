// __tests__/redux/rootSaga.test.js
import {runSaga} from 'redux-saga';
import rootSaga from '../../src/redux/rootSagas';
import todoSaga from '../../src/redux/sagas'; // Adjust the path according to your project structure

jest.mock('../../src/redux/sagas'); // Mocking todoSaga

describe('rootSaga', () => {
  it('should run todoSaga', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: action => dispatchedActions.push(action),
      getState: () => ({}),
    };

    await runSaga(fakeStore, rootSaga).toPromise();

    expect(todoSaga).toHaveBeenCalled(); // Check that todoSaga was called
  });
});
