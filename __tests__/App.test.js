import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from '../App'; // Adjust the path as necessary

const mockStore = configureStore([]);

describe('App Component Snapshots', () => {
  it('matches the initial empty todos state snapshot', () => {
    const store = mockStore({
      todos: {
        todos: [], // Initial empty state
        loading: false,
        error: null,
      },
    });

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with todos', () => {
    const store = mockStore({
      todos: {
        todos: [
          {id: 1, title: 'Test Todo 1', completed: false},
          {id: 2, title: 'Test Todo 2', completed: true},
        ], // Sample todos
        loading: false,
        error: null,
      },
    });

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the loading state snapshot', () => {
    const store = mockStore({
      todos: {
        todos: [], // Empty todos
        loading: true, // Simulating loading state
        error: null,
      },
    });

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the error state snapshot', () => {
    const store = mockStore({
      todos: {
        todos: [], // Empty todos
        loading: false,
        error: 'Failed to fetch todos', // Simulating error state
      },
    });

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
