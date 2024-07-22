import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList.js';
import AddTodoForm from './components/AddTodoForm.js';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data.slice(0, 10)); // Limit to 10 items for simplicity
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;