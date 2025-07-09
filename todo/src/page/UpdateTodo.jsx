import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskname, setTaskname] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
       
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/todo/todo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTaskname(data.todo.taskname);
        console.log("Fetched todo:", data.todo.taskname);
      } catch (error) {
        console.error("Failed to fetch todo", error);
      }
    };
    fetchTodo();
  }, [id, token]);

  const handelupdate = async (e) => {
    e.preventDefault(); 
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/todo/updatetodo/${id}`,
        { taskname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Update todo failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handelupdate}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Update Todo</h2>
        <input
          value={taskname}
          onChange={(e) => setTaskname(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Update task"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
