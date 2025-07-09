import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Navbar from "../component/Navbar";
import TodoList from "./Todolist";
import Loading from "../component/Loading";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [refresh]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-xl mx-auto mt-6 p-4">
          <AddTodo onAdd={triggerRefresh} />
          <TodoList key={refresh} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
