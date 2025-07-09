import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

 const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/todo/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();
    console.log("Fetched data:", data);

    if (Array.isArray(data.todos)) {
      setTodos(data.todos);
    } else {
      console.error("Unexpected response format:", data);
    }
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
};


  const deleteTodo = async (id) => {
  try {
    setDeletingId(id);
    const token = localStorage.getItem("token");

    const deleteResponse = await fetch(`http://localhost:3000/api/v1/todo/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!deleteResponse.ok) {
      throw new Error("Delete failed");
    }

    const deleteData = await deleteResponse.json();
    console.log(deleteData);
    

    if (deleteData.success) {
      // ✅ After deletion, refresh the todo list
      getTodos(); 
    }
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Todos</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300 text-left">
              Task Name
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-300">
                {todo.taskname}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/update/${todo._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    disabled = {deletingId === todo._id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                   {deletingId === todo._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
