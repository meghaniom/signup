import axios from "axios";
import { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [taskname, setTaskname] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo/createtodo",
        { taskname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTaskname("");
      onAdd(); 
    } catch (err) {
      
      console.error(err);
    }
  };

  return (
    <form onSubmit={addTodo} className="flex gap-2 mb-4">
      <input
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
        className="flex-1 p-2 border rounded"
        placeholder="Enter a task"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
