import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodosRequest,
  addTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
} from '../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [todoText, setTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodoRequest({ title: todoText, completed: false }));
      setTodoText('');
    }
  };

  const handleUpdateTodo = () => {
    if (editingTodo) {
      dispatch(updateTodoRequest({ ...editingTodo, title: todoText }));
      setTodoText('');
      setEditingTodo(null);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text>{item.title}</Text>
      <Button title="Edit" onPress={() => { setTodoText(item.title); setEditingTodo(item); }} />
      <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} color="red"/>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter Todo"
        style={styles.input}
      />
      <Button title={editingTodo ? "Update Todo" : "Add Todo"} onPress={editingTodo ? handleUpdateTodo : handleAddTodo} color="green"/>

      {loading ? <Text>Loading...</Text> : null}
      {error ? <Text style={styles.error}>Error: {error}</Text> : null}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodoItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
  },
});

export default TodoList;
