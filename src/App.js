import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && value.trim()) {
      const todo = {
        id: crypto.randomUUID(),
        text: value,
        completed: false,
      };
      setTodos([...todos, todo]);
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const checkedTodos = (id) => {
    const checked = todos.map((todo) => {
      if (todo.id == id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(checked);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={12}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => checkedTodos(todo.id)}
          />
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
