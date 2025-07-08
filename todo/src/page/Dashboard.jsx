
import { useState } from "react";
import AddTodo from "./AddTodo";
import Navbar from "../component/Navbar";
import TodoList from "./Todolist";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 p-4">
        <AddTodo onAdd={triggerRefresh} />
        <TodoList key={refresh} />
      </div>
    </div>
  );
};

export default Dashboard;
