import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoList from '../../src/components/TodoList'; // Update the path as necessary
import * as todoSlice from '../../src/redux/todoSlice'; // Import the slice

const mockStore = configureStore([]);
let store;

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

    // Mock the actions in the slice
    jest
      .spyOn(todoSlice, 'fetchTodosRequest')
      .mockImplementation(() => ({type: 'FETCH_TODOS_REQUEST'}));
    jest
      .spyOn(todoSlice, 'addTodoRequest')
      .mockImplementation(todo => ({type: 'ADD_TODO_REQUEST', payload: todo}));
    jest.spyOn(todoSlice, 'updateTodoRequest').mockImplementation(todo => ({
      type: 'UPDATE_TODO_REQUEST',
      payload: todo,
    }));
    jest
      .spyOn(todoSlice, 'deleteTodoRequest')
      .mockImplementation(id => ({type: 'DELETE_TODO_REQUEST', payload: id}));
    jest.spyOn(todoSlice, 'fetchTodosSuccess').mockImplementation(todos => ({
      type: 'FETCH_TODOS_SUCCESS',
      payload: todos,
    }));
    jest.spyOn(todoSlice, 'fetchTodosFailure').mockImplementation(error => ({
      type: 'FETCH_TODOS_FAILURE',
      payload: error,
    }));
    jest
      .spyOn(todoSlice, 'addTodoSuccess')
      .mockImplementation(todo => ({type: 'ADD_TODO_SUCCESS', payload: todo}));
    jest.spyOn(todoSlice, 'addTodoFailure').mockImplementation(error => ({
      type: 'ADD_TODO_FAILURE',
      payload: error,
    }));
    jest.spyOn(todoSlice, 'updateTodoSuccess').mockImplementation(todo => ({
      type: 'UPDATE_TODO_SUCCESS',
      payload: todo,
    }));
    jest.spyOn(todoSlice, 'updateTodoFailure').mockImplementation(error => ({
      type: 'UPDATE_TODO_FAILURE',
      payload: error,
    }));
    jest
      .spyOn(todoSlice, 'deleteTodoSuccess')
      .mockImplementation(id => ({type: 'DELETE_TODO_SUCCESS', payload: id}));
    jest.spyOn(todoSlice, 'deleteTodoFailure').mockImplementation(error => ({
      type: 'DELETE_TODO_FAILURE',
      payload: error,
    }));
  });

  it('renders the TodoList component correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Assertions to check if component renders correctly
    expect(getByPlaceholderText('Enter Todo')).toBeTruthy();
    expect(getByText('Add Todo')).toBeTruthy();
  });

  it('dispatches addTodoRequest when adding a todo', async () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Simulate adding a todo
    fireEvent.changeText(getByPlaceholderText('Enter Todo'), 'New Todo');
    fireEvent.press(getByText('Add Todo'));

    // Check if addTodoRequest action is dispatched with the correct payload
    expect(todoSlice.addTodoRequest).toHaveBeenCalledWith({
      title: 'New Todo',
      completed: false,
    });
  });

  it('dispatches deleteTodoRequest when deleting a todo', async () => {
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

  it('dispatches updateTodoRequest when updating a todo', async () => {
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
  });

  it('displays loading indicator when loading todos', () => {
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
    expect(getByText('Loading.....')).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    // Set the error state
    store = mockStore({
      todos: {
        todos: [],
        loading: false,
        error: 'Something went wrong',
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    // Check for error message
    expect(getByText('Error: Something went wrong')).toBeTruthy();
  });
});
