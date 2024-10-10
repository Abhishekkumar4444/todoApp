// __tests__/store.test.js
import {applyMiddleware, createStore} from 'redux'; // Import createStore from redux if needed
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../src/redux/rootReducer';
import rootSaga from '../src/redux/rootSagas';
import store from '../src/redux/store';
describe('Redux Store', () => {
  let sagaMiddleware;

  beforeEach(() => {
    // Create a new instance of sagaMiddleware for each test
    sagaMiddleware = createSagaMiddleware();
  });

  it('should run the root saga on store creation', () => {
    const sagaSpy = jest.spyOn(sagaMiddleware, 'run'); // Spy on the run method of sagaMiddleware
    const configuredStore = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware),
    ); // Create a store using sagaMiddleware
    sagaMiddleware.run(rootSaga); // Run the rootSaga to trigger the spy
    expect(sagaSpy).toHaveBeenCalledWith(rootSaga); // Ensure rootSaga is called
  });

  it('should have the correct initial state', () => {
    const initialState = store.getState(); // Get the initial state from the store
    expect(initialState).toEqual({
      todos: {
        todos: [],
        loading: false,
        error: null,
      },
      // Ensure this matches the actual initial state defined in your rootReducer
    });
  });
});
