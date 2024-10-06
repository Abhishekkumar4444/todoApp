import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Fetch Todos
    fetchTodosRequest: state => {
      state.loading = true;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add Todo
    addTodoRequest: state => {
      state.loading = true;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Todo
    updateTodoRequest: state => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex(todo => todo.id == action.payload.id);
      state.todos[index] = action.payload;
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Todo
    deleteTodoRequest: state => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;
