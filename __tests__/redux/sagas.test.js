import axios from 'axios';
import {runSaga} from 'redux-saga';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../../src/redux/sagas';
import {
  addTodoFailure,
  addTodoRequest,
  addTodoSuccess,
  deleteTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  fetchTodosFailure,
  fetchTodosSuccess,
  updateTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
} from '../../src/redux/todoSlice';

jest.mock('axios');

describe('Todo Sagas', () => {
  let dispatchedActions;

  beforeEach(() => {
    console.log('beforeEach');
    dispatchedActions = [];
  });

  describe('fetchTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockTodos = [
        {id: 1, title: 'Todo 1'},
        {id: 2, title: 'Todo 2'},
        {id: 3, title: 'Todo 3'},
        {id: 4, title: 'Todo 4'},
        {id: 5, title: 'Todo 5'},
      ];
      axios.get.mockResolvedValue({data: mockTodos});

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        fetchTodos,
      ).toPromise();

      expect(dispatchedActions).toEqual([
        fetchTodosSuccess(mockTodos.slice(0, 4)),
      ]);
    });

    it('should handle errors when fetching todos', async () => {
      const errorMessage = 'Error fetching todos';
      axios.get.mockRejectedValue(new Error(errorMessage));

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        fetchTodos,
      ).toPromise();

      expect(dispatchedActions).toEqual([fetchTodosFailure(errorMessage)]);
    });
  });

  describe('addTodo', () => {
    it('should add a todo successfully', async () => {
      const newTodo = {id: 3, title: 'Todo 3'};
      axios.post.mockResolvedValue({data: newTodo});

      const action = addTodoRequest(newTodo);

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        addTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([addTodoSuccess(newTodo)]);
    });

    it('should handle errors when adding a todo', async () => {
      const errorMessage = 'Error adding todo';
      const action = addTodoRequest({title: 'Todo 3'});
      axios.post.mockRejectedValue(new Error(errorMessage));

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        addTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([addTodoFailure(errorMessage)]);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const updatedTodo = {id: 1, title: 'Updated Todo'};
      axios.put.mockResolvedValue({data: updatedTodo});

      const action = updateTodoRequest(updatedTodo);

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        updateTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([updateTodoSuccess(updatedTodo)]);
    });

    it('should handle errors when updating a todo', async () => {
      const errorMessage = 'Error updating todo';
      const action = updateTodoRequest({id: 1, title: 'Updated Todo'});
      axios.put.mockRejectedValue(new Error(errorMessage));

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        updateTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([updateTodoFailure(errorMessage)]);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const todoId = 1;
      axios.delete.mockResolvedValue({});

      const action = deleteTodoRequest(todoId);

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        deleteTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([deleteTodoSuccess(todoId)]);
    });

    it('should handle errors when deleting a todo', async () => {
      const errorMessage = 'Error deleting todo';
      const todoId = 1;
      const action = deleteTodoRequest(todoId);
      axios.delete.mockRejectedValue(new Error(errorMessage));

      await runSaga(
        {
          dispatch: action => dispatchedActions.push(action),
          getState: () => ({}),
        },
        deleteTodo,
        action,
      ).toPromise();

      expect(dispatchedActions).toEqual([deleteTodoFailure(errorMessage)]);
    });
  });
});
