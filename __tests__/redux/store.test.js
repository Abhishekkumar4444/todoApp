import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../../src/redux/rootReducer'; // Adjust path based on your project structure
import {addTodoSuccess} from '../../src/redux/todoSlice'; // Importing specific action

describe('Redux Store', () => {
  let sagaMiddleware;

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware();
  });

  it('should dispatch an action and update the state correctly', () => {
    const configuredStore = configureStore({
      reducer: rootReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
    });

    // Dispatch an action, e.g., addTodoSuccess
    const mockTodo = {id: 1, title: 'Test Todo'};
    configuredStore.dispatch(addTodoSuccess(mockTodo)); // Use the correct action

    // Check if the state was updated correctly
    const updatedState = configuredStore.getState();
    expect(updatedState.todos.todos).toContainEqual(mockTodo); // Ensure mockTodo is added to state
    expect(updatedState.todos.loading).toBe(false);
    expect(updatedState.todos.error).toBe(null);
  });
});
