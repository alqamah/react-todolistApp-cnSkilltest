import React from 'react';

function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <span>{todo.title}</span>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;