import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoList from '../../src/components/TodoList'; // Update the path as necessary
import * as todoSlice from '../../src/redux/todoSlice'; // Import the slice

const mockStore = configureStore([]);
let store;

const mockAction = (actionName, payload) => {
  return jest.spyOn(todoSlice, actionName).mockImplementation(() => ({
    type: actionName,
    payload,
  }));
};
describe('TodoList', () => {
  beforeEach(() => {
    // Create a mock store before each test
    store = mockStore({
      todos: {
        todos: [], // Initial todos array
        loading: false,
        error: null,
      },
    });

    // Mock all necessary dispatch actions
    mockAction('fetchTodosRequest');
    mockAction('addTodoRequest');
    mockAction('updateTodoRequest');
    mockAction('deleteTodoRequest');
    mockAction('fetchTodosSuccess');
    mockAction('fetchTodosFailure');
    mockAction('addTodoSuccess');
    mockAction('addTodoFailure');
    mockAction('updateTodoSuccess');
    mockAction('updateTodoFailure');
    mockAction('deleteTodoSuccess');
    mockAction('deleteTodoFailure');
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should display todos when fetch is successful', () => {
    // Set up the store with todos
    const initialTodos = [{id: 1, title: 'Fetched Todo', completed: false}];

    store = mockStore({
      todos: {
        todos: initialTodos,
        loading: false,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    expect(getByText('Fetched Todo')).toBeOnTheScreen();
  });
  it('should dispatches addTodoRequest when adding a todo', async () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate adding a todo
    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(getByPlaceholderText('Enter Todo'), 'New Todo');
    fireEvent.press(getByText('Add Todo'));

    // Check if addTodoRequest action is dispatched with the correct payload
    expect(todoSlice.addTodoRequest).toHaveBeenCalledWith({
      title: 'New Todo',
      completed: false,
    });
    expect(input.props.value).toBe('');
  });

  it('should not dispatch addTodoRequest when input is empty', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Get the input field and button
    const input = getByPlaceholderText('Enter Todo');

    // Simulate an empty input
    fireEvent.changeText(input, ''); // Set input to an empty string
    fireEvent.press(getByText('Add Todo')); // Simulate button press

    // Check that addTodoRequest was not called
    expect(todoSlice.addTodoRequest).not.toHaveBeenCalled();
  });

  it('should dispatches deleteTodoRequest when deleting a todo', async () => {
    // Set up the initial state with a todo
    store = mockStore({
      todos: {
        todos: [{id: 1, title: 'Test Todo', completed: false}],
        loading: false,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate deleting the todo
    fireEvent.press(getByText('Delete'));

    // Check if deleteTodoRequest action is dispatched with the correct ID
    expect(todoSlice.deleteTodoRequest).toHaveBeenCalledWith(1);
  });

  it('should dispatches updateTodoRequest when updating a todo', async () => {
    // Set up the initial state with a todo for editing
    store = mockStore({
      todos: {
        todos: [{id: 1, title: 'Test Todo', completed: false}],
        loading: false,
        error: null,
      },
    });

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate editing the todo
    const input = getByPlaceholderText('Enter Todo');
    fireEvent.press(getByText('Edit'));

    // Change the text in the input field
    fireEvent.changeText(getByPlaceholderText('Enter Todo'), 'Updated Todo');

    // Simulate updating the todo
    fireEvent.press(getByText('Update Todo'));

    // Check if updateTodoRequest action is dispatched with the correct payload
    expect(todoSlice.updateTodoRequest).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Todo',
      completed: false,
    });

    expect(input.props.value).toBe('');
  });

  it('should displays loading indicator when loading todos', () => {
    // Set the loading state
    store = mockStore({
      todos: {
        todos: [],
        loading: true,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Check for loading text
    expect(getByText('Loading.....')).toBeOnTheScreen();
  });

  it('should render FlatList with the correct number of todo items', () => {
    // Set up the initial state with multiple todos
    const initialTodos = [
      {id: 1, title: 'Test Todo 1', completed: false},
      {id: 2, title: 'Test Todo 2', completed: false},
      {id: 3, title: 'Test Todo 3', completed: false},
    ];

    // Create a mock store with these todos
    store = mockStore({
      todos: {
        todos: initialTodos,
        loading: false,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Assertions to check if the FlatList renders the correct number of items
    expect(getByText('Test Todo 1')).toBeOnTheScreen();
    expect(getByText('Test Todo 2')).toBeOnTheScreen();
    expect(getByText('Test Todo 3')).toBeOnTheScreen();
  });

  it('should display the todo items correctly in the FlatList', () => {
    // Set up the initial state with todos
    const initialTodos = [
      {id: 1, title: 'Test Todo 1', completed: false},
      {id: 2, title: 'Test Todo 2', completed: true},
    ];

    // Create a mock store with these todos
    store = mockStore({
      todos: {
        todos: initialTodos,
        loading: false,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Assertions to check if the todo items are rendered correctly
    expect(getByText('Test Todo 1')).toBeOnTheScreen(); // Check first todo
    expect(getByText('Test Todo 2')).toBeOnTheScreen(); // Check second todo
  });

  it('should dispatch updateTodoRequest with correct payload on Edit button click', async () => {
    // Set up the initial state with a todo
    const initialTodos = [{id: 1, title: 'Initial Todo', completed: false}];

    store = mockStore({
      todos: {
        todos: initialTodos,
        loading: false,
        error: null,
      },
    });

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate pressing the Edit button
    fireEvent.press(getByText('Edit'));

    // Update the todo title
    fireEvent.changeText(getByPlaceholderText('Enter Todo'), 'Edited Todo');
    fireEvent.press(getByText('Update Todo'));

    // Check if updateTodoRequest action is dispatched with the correct payload
    expect(todoSlice.updateTodoRequest).toHaveBeenCalledWith({
      id: 1,
      title: 'Edited Todo',
      completed: false,
    });
  });

  it('should dispatch deleteTodoRequest with correct id on Delete button click', async () => {
    // Set up the initial state with a todo
    const initialTodos = [{id: 1, title: 'Todo to Delete', completed: false}];

    store = mockStore({
      todos: {
        todos: initialTodos,
        loading: false,
        error: null,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate pressing the Delete button
    fireEvent.press(getByText('Delete'));

    // Check if deleteTodoRequest action is dispatched with the correct id
    expect(todoSlice.deleteTodoRequest).toHaveBeenCalledWith(1);
  });

  it('should displays error message when there is an error', () => {
    // Set the error state
    const errorMessage = 'Something went wrong';

    // Set the error state
    store = mockStore({
      todos: {
        todos: [],
        loading: false,
        error: errorMessage,
      },
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Check for error message
    const errorView = getByTestId('error-view');
    expect(errorView).toBeTruthy(); // Ensure the error view is rendered
    expect(errorView).toHaveTextContent(`Error: ${errorMessage}`); // Use the dynamic error message
  });

  it('should not render error message when there is no error', () => {
    const {queryByTestId} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Ensure the error view is not rendered
    expect(queryByTestId('error-view')).toBeNull();
  });
});
