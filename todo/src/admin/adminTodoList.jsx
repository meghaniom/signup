import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [deleteTodo, setDeleteTodo] = useState([]);

  const getData = async () => {
   
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/admin/admin/todos",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        console.log("Unexepcted response format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteData = async (id) => {
    try {
      setDeleteTodo(id);
      const res = await fetch(
        `http://localhost:3000/api/v1/admin/admin/todo/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res) {
        console.log("Error deleting data : ", error);
      }
      const response = await res.json();
      console.log(response);
      if (response.success) {
        getData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Todos</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-b-gray-300 text-left">
              Taskname
            </th>
            <th className="px-4 py-2 border-gray-300 text-left">Action</th>
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
                  <Link to={`/adminupdate/${todo._id}`}>
                  </Link>

                  <button
                    onClick={() => deleteData(todo._id)}
                    disabled={deleteTodo === todo._id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {deleteTodo === todo._id ? "Deleting..." : "Delete"}
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

export default AdminTodoList;
