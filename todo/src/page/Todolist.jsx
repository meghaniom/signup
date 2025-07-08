import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data.todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/${id}`);
      getTodos();
    } catch (err) {
      console.error("Delete failed");
    }
  };


  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
            {todo.taskname}
            <div className="flex items-center gap-3">
              <Link
              to={`/update/${todo_id}`}
              className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
            <button onClick={() => deleteTodo(todo._id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
