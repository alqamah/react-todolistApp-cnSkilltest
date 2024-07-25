import React from 'react';

function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <span>{todo.title}</span>
          <div>
            <input
              title='Toggle Completed Status'
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
            />
            <button title='Delete Todo' onClick={() => deleteTodo(todo.id)}> <i className="fas fa-trash-alt"></i></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;