import todoReducer, {
  addTodoFailure,
  addTodoRequest,
  addTodoSuccess,
  deleteTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
  updateTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
} from '../../src/redux/todoSlice';
describe('todoSlice reducer', () => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(initialState);
  });

  // Fetch Todos Reducers
  it('should handle fetchTodosRequest', () => {
    const nextState = todoReducer(initialState, fetchTodosRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchTodosSuccess', () => {
    const todos = [{id: 1, title: 'Test Todo'}];
    const nextState = todoReducer(initialState, fetchTodosSuccess(todos));
    expect(nextState.loading).toBe(false);
    expect(nextState.todos).toEqual(todos);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchTodosFailure', () => {
    const error = 'Failed to fetch todos';
    const nextState = todoReducer(initialState, fetchTodosFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });

  // Add Todo Reducers
  it('should handle addTodoRequest', () => {
    const nextState = todoReducer(initialState, addTodoRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle addTodoSuccess', () => {
    const newTodo = {id: 2, title: 'New Todo'};
    const nextState = todoReducer(initialState, addTodoSuccess(newTodo));
    expect(nextState.loading).toBe(false);
    expect(nextState.todos).toEqual([newTodo]);
    expect(nextState.error).toBe(null);
  });

  it('should handle addTodoFailure', () => {
    const error = 'Failed to add todo';
    const nextState = todoReducer(initialState, addTodoFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });

  // Update Todo Reducers
  it('should handle updateTodoRequest', () => {
    const nextState = todoReducer(initialState, updateTodoRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle updateTodoSuccess', () => {
    const updatedTodo = {id: 1, title: 'Updated Todo'};
    const preloadedState = {
      ...initialState,
      todos: [{id: 1, title: 'Old Todo'}],
    };
    const nextState = todoReducer(
      preloadedState,
      updateTodoSuccess(updatedTodo),
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.todos[0]).toEqual(updatedTodo);
    expect(nextState.error).toBe(null);
  });

  it('should handle updateTodoFailure', () => {
    const error = 'Failed to update todo';
    const nextState = todoReducer(initialState, updateTodoFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });

  // Delete Todo Reducers
  it('should handle deleteTodoRequest', () => {
    const nextState = todoReducer(initialState, deleteTodoRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle deleteTodoSuccess', () => {
    const preloadedState = {
      ...initialState,
      todos: [{id: 1, title: 'Todo to delete'}],
    };
    const nextState = todoReducer(preloadedState, deleteTodoSuccess(1));
    expect(nextState.loading).toBe(false);
    expect(nextState.todos).toEqual([]);
    expect(nextState.error).toBe(null);
  });

  it('should handle deleteTodoFailure', () => {
    const error = 'Failed to delete todo';
    const nextState = todoReducer(initialState, deleteTodoFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });
});
