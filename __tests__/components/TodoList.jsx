import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TodoList from '../../src/components/TodoList'; // Adjust this path
import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from '../../src/redux/todoSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('TodoList Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(callback =>
      callback({
        todos: {
          todos: [
            {id: 1, title: 'Learn React Native', completed: false},
            {id: 2, title: 'Build a Todo App', completed: false},
          ],
          loading: false,
          error: null,
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * 1. UI Testing: Ensure all UI components are rendered correctly
   */

  it('should render input field and buttons', () => {
    const {getByPlaceholderText, getByText} = render(<TodoList />);

    expect(getByPlaceholderText('Enter Todo')).toBeTruthy();
    expect(getByText('Add Todo')).toBeTruthy();

    // const {debug} = render(<TodoList />);
    // debug(); This will log the current DOM state, allowing you to see what text is rendered
  });

  it('should render todos correctly', () => {
    const {getByText} = render(<TodoList />);

    expect(getByText('Learn React Native')).toBeTruthy();
    expect(getByText('Build a Todo App')).toBeTruthy();
  });

  it('should render Edit and Delete buttons for each todo', () => {
    const {getAllByText} = render(<TodoList />);
    const editButtons = getAllByText('Edit');
    const deleteButtons = getAllByText('Delete');

    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });

  /**
   * 2. Data Handling Tests: Ensure correct data flow (fetching and updating data)
   */

  it('should dispatch fetchTodosRequest on mount', () => {
    render(<TodoList />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchTodosRequest());
  });

  it('should dispatch addTodoRequest when a new todo is added', () => {
    const {getByPlaceholderText, getByText} = render(<TodoList />);

    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(input, 'New Todo');
    fireEvent.press(getByText('Add Todo'));

    expect(mockDispatch).toHaveBeenCalledWith(
      addTodoRequest({title: 'New Todo', completed: false}),
    );
  });

  it('should dispatch updateTodoRequest when an existing todo is updated', () => {
    const {getAllByText, getByPlaceholderText} = render(<TodoList />);

    const editButtons = getAllByText('Edit');
    fireEvent.press(editButtons[0]); // Press the "Edit" button for the first todo

    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(input, 'Updated Todo');
    fireEvent.press(getAllByText('Update Todo')[0]); // Press the first "Update Todo" button

    expect(mockDispatch).toHaveBeenCalledWith(
      updateTodoRequest({
        id: 1,
        title: 'Updated Todo',
        completed: false,
      }),
    );
  });

  it('should dispatch deleteTodoRequest when Delete is pressed', () => {
    const {getAllByText} = render(<TodoList />);

    const deleteButtons = getAllByText('Delete');
    fireEvent.press(deleteButtons[0]); // Press the first Delete button

    expect(mockDispatch).toHaveBeenCalledWith(deleteTodoRequest(1));
  });

  /**
   * 3. Logic Tests: Ensure the component's logic works as expected
   */

  it('should clear input field after adding a todo', () => {
    const {getByPlaceholderText, getByText} = render(<TodoList />);

    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(input, 'New Todo');
    fireEvent.press(getByText('Add Todo'));

    expect(input.props.value).toBe(''); // Expect input to be cleared
  });

  it('should dispatch updateTodoRequest when an existing todo is updated', () => {
    const {getAllByText, getByPlaceholderText} = render(<TodoList />);

    const editButtons = getAllByText('Edit');
    fireEvent.press(editButtons[0]); // Press the first Edit button

    const input = getByPlaceholderText('Enter Todo');
    expect(input.props.value).toBe('Learn React Native'); // Input should be populated with todo text
  });

  it('should return to add mode after updating a todo', () => {
    const {getAllByText, getByPlaceholderText, getByText} = render(
      <TodoList />,
    );

    const editButtons = getAllByText('Edit');
    fireEvent.press(editButtons[0]); // Press the first "Edit" button

    const input = getByPlaceholderText('Enter Todo');
    fireEvent.changeText(input, 'Updated Todo');
    fireEvent.press(getByText('Update Todo'));

    expect(getByText('Add Todo')).toBeTruthy(); // Button should switch back to Add mode
  });

  /**
   * 4. Edge Cases: Handle empty input, loading state, error state, etc.
   */

  it('should not add a todo if input is empty', () => {
    const {getByText} = render(<TodoList />);

    fireEvent.press(getByText('Add Todo'));

    expect(mockDispatch).not.toHaveBeenCalledWith(
      addTodoRequest(expect.any(Object)),
    );
  });

  it('should display loading indicator when loading is true', () => {
    useSelector.mockImplementation(callback =>
      callback({
        todos: {
          todos: [],
          loading: true,
          error: null,
        },
      }),
    );

    const {getByText} = render(<TodoList />);
    expect(getByText('Loading.....')).toBeTruthy();
  });

  it('should display error message when error is present', () => {
    useSelector.mockImplementation(callback =>
      callback({
        todos: {
          todos: [],
          loading: false,
          error: 'Failed to fetch todos',
        },
      }),
    );

    const {getByText} = render(<TodoList />);

    expect(getByText('Error: Failed to fetch todos')).toBeTruthy();
  });
  it('should not display todo which is deleted ', () => {
    useSelector.mockImplementation(callback =>
      callback({
        todos: {
          todos: [
            {id: 1, title: 'First todo', completed: false},
            {id: 2, title: 'Second todo', completed: false},
          ],
          loading: false,
          error: '',
        },
      }),
    );

    const {getByText} = render(<TodoList />);
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton[0]);
    expect(getByText('First todo')).toBeNull();
  });
});
