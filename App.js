// App.js
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';
import store from '../todoApp/src/redux/store';
import TodoList from '../todoApp/src/components/TodoList';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <TodoList />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;
