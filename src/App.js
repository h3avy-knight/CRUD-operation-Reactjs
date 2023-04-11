import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const getTodos = localStorage.getItem("todos");
    let loadedTodos = JSON.parse(getTodos);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
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
      setValue("");
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
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Max Length is 20"
          maxLength={20}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div style={{ marginTop: "20px" }} key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => checkedTodos(todo.id)}
          />

          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
      {/* <details>
        <summary>Developers Community</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cum
          necessitatibus atque, architecto aperiam minima recusandae eveniet,
          nulla sequi, est ad commodi exercitationem temporibus. Nihil
          voluptates delectus quam cumque possimus officiis ipsa molestiae
          tempora corrupti doloribus ex, aut vel nisi eveniet sint laudantium
          numquam enim officia praesentium dolorem. Blanditiis minus, dolor
          exercitationem nihil architecto, et ut eaque aliquam quia facilis modi
          ullam, suscipit molestias. Iusto laudantium eum totam dicta, debitis
          tempore soluta nisi quo pariatur modi delectus molestiae, doloribus
          asperiores hic voluptatum quasi iste quam eveniet nam tempora illo
          praesentium assumenda. Dolorum nobis dolore molestias aliquam fugiat
          adipisci asperiores iusto?
        </p>
      </details> */}
    </div>
  );
};

export default App;
