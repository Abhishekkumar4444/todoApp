import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import TodoList from '../components/TodoList'; // Adjust the path as necessary
import { addTodoRequest, deleteTodoRequest, updateTodoRequest } from '../../coverage'

const mockStore = configureStore([]);

describe('TodoList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      todos: {
        todos: [],
        loading: false,
        error: null,
      },
    });
  });

  it('renders correctly with initial state', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(getByPlaceholderText('Enter Todo')).toBeTruthy();
    expect(getByText('Add Todo')).toBeTruthy();
  });

  it('displays loading state', () => {
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
      </Provider>
    );

    expect(getByText('Loading.....')).toBeTruthy();
  });

  it('adds a new todo', async () => {
    store = mockStore({
      todos: {
        todos: [],
        loading: false,
        error: null,
      },
    });

    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const input = getByPlaceholderText('Enter Todo');
    const addButton = getByText('Add Todo');

    fireEvent.changeText(input, 'New Todo');
    fireEvent.press(addButton);

    const actions = store.getActions();
    expect(actions).toEqual([addTodoRequest({title: 'New Todo', completed: false})]);
  });

  it('updates an existing todo', async () => {
    const initialTodos = [{id: 1, title: 'Old Todo', completed: false}];

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
      </Provider>
    );

    // Press the Edit button
    fireEvent.press(getByText('Edit'));

    // Update the input field
    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(input, 'Updated Todo');

    // Press the Update button
    fireEvent.press(getByText('Update Todo'));

    const actions = store.getActions();
    expect(actions).toEqual([
      updateTodoRequest({id: 1, title: 'Updated Todo', completed: false}),
    ]);
  });

  it('deletes a todo', async () => {
    const initialTodos = [{id: 1, title: 'Todo to delete', completed: false}];

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
      </Provider>
    );

    // Press the Delete button
    fireEvent.press(getByText('Delete'));

    const actions = store.getActions();
    expect(actions).toEqual([deleteTodoRequest(1)]);
  });

  it('displays an error message', () => {
    store = mockStore({
      todos: {
        todos: [],
        loading: false,
        error: 'Some error occurred',
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(getByText('Error: Some error occurred')).toBeTruthy();
  });
});
