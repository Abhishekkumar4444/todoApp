import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App'; // Adjust the path as necessary
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

describe('App Component', () => {
  it('renders correctly and matches snapshot', () => {
    const store = mockStore({
      todos: {
        todos: [], // Initial state for todos
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
});
