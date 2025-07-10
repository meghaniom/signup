import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TodoupdateAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskname, setTaskname] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/admin/admin/todo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!data.todo) {
          navigate("/admindashboard");
        }
        setTaskname(data.todo.taskname);
        console.log("Fetched todo:", data.todo.taskname);
      } catch (error) {
        const errorData = error.response.data;
        console.log("Failed to fetch todo: ", errorData);
      }
    };
    fetchTask();
  }, [id, token, navigate]);

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/admin/admin/updatetodo/${id}`,
        { taskname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admindashboard");
    } catch (error) {
      console.log("update todo failed:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handelUpdate}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl  font-semibold mb-4 text-center">Update Todo</h2>
        <input
          type="text"
          value={taskname}
          onChange={(e) => setTaskname(e.target.value)}
          className="w-full mb-4 border rounded"
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

export default TodoupdateAdmin;
