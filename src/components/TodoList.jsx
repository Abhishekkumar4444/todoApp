import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from '../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const {todos, loading, error} = useSelector(state => state.todos);

  const [todoText, setTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (!todoText.trim()) return; // Early return for empty input
    if (todoText.trim()) {
      dispatch(addTodoRequest({title: todoText, completed: false}));
      setTodoText('');
    }
  };

  const handleUpdateTodo = () => {
    if (editingTodo) {
      dispatch(
        updateTodoRequest({
          ...editingTodo,
          title: todoText,
        }),
      );
      setTodoText('');
      setEditingTodo(null);
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodoRequest(id));
  };

  const renderTodoItem = ({item}) => (
    <View style={styles.todoItem}>
      <View style={{flex: 2}}>
        <Text>{item.title}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Button
          title="Edit"
          onPress={() => {
            setTodoText(item.title);
            setEditingTodo(item);
          }}
        />
        <View style={{left: 5}}>
          <Button
            title="Delete"
            onPress={() => handleDeleteTodo(item.id)}
            color="red"
          />
        </View>
      </View>
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
      <Button
        title={editingTodo ? 'Update Todo' : 'Add Todo'}
        onPress={editingTodo ? handleUpdateTodo : handleAddTodo}
        color="green"
      />

      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: 300,
          }}>
          <Text style={{fontSize: 28, fontWeight: '700'}}>Loading.....</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTodoItem}
        />
      )}
      {error ? (
        <View
          testID="error-view"
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      ) : null}
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
    marginTop: 20,
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
