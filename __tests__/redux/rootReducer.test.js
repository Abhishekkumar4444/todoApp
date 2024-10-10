import rootReducer from '../../src/redux/rootReducer';
import {
  addTodoSuccess,
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
} from '../../src/redux/todoSlice';

describe('rootReducer', () => {
  const initialState = {
    todos: {
      todos: [],
      loading: false,
      error: null,
    },
  };

  it('should return the initial state', () => {
    expect(rootReducer(undefined, {type: '@@INIT'})).toEqual(initialState);
  });

  it('should handle fetchTodosRequest', () => {
    const action = fetchTodosRequest();
    const newState = rootReducer(initialState, action);
    expect(newState.todos.loading).toBe(true);
    expect(newState.todos.error).toBe(null);
  });

  it('should handle fetchTodosSuccess', () => {
    const todos = [{id: 1, title: 'Test Todo'}];
    const action = fetchTodosSuccess(todos);
    const newState = rootReducer(initialState, action);
    expect(newState.todos.loading).toBe(false);
    expect(newState.todos.todos).toEqual(todos);
    expect(newState.todos.error).toBe(null);
  });

  it('should handle fetchTodosFailure', () => {
    const errorMessage = 'Error fetching todos';
    const action = fetchTodosFailure(errorMessage);
    const newState = rootReducer(initialState, action);
    expect(newState.todos.loading).toBe(false);
    expect(newState.todos.error).toBe(errorMessage);
  });

  it('should handle addTodoSuccess', () => {
    const newTodo = {id: 2, title: 'New Todo'};
    const action = addTodoSuccess(newTodo);
    const stateWithExistingTodo = {
      ...initialState,
      todos: {...initialState.todos, todos: [{id: 1, title: 'Existing Todo'}]},
    };

    const newState = rootReducer(stateWithExistingTodo, action);
    expect(newState.todos.loading).toBe(false);
    expect(newState.todos.todos).toContainEqual(newTodo);
  });
});
