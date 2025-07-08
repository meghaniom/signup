import { useState } from "react";
import api from "../utils/api";

const AddTodo = ({ onAdd }) => {
  const [taskname, setTaskname] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await api.post("/todo", { taskname });
      setTaskname("");
      onAdd(); 
    } catch (err) {
      alert("Task exists or failed.");
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
      <button type="submit" className="bg-green-500 text-white px-4 rounded hover:bg-green-600">Add</button>
    </form>
  );
};

export default AddTodo;
